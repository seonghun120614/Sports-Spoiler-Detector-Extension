import { pipeline, env } from './transformers.js';
import { BACKEND_BASE_URL, SPOILER_API_PATH } from './config.js';
import { registerAuthMessageHandler, getSession, handleLogout } from './auth.js';

registerAuthMessageHandler(); // 팝업 로그인/로그아웃(LOGIN/LOGOUT) 처리

env.localModelPath = chrome.runtime.getURL('models/');
env.allowLocalModels = true;
env.allowRemoteModels = false;
env.useBrowserCache = false;

// 서비스 워커 환경: 단일 스레드 모드 강제
env.backends.onnx.wasm.numThreads = 1;
env.backends.onnx.wasm.proxy = false;

// 로컬 e5 모델이 'Non-Spoiler' 를 이 점수 이상으로 예측해야 제목을 안전으로 본다
const LOCAL_SAFE_THRESHOLD = 0.8;

// 팝업 "스포일러 차단 민감도" 슬라이더 (1~3)
// 1: 느슨하게 → Direct Spoiler 영역만 가림
// 2: 보통     → Non-Spoiler 를 제외한 영역(Direct/Indirect) 전부 가림
// 3: 엄격하게 → 서버 요청 없이 의심 영상 전체 차단 (SEND_BATCH_DATA 참고)
const STRICT_SENSITIVITY = 3;

async function getSensitivity() {
  const { sensitivity } = await chrome.storage.local.get('sensitivity');
  return Number(sensitivity) || 2;
}

function isSpoilerRegion(region, sensitivity) {
  if (sensitivity <= 1) return region.label === 'Direct Spoiler';
  return region.label !== 'Non-Spoiler';
}

function toMaskInfo(item, sensitivity) {
  return {
    title: item.title,
    width: item.width,
    height: item.height,
    boxes: (item.images || [])
      .filter(region => isSpoilerRegion(region, sensitivity))
      .map(({ bounding_box: { top_left, bottom_right } }) => [top_left.x, top_left.y, bottom_right.x, bottom_right.y]),
    spans: (item.texts || [])
      .filter(text => isSpoilerRegion(text, sensitivity))
      .map(text => [text.span.start, text.span.end])
  };
}

let spoilerClassifier = null;
let modelLoadingPromise = null;

// 로딩 중에 들어온 요청도 null 대신 같은 로딩을 기다리게 한다
async function loadModel() {
  if (spoilerClassifier) return spoilerClassifier;
  modelLoadingPromise ??= (async () => {
    try {
      env.backends.onnx.wasm.wasmPaths = {
        'ort-wasm-simd.wasm': chrome.runtime.getURL('image/assets/ort-wasm-simd.wasm'),
        'ort-wasm.wasm': chrome.runtime.getURL('image/assets/ort-wasm.wasm')
      };
      spoilerClassifier = await pipeline('text-classification', 'spoiler-e5-small', { quantized: true });
      console.log("🎉 [Layer 1] 로컬 ONNX (3-Class: Non-Spoiler / Indirect / Direct) 모델 로드 완료!");
    } catch (error) {
      console.error("❌ [Layer 1] 모델 로딩 중 에러:", error);
    } finally {
      modelLoadingPromise = null;
    }
    return spoilerClassifier;
  })();
  return modelLoadingPromise;
}

chrome.runtime.onInstalled.addListener(() => {
  loadModel();
});

/**
 * 💡 [Layer 1] 제목 로컬 판별 — content.js 가 이미지 판별과 합쳐서 서버로 보낼지 결정한다.
 * 모델이 없거나 추론 에러면 안전 우선으로 스포일러(isSpoiler: true) 처리 → 서버 정밀 검증으로 넘어간다.
 */
