/**
 * mask.js — 이미지 영역 / 텍스트 span 마스킹 (보여주기 전용)
 *
 * 이미지는 canvas로 굽지 않고 DOM 오버레이를 얹는 방식이라
 * CORS와 무관하고, 유튜브 iframe 위에도 그대로 동작한다.
 */

/* ─────────────────────────────  이미지 / 미디어  ───────────────────────────── */

/**
 * 컨테이너 위에 사각 영역들을 덮는 오버레이를 얹는다.
 *
 * 컨테이너는 <img>, <iframe>, <video> 등을 감싸는 요소여야 한다.
 *   <div class="masked-media">
 *     <img src="https://i.ytimg.com/vi/.../maxresdefault.jpg">
 *   </div>
 * 컨테이너 크기가 미디어에 딱 맞아야 좌표가 정확하다 (보통 img를 display:block; width:100%).
 *
 * @param {HTMLElement} container
 * @param {Array<[number, number, number, number]>} boxes  [x1, y1, x2, y2] — left_top → right_bottom (실수)
 * @param {object} [opt]
 * @param {boolean} [opt.normalized=true]  true면 0~1 비율. false면 원본 픽셀 좌표
 * @param {number} [opt.width]             normalized=false일 때 기준 폭 (원본 픽셀 크기)
 * @param {number} [opt.height]            normalized=false일 때 기준 높이
 * @param {'solid'|'blur'} [opt.mode='solid']
 * @param {string} [opt.color='#000']      mode='solid'일 때 색
 * @param {number} [opt.blur=12]           mode='blur'일 때 블러 반경(px)
 * @param {string} [opt.className='mask-box']
 * @returns {() => void} 오버레이를 걷어내는 cleanup 함수
 */
export function overlayRegions(container, boxes, opt = {}) {
  const {
    normalized = true,
    width,
    height,
    mode = 'solid',
    color = '#000',
    blur = 12,
    className = 'mask-box',
  } = opt;

  if (!normalized && (!width || !height)) {
    throw new Error('normalized=false면 opt.width / opt.height가 필요해');
  }

  // 오버레이의 기준점 확보. static이면 좌표가 엉뚱한 조상 기준이 돼버린다.
  if (getComputedStyle(container).position === 'static') {
    container.style.position = 'relative';
  }

  const nodes = [];

  for (const [x1, y1, x2, y2] of boxes) {
    // 픽셀이면 비율로 환산 → 뒤집힌 좌표 허용(min/max) + 0~1 밖은 clamp
    const rx1 = normalized ? x1 : x1 / width;
    const ry1 = normalized ? y1 : y1 / height;
    const rx2 = normalized ? x2 : x2 / width;
    const ry2 = normalized ? y2 : y2 / height;

    const left = Math.max(0, Math.min(rx1, rx2));
    const top = Math.max(0, Math.min(ry1, ry2));
    const right = Math.min(1, Math.max(rx1, rx2));
    const bottom = Math.min(1, Math.max(ry1, ry2));
    if (right <= left || bottom <= top) continue;

    const el = document.createElement('div');
    el.className = className;
    Object.assign(el.style, {
      position: 'absolute',
      left: `${left * 100}%`,
      top: `${top * 100}%`,
      width: `${(right - left) * 100}%`,
      height: `${(bottom - top) * 100}%`,
      pointerEvents: 'none', // 아래 요소의 클릭/재생을 막지 않도록
    });

    if (mode === 'blur') {
      // 자기 뒤에 깔린 픽셀을 블러 처리.
      const ok =
        CSS.supports('backdrop-filter', `blur(${blur}px)`) ||
        CSS.supports('-webkit-backdrop-filter', `blur(${blur}px)`);
      if (ok) {
        el.style.backdropFilter = `blur(${blur}px)`;
        el.style.webkitBackdropFilter = `blur(${blur}px)`;
      } else {
        el.style.background = color; // 미지원 브라우저 fallback
      }
    } else {
      el.style.background = color;
    }

    container.appendChild(el);
    nodes.push(el);
  }

  return () => nodes.forEach((n) => n.remove());
}

