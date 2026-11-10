console.log("🕵️‍♂️ [Spoiler Detector] 하이브리드 스캐닝 및 블러링 엔진 가동.");

/**
 * 💡 판정 흐름
 *  1. 선차단: 이미지(썸네일 컨테이너 클래스 — a#thumbnail img 는 image/content.js 의 inline blur 도 함께) + 텍스트(제목 클래스)
 *  2. 이미지·텍스트 각각 판별
 *     - 이미지: image/content.js(SigLIP)가 img.style.filter 를 'none'으로 풀면 안전, IMAGE_VERDICT_TIMEOUT_MS 안에 안 풀리면 스포일러
 *     - 텍스트: background.js 로컬 모델(CLASSIFY_TEXT)
 *  3. 둘 다 안전 → 'safe' / 하나라도 스포일러 → 서버 버퍼에 저장
 *  4. 버퍼가 SERVER_BATCH_SIZE 개 차거나 SERVER_FLUSH_MS 가 지나면 서버 요청(SEND_BATCH_DATA)
 *  5. 응답(SPOILER_CHECK_RESULTS): 'safe' 또는 'spoiler'(부분 마스크 / 전체 블러)
 *
 * 💡 상태 관리 원칙 (선차단이 풀린 뒤 다시 걸리는 문제 방지)
 *  - 판정 상태는 videoId 기준 Map(verdicts) 하나에만 저장한다.
 *  - DOM 은 매 스캔마다 그 상태에 맞춰 "다시 그린다"(renderCard). 그래서
 *      · YouTube 가 카드/img 를 새로 만들거나 재사용해도 캐시된 결과가 즉시 다시 적용되고
 *      · image/content.js 가 새 img 에 inline blur 를 다시 걸어도 판정 완료 영상이면 바로 풀린다.
 *  - 같은 videoId 카드가 여러 개(숨겨진 이전 페이지, 선반 중복 등)여도 querySelectorAll 로 전부 처리한다.
 */
const SERVER_BATCH_SIZE = 16;
const SERVER_FLUSH_MS = 2000;
const IMAGE_VERDICT_TIMEOUT_MS = 10000; // image/content.js 가 분석을 시작(data-analyzed=true)한 시점부터
const IMAGE_MODULE_THUMBNAIL = 'a#thumbnail';  // image/content.js 가 판별하는 썸네일 (a#thumbnail img)

const CARD_SELECTOR =
  'ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, ' +
  'ytm-shorts-lockup-view-model, yt-lockup-view-model, .ytLockupViewModelHost';
const TITLE_SELECTOR = '#video-title, .ytLockupMetadataViewModelTitle a, .shortsLockupViewModelHostMetadataTitle a, h3 a, h3';
const THUMBNAIL_SELECTOR = 'a#thumbnail, yt-thumbnail-view-model';
const THUMBNAIL_IMG_SELECTOR = 'a#thumbnail img, yt-thumbnail-view-model img';
const MASK_BOX_CLASS = 'spoiler-mask-box';

/**
 * videoId → {
 *   state: 'local'(로컬 판별 중) | 'server'(서버 판별 중) | 'safe' | 'spoiler',
 *   title, text, image, imageStartedAt,   // 로컬 판별용
 *   mask                                  // 'spoiler' 일 때 서버가 준 마스크 (없으면 전체 블러)
 * }
 */
const verdicts = new Map();
const isPending = (v) => v.state === 'local' || v.state === 'server';

let serverBuffer = [];
let serverFlushTimer = null;

/**
 * 💡 선차단: 판정 결과가 오기 전까지 썸네일(이미지)과 제목(텍스트)을 각각 따로 가린다.
 */
const PRE_BLOCK_IMAGE_CLASS = 'ssd-preblock-image';
const PRE_BLOCK_TEXT_CLASS = 'ssd-preblock-text';

(function injectPreBlockStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .${PRE_BLOCK_IMAGE_CLASS} { filter: blur(15px) !important; transition: filter 0.3s ease; }
    .${PRE_BLOCK_TEXT_CLASS} { filter: blur(6px) !important; transition: filter 0.3s ease; }
  `;
  (document.head || document.documentElement).appendChild(style);
})();

function cardsOf(videoId) {
  return document.querySelectorAll(`[data-video-id="${CSS.escape(videoId)}"]`);
}

function extractVideoId(card) {
  const linkElement = card.querySelector('a[href*="/watch?"], a[href*="/shorts/"]');
  if (!linkElement) return null;
  const href = linkElement.getAttribute('href');

  if (href.includes('v=')) {
    return new URLSearchParams(href.split('?')[1]).get('v');
  }
  const shortsMatch = href.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  return shortsMatch ? shortsMatch[1] : null;
}

function extractTitle(card) {
  const titleElement = card.querySelector(TITLE_SELECTOR);
  let title = titleElement ? (titleElement.getAttribute('title') || titleElement.textContent.trim()) : '';

  if (!title) {
    const anyTitleLink = card.querySelector('a[title]');
    if (anyTitleLink) title = anyTitleLink.getAttribute('title').trim();
  }

  const linkElement = card.querySelector('a[href*="/watch?"], a[href*="/shorts/"]');
  if (!title && linkElement?.hasAttribute('aria-label')) {
    const ariaLabel = linkElement.getAttribute('aria-label');
    title = ariaLabel.includes('게시자:') ? ariaLabel.split('게시자:')[0].trim() : ariaLabel.trim();
  }
  return title;
}

/* ─────────────────────────────  DOM 렌더링 (상태 → 화면)  ───────────────────────────── */

function applyPreBlock(card) {
  card.querySelectorAll(THUMBNAIL_SELECTOR).forEach(el => el.classList.add(PRE_BLOCK_IMAGE_CLASS));
  card.querySelector(TITLE_SELECTOR)?.classList.add(PRE_BLOCK_TEXT_CLASS);
}

/**
 * 선차단 해제
 * - 컨테이너/제목 클래스 제거
 * - image/content.js 가 img 에 건 inline blur 해제 (analyzed=true 로 표시해 같은 img 를 다시 선차단하지 않게 한다)
 * @returns {number} 실제로 바뀐 요소 수
 */
function clearPreBlock(card) {
  let released = 0;
  card.querySelectorAll(`.${PRE_BLOCK_IMAGE_CLASS}, .${PRE_BLOCK_TEXT_CLASS}`).forEach(el => {
    el.classList.remove(PRE_BLOCK_IMAGE_CLASS, PRE_BLOCK_TEXT_CLASS);
    released++;
  });
  card.querySelectorAll(THUMBNAIL_IMG_SELECTOR).forEach(img => {
    if (img.dataset.analyzed === 'true' && img.style.filter === 'none') return;
    img.dataset.analyzed = 'true';
    img.style.filter = 'none';
    released++;
  });
  return released;
}

/**
 * YouTube 가 카드 노드를 다른 영상으로 재사용했을 때, 이전 영상에 걸어 둔 흔적을 전부 걷어낸다.
 */
function resetCard(card) {
  card.querySelectorAll(`.${PRE_BLOCK_IMAGE_CLASS}, .${PRE_BLOCK_TEXT_CLASS}`)
    .forEach(el => el.classList.remove(PRE_BLOCK_IMAGE_CLASS, PRE_BLOCK_TEXT_CLASS));
  card.querySelectorAll(`.${MASK_BOX_CLASS}`).forEach(el => el.remove());

  if (card.dataset.spoilerBlurred) {
    const visualContainer = card.querySelector('#dismissible, .ytLockupViewModelHost') || card;
    Object.assign(visualContainer.style, { filter: '', opacity: '', pointerEvents: '' });
    delete card.dataset.spoilerBlurred;
  }
  delete card.dataset.spoilerMasked;

  // 이전 영상 기준의 analyzed 플래그가 남아 있으면 새 영상 이미지가 판별 없이 '안전'으로 읽힌다
  card.querySelectorAll(THUMBNAIL_IMG_SELECTOR).forEach(img => {
    delete img.dataset.analyzed;
    img.style.filter = '';
  });
  delete card.dataset.videoId;
}

/**
 * 💡 카드 하나를 현재 판정 상태에 맞게 그린다. 몇 번을 호출해도 결과가 같다(멱등).
 */
function renderCard(card, videoId, v) {
  if (isPending(v)) {
    applyPreBlock(card);
    return 0;
  }

  const released = clearPreBlock(card);
  if (v.state === 'spoiler' && card.dataset.spoilerMasked !== videoId) {
    card.dataset.spoilerMasked = videoId;
    const hasMaskInfo = v.mask && (v.mask.boxes.length > 0 || v.mask.spans.length > 0);
    if (hasMaskInfo) applyPartialMask(card, videoId, v.mask);
    else applySpoilerBlurFilter(card, videoId); // 서버 장애 fallback 등 좌표 정보가 없으면 카드 전체 블러
  }
  return released;
}

/**
 * 💡 판정 결과 확정: 상태를 저장하고, 같은 ID 의 모든 카드에 즉시 반영한다.
 */
function applyVerdict(videoId, state, mask = null) {
  const v = verdicts.get(videoId) ?? { title: '' };
  v.state = state;
  v.mask = mask;
  verdicts.set(videoId, v);

  let released = 0;
  cardsOf(videoId).forEach(card => { released += renderCard(card, videoId, v); });
  if (released > 0) console.log(`✅ [Pre-block Released] 선차단 해제 (ID: ${videoId})`);
}

/* ─────────────────────────────  스캔  ───────────────────────────── */

function scrapYoutubePerfectList() {
  const newVideos = [];

  document.querySelectorAll(CARD_SELECTOR).forEach((card) => {
    // ytd-rich-item-renderer > yt-lockup-view-model 처럼 중첩된 카드는 바깥 카드 하나로만 관리한다
    if (card.parentElement?.closest(CARD_SELECTOR)) return;

    const videoId = extractVideoId(card);
    if (card.dataset.videoId && card.dataset.videoId !== videoId) resetCard(card); // 노드 재사용
    if (!videoId || videoId.length !== 11) return;

    let v = verdicts.get(videoId);
    if (!v) {
      const title = extractTitle(card);
      if (!title || title.length <= 1 || title === "Shorts") return;
      v = { state: 'local', title, text: null, image: null, imageStartedAt: null, mask: null };
      verdicts.set(videoId, v);
      newVideos.push({ id: videoId, title });
    }

    card.dataset.videoId = videoId;
    renderCard(card, videoId, v); // 이미 판정된 ID 라면 캐시된 결과가 즉시 적용된다
  });

  if (newVideos.length > 0) requestTextVerdicts(newVideos);
}

/* ─────────────────────────────  로컬 판별  ───────────────────────────── */

/**
 * 💡 텍스트 판별: background.js 로컬 모델에 제목 분류 요청
 * 실패하면 안전 우선으로 스포일러 취급해 서버 정밀 검증으로 넘긴다.
 */
async function requestTextVerdicts(videos) {
  console.log(`📝 [Text] ${videos.length}개 제목 로컬 판별 요청`);
  let results = [];
  try {
    results = await chrome.runtime.sendMessage({ action: "CLASSIFY_TEXT", payload: videos }) || [];
  } catch (error) {
    console.error("텍스트 판별 요청 실패 (Fail-Safe: 스포일러 취급):", error);
  }

  const verdictById = new Map(results.map(r => [r.videoId, r.isSpoiler ? 'spoiler' : 'safe']));
  videos.forEach(({ id }) => {
    const v = verdicts.get(id);
    if (!v || v.state !== 'local') return;
    v.text = verdictById.get(id) ?? 'spoiler';
    tryDecide(id);
  });
}

/**
 * 💡 이미지 판별: image/content.js(SigLIP) 결과를 img 태그 상태로 읽는다 (해당 모듈은 수정하지 않음)
 * - 카드 없음             → 대기
 * - a#thumbnail 없음      → 이미지 모듈 판별 대상이 아니므로 안전 (텍스트 결과만 사용)
 * - 아직 분석 시작 전      → 대기 (lazy-load 로 src 가 아직 없을 수 있음)
 * - filter 'none'         → SigLIP 안전 판정
 * - 시간 내에 안 풀림      → 스포일러 (또는 분석 실패) 로 간주
 */
function readImageVerdict(videoId, v) {
  const cards = [...cardsOf(videoId)];
  if (cards.length === 0) return null;

  const img = cards.map(card => card.querySelector(`${IMAGE_MODULE_THUMBNAIL} img`)).find(Boolean);
  if (!img) {
    return cards.some(card => card.querySelector(IMAGE_MODULE_THUMBNAIL)) ? null : 'safe';
  }
  if (img.dataset.analyzed !== 'true') return null;
  if (img.style.filter === 'none') return 'safe';

  v.imageStartedAt ??= Date.now();
  return Date.now() - v.imageStartedAt > IMAGE_VERDICT_TIMEOUT_MS ? 'spoiler' : null;
}

function checkImageVerdicts() {
  verdicts.forEach((v, videoId) => {
    if (v.state !== 'local' || v.image) return;
    v.image = readImageVerdict(videoId, v);
    if (v.image) tryDecide(videoId);
  });
}

/**
 * 💡 이미지·텍스트 판별이 모두 끝나면: 둘 다 안전 → 'safe' / 하나라도 스포일러 → 서버 버퍼
 */
function tryDecide(videoId) {
  const v = verdicts.get(videoId);
  if (!v || v.state !== 'local' || !v.text || !v.image) return;

  if (v.text === 'safe' && v.image === 'safe') {
    console.log(`✅ [Local Safe] 이미지·텍스트 모두 안전 (ID: ${videoId})`);
    applyVerdict(videoId, 'safe');
    return;
  }

  v.state = 'server'; // 선차단 유지
  console.log(`📦 [Buffer] 서버 검증 대기 (이미지: ${v.image}, 텍스트: ${v.text}, ID: ${videoId})`);
  serverBuffer.push({ id: videoId, title: v.title });
  if (serverBuffer.length >= SERVER_BATCH_SIZE) flushServerBuffer();
  else serverFlushTimer ??= setTimeout(flushServerBuffer, SERVER_FLUSH_MS);
}

/* ─────────────────────────────  서버 판별  ───────────────────────────── */

/**
 * 💡 서버 버퍼 전송 (16개 단위, 남은 건 타이머 만료 시 전송)
 */
function flushServerBuffer() {
  clearTimeout(serverFlushTimer);
  serverFlushTimer = null;

  while (serverBuffer.length > 0) {
    const chunkToSend = serverBuffer.slice(0, SERVER_BATCH_SIZE);
    serverBuffer = serverBuffer.slice(SERVER_BATCH_SIZE);

    console.log(`🚀 [Front] 서버 검증 배치 (${chunkToSend.length}개) 백그라운드로 전송`);
    chrome.runtime.sendMessage({
      action: "SEND_BATCH_DATA",
      payload: chunkToSend
    });
  }
}

/**
 * 💡 background.js 로부터 수신한 판정 데이터를 상태에 반영 → 해당 ID 의 모든 카드에 적용
 */
chrome.runtime.onMessage.addListener((message) => {
  if (message.action !== "SPOILER_CHECK_RESULTS") return;
  const results = message.payload;

  console.log(`📥 [Front] 백그라운드로부터 ${results.length}개의 판정 결과 수신완료.`);

  results.forEach(item => {
    if (item.isSpoiler) {
      const hasMaskInfo = item.mask && (item.mask.boxes.length > 0 || item.mask.spans.length > 0);
      // [DEBUG] 부분 가리기 vs 전체 블러 분기 확인
      console.log(`🔍 [DEBUG front] ${item.videoId} → ${hasMaskInfo ? '부분 마스크' : '전체 블러'}`, {
        reason: item.reason,
        mask: item.mask
      });
    }
    applyVerdict(item.videoId, item.isSpoiler ? 'spoiler' : 'safe', item.mask ?? null);
  });
});

/* ─────────────────────────────  스포일러 표시  ───────────────────────────── */

/**
 * 💡 스포일러 영상 카드 블러 필터 적용 (좌표 정보 없는 경우: 서버 장애 Fail-Safe 등)
 */
function applySpoilerBlurFilter(cardElement, videoId) {
  const visualContainer = cardElement.querySelector('#dismissible, .ytLockupViewModelHost') || cardElement;
  cardElement.dataset.spoilerBlurred = 'true';

  visualContainer.style.transition = "filter 0.3s ease, opacity 0.3s ease";
  visualContainer.style.filter = "blur(14px) grayscale(50%)";
  visualContainer.style.opacity = "0.3";
  visualContainer.style.pointerEvents = "none";

  console.log(`🚨 [Blur Applied] 스포일러 콘텐츠 전체 차단 (ID: ${videoId})`);
}

/**
 * 💡 서버 응답의 썸네일 박스 / 제목 span만 부분적으로 가리기 (mask.js 사용)
 * mask.js는 ES module이라 content script에서는 dynamic import로 불러온다.
 */
let maskModulePromise = null;

function loadMaskModule() {
  maskModulePromise ??= import(chrome.runtime.getURL('mask.js'));
  return maskModulePromise;
}

async function applyPartialMask(cardElement, videoId, mask) {
  const { overlayRegions, maskTextPlain } = await loadMaskModule();
  if (cardElement.dataset.spoilerMasked !== videoId) return; // 로딩 중 카드가 다른 영상으로 재사용됨

  if (mask.boxes.length > 0) {
    const thumbnail = cardElement.querySelector(THUMBNAIL_SELECTOR);
    if (!thumbnail) console.warn(`🔍 [DEBUG front] 썸네일 요소 못 찾음 (ID: ${videoId})`);
    if (thumbnail) {
      // 썸네일 선차단은 renderCard 에서 이미 해제됨 → 서버가 준 영역만 가린다
      const ratioBoxes = toThumbnailRatioBoxes(mask, thumbnail);
      // [DEBUG] 서버 픽셀 좌표 → 화면 0~1 비율 변환 결과
      const rect = thumbnail.getBoundingClientRect();
      console.log(`🔍 [DEBUG box] ${videoId}`, {
        server: { width: mask.width, height: mask.height, boxes: mask.boxes },
        view: { width: rect.width, height: rect.height },
        ratioBoxes
      });
      overlayRegions(thumbnail, ratioBoxes, {
        mode: 'blur',
        blur: 16,
        className: MASK_BOX_CLASS
      });
    }
  }

  if (mask.spans.length > 0) {
    maskTitle(cardElement, mask, maskTextPlain);
  }

  console.log(`🩹 [Partial Mask] 썸네일 ${mask.boxes.length}곳, 제목 ${mask.spans.length}곳 가림 (ID: ${videoId})`);
}

/**
 * 서버 좌표(가로 width×height 이미지 기준 픽셀)를 화면 썸네일 기준 0~1 비율로 변환한다.
 * 세로 영상은 서버 이미지 가운데에 좌우 여백(pillarbox)을 두고 들어가 있고,
 * 화면에서는 세로 썸네일에 object-fit: cover 로 위아래가 잘려 표시되므로 그 차이를 보정한다.
 * 가로 썸네일은 서버 이미지와 비율이 같아서 단순 비율 변환과 결과가 같다.
 */
const VERTICAL_FRAME_ASPECT = 9 / 16;

function toThumbnailRatioBoxes(mask, thumbnail) {
  const { width: serverW, height: serverH } = mask;
  const { width: viewW, height: viewH } = thumbnail.getBoundingClientRect();
  const isVertical = viewW > 0 && viewH > viewW;
  const frameAspect = isVertical ? VERTICAL_FRAME_ASPECT : serverW / serverH;

  // 1) 서버 이미지 안에서 실제 영상 프레임이 차지하는 영역 (가운데 정렬)
  const frameW = Math.min(serverW, serverH * frameAspect);
  const frameH = frameW / frameAspect;
  const frameX = (serverW - frameW) / 2;
  const frameY = (serverH - frameH) / 2;

  // 2) 화면 썸네일 안에서 프레임이 cover 로 그려진 영역 (썸네일 크기 = 1 기준)
  const viewAspect = viewW > 0 && viewH > 0 ? viewW / viewH : frameAspect;
  const drawW = frameAspect > viewAspect ? frameAspect / viewAspect : 1;
  const drawH = frameAspect > viewAspect ? 1 : viewAspect / frameAspect;
  const drawX = (1 - drawW) / 2;
  const drawY = (1 - drawH) / 2;

  // 프레임 밖(여백)이나 잘려나간 영역의 박스는 overlayRegions 가 0~1 clamp 후 알아서 버린다
  return mask.boxes.map(([x1, y1, x2, y2]) => [
    drawX + ((x1 - frameX) / frameW) * drawW,
    drawY + ((y1 - frameY) / frameH) * drawH,
    drawX + ((x2 - frameX) / frameW) * drawW,
    drawY + ((y2 - frameY) / frameH) * drawH
  ]);
}

function maskTitle(cardElement, mask, maskTextPlain) {
  const maskedTitle = maskTextPlain(mask.title, mask.spans);
  const titleElement = cardElement.querySelector(TITLE_SELECTOR);

  if (titleElement) {
    // 제목 텍스트를 직접 담고 있는 가장 안쪽 요소(yt-formatted-string, span 등)를 찾아 교체
    const candidates = [titleElement, ...titleElement.querySelectorAll('*')].reverse();
    const textHolder = candidates.find(el => el.textContent.trim() === mask.title.trim());
    if (textHolder) textHolder.textContent = maskedTitle;
  }

  // 툴팁(title), 스크린리더(aria-label)로 원문이 새지 않도록 속성도 교체
  cardElement.querySelectorAll('[title], [aria-label]').forEach(el => {
    for (const attr of ['title', 'aria-label']) {
      const value = el.getAttribute(attr);
      if (value && value.includes(mask.title)) {
        el.setAttribute(attr, value.replace(mask.title, maskedTitle));
      }
    }
  });
}

/* ─────────────────────────────  스케줄링  ───────────────────────────── */

// DOM 이 바뀌면(카드 재렌더링, img 교체, 노드 재사용) 곧바로 상태를 다시 그린다.
// image/content.js 가 새 img 에 blur 를 다시 걸어도 판정 완료 영상이면 바로 풀린다.
let scanTimer = null;
function scheduleScan() {
  scanTimer ??= setTimeout(() => {
    scanTimer = null;
    scrapYoutubePerfectList();
  }, 200);
}
new MutationObserver(scheduleScan).observe(document.documentElement, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['src', 'href']
});

// 보조: 2초마다 전체 스캔
setInterval(scrapYoutubePerfectList, 2000);

// 이미지 판별 결과(image/content.js 의 img 상태) 확인
setInterval(checkImageVerdicts, 300);