async function classifyTexts(videoList) {
  const classifier = await loadModel();

  const results = [];
  for (const video of videoList) {
    const videoId = video.id || video.videoId;
    if (!classifier) {
      results.push({ videoId, isSpoiler: true, reason: "Local model not ready" });
      continue;
    }
    try {
      const textToTest = video.title || "";
      const result = await classifier(textToTest);

      // transformers.js는 가장 높은 로짓 점수의 결과를 [0]번 인덱스에 배치해 줍니다.
      const topPrediction = result[0];

      console.log(`🧐 [Layer 1 스캔] "${textToTest.substring(0, 15)}..." ➔ 예측 라벨: ${topPrediction.label} (점수: ${topPrediction.score.toFixed(3)})`);

      // 3클래스(e5) 모델: 'Non-Spoiler' 이면서 점수가 기준 이상일 때만 안전
      const isSafe = topPrediction.label === "Non-Spoiler" && topPrediction.score >= LOCAL_SAFE_THRESHOLD;
      results.push({
        videoId,
        isSpoiler: !isSafe,
        reason: `Local ONNX ${topPrediction.label} (Score: ${topPrediction.score.toFixed(3)})`
      });
    } catch (err) {
      console.error("로컬 모델 추론 에러 (Fail-Safe: 서버로 위임):", err);
      results.push({ videoId, isSpoiler: true, reason: "Local inference error" });
    }
  }
  return results;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "CLASSIFY_TEXT") {
    classifyTexts(message.payload).then(sendResponse);
    return true;
  }

  if (message.action === "SEND_BATCH_DATA") {

    (async () => {
      // content.js 에서 이미지·텍스트 중 하나라도 스포일러로 판별된 영상만 모아서(최대 16개) 보낸다
      const serverTargetChunk = message.payload;
      const postAddress = `${BACKEND_BASE_URL}${SPOILER_API_PATH}`;
      let localFilteredResults = [];
      const sensitivity = await getSensitivity();

      // 💡 엄격하게: 서버에 묻지 않고 의심 영상 전체 차단
      if (sensitivity >= STRICT_SENSITIVITY && serverTargetChunk.length > 0) {
        console.log(`🔒 [엄격 모드] 서버 요청 없이 의심 ${serverTargetChunk.length}개 전체 차단`);
        localFilteredResults = serverTargetChunk.map(video => ({
          videoId: video.id || video.videoId,
          isSpoiler: true,
          reason: "Strict mode (Forced Blur, no server request)"
        }));
      }

      // -----------------------------------------------------------------
      // 💡 [Layer 2: 위험군 데이터만 서버 정밀 검증 라우팅]
      // -----------------------------------------------------------------
      else if (serverTargetChunk.length > 0) {
        console.log(`🔥 [서버 라우팅] 스포일러 의심 ${serverTargetChunk.length}개 서버 정밀 검증 요청`);
        const debugStartedAt = Date.now();

        try {
          const session = await getSession();
          const headers = { "Content-Type": "application/json" };
          if (session?.accessToken) headers["Authorization"] = `Bearer ${session.accessToken}`;

          console.log(`[SERVER-DEBUG] 1) 요청: POST ${postAddress} | ${serverTargetChunk.length}건 | 토큰 ${session?.accessToken ? '있음' : '없음'}`);
          const response = await fetch(postAddress, {
            method: "POST",
            headers,
            // 서버 요청 스펙: [{ video_id, title }]
            body: JSON.stringify(serverTargetChunk.map(video => ({
              video_id: video.id || video.videoId,
              title: video.title
            })))
          });
          console.log(`[SERVER-DEBUG] 2) 응답: ${response.status} ${response.statusText} | ${Date.now() - debugStartedAt}ms`);

          if (response.status === 401) await handleLogout(); // 토큰 만료 → 팝업에서 재로그인 유도
          if (!response.ok) {
            console.error("[SERVER-DEBUG] 2) 비정상 응답 본문:", await response.text().catch(() => ''));
            throw new Error(`HTTP ${response.status}`);
          }

          const serverData = await response.json();
          console.log("🔥 [서버 분할 응답 수신완료]:", serverData);

          if (Array.isArray(serverData)) {
            // [DEBUG] 요청했는데 응답에 없는 영상 → content.js 로 결과가 안 가서 선차단이 그대로 남는다
            const respondedIds = new Set(serverData.map(item => item.video_id));
            const missingIds = serverTargetChunk.map(video => video.id || video.videoId).filter(id => !respondedIds.has(id));
            if (missingIds.length > 0) {
              console.warn(`⚠️ [DEBUG] 서버 응답 누락 ${missingIds.length}개 (요청 ${serverTargetChunk.length} / 응답 ${serverData.length}) → 선차단 해제:`, missingIds);
              // 서버가 판정하지 않은 영상은 안전으로 간주해 선차단을 풀어준다
              localFilteredResults = localFilteredResults.concat(missingIds.map(videoId => ({
                videoId,
                isSpoiler: false,
                reason: "Server response missing (released)"
              })));
            }
            // 서버 응답 스펙: [{ video_id, title, width, height, texts, images }] → content.js 스펙 { videoId, isSpoiler, mask }
            const mapped = serverData.map(item => {
              const mask = toMaskInfo(item, sensitivity); // content.js 부분 가리기용 (썸네일 박스 + 제목 span)
              const result = {
                videoId: item.video_id,
                isSpoiler: mask.boxes.length > 0 || mask.spans.length > 0,
                reason: `Server boxes ${mask.boxes.length}, spans ${mask.spans.length}, sensitivity ${sensitivity}`,
                mask
              };
              // [DEBUG] 서버 원본 item과 변환된 mask 비교
              console.log(`🔍 [DEBUG mask] ${item.video_id}`, {
                keys: Object.keys(item),
                width: item.width,
                height: item.height,
                rawImages: item.images,
                rawTexts: item.texts,
                isSpoiler: result.isSpoiler,
                mask: result.mask
              });
              return result;
            });
            localFilteredResults = localFilteredResults.concat(mapped);
          }
        } catch (error) {
          console.error(`[SERVER-DEBUG] 통신 실패: ${error.name}: ${error.message} | ${Date.now() - debugStartedAt}ms`);
          console.error("서버 통신 실패 (Fail-Safe 가동 - 로컬 의심작 전체 강제 블러):", error);

          // 서버 장애 시, 로컬이 '스포일러 위험군'으로 1차 분류한 항목들은 강제 블러(true) 처리
          const fallbackResults = serverTargetChunk.map(video => ({
            videoId: video.id || video.videoId,
            isSpoiler: true, // 🚨 안전 우선 정책
            reason: "Backend Network Fallback (Forced Blur)"
          }));

          localFilteredResults = localFilteredResults.concat(fallbackResults);
        }
      }

      // -----------------------------------------------------------------
      // 💡 [최종 결과 반환] 유튜브 탭(content.js)으로 판정 데이터 전송
      // -----------------------------------------------------------------
      if (sender.tab && sender.tab.id) {
        chrome.tabs.sendMessage(sender.tab.id, {
          action: "SPOILER_CHECK_RESULTS",
          payload: localFilteredResults
        });
      }
    })();

    return true;
  }
});