/* ─────────────────────────────  텍스트  ───────────────────────────── */

const escapeHTML = (s) =>
  s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));

/**
 * span들을 정렬하고 겹치거나 맞닿은 것끼리 병합한다.
 * 병합을 안 하면 마스킹 태그가 중첩돼서 HTML이 깨진다.
 *
 * @param {Array<[number, number]>} spans
 * @param {number} len
 * @returns {Array<[number, number]>}
 */
export function normalizeSpans(spans, len) {
  return spans
    .map(([s, e]) => [
      Math.max(0, Math.min(s, e)),
      Math.min(len, Math.max(s, e)),
    ])
    .filter(([s, e]) => e > s)
    .sort((a, b) => a[0] - b[0])
    .reduce((acc, cur) => {
      const last = acc[acc.length - 1];
      if (last && cur[0] <= last[1]) last[1] = Math.max(last[1], cur[1]);
      else acc.push(cur);
      return acc;
    }, []);
}

/**
 * 텍스트의 지정 span들을 가린 HTML 문자열을 만든다.
 *
 * mode별 특징
 *  - 'solid' : 글자를 투명 처리하고 배경만 검정 → 원래 글자 폭이 유지돼 레이아웃이 안 흔들림.
 *              단, DOM에는 원문이 그대로 남는다.
 *  - 'blur'  : filter: blur(). 마찬가지로 DOM에 원문이 남는다.
 *  - 'char'  : '█'로 치환 → DOM에도 원문이 남지 않는 유일한 방식.
 *
 * @param {string} text
 * @param {Array<[number, number]>} spans  [start, end) — end는 exclusive (Python slice와 동일)
 * @param {object} [opt]
 * @param {'solid'|'blur'|'char'} [opt.mode='solid']
 * @param {string} [opt.className='mask']
 * @param {string} [opt.blockChar='█']
 * @param {boolean} [opt.codePoint=true]   true면 코드포인트 기준(이모지 안전),
 *                                         false면 UTF-16 코드유닛 기준(JS 기본 .slice()와 동일)
 * @returns {string} HTML
 */
export function maskText(text, spans, opt = {}) {
  const {
    mode = 'solid',
    className = 'mask',
    blockChar = '█',
    codePoint = true,
  } = opt;

  const chars = codePoint ? [...text] : text.split('');
  const merged = normalizeSpans(spans, chars.length);

  let html = '';
  let cursor = 0;

  for (const [s, e] of merged) {
    html += escapeHTML(chars.slice(cursor, s).join('')); // 안 가리는 구간

    if (mode === 'char') {
      html += `<span class="${className}">${blockChar.repeat(e - s)}</span>`;
    } else {
      const cls = mode === 'blur' ? `${className} ${className}--blur` : className;
      const piece = escapeHTML(chars.slice(s, e).join(''));
      html += `<span class="${cls}" aria-hidden="true">${piece}</span>`;
    }

    cursor = e;
  }

  return html + escapeHTML(chars.slice(cursor).join(''));
}

/**
 * HTML 없이 문자열만 필요할 때 (SSR, API 응답 등).
 * DOM에 원문이 아예 남지 않으므로 스포일러 감추기엔 이쪽이 가장 안전하다.
 *
 * @param {string} text
 * @param {Array<[number, number]>} spans
 * @param {string} [blockChar='█']
 * @returns {string}
 */
export function maskTextPlain(text, spans, blockChar = '█') {
  const chars = [...text];
  const merged = normalizeSpans(spans, chars.length);

  let out = '';
  let cursor = 0;
  for (const [s, e] of merged) {
    out += chars.slice(cursor, s).join('');
    out += blockChar.repeat(e - s);
    cursor = e;
  }
  return out + chars.slice(cursor).join('');
}