# Sports Spoiler Detector

An on-device AI Chrome extension that hides sports spoilers (match results, scores, goal highlights, etc.) on YouTube **before you see them**.

Every video card on YouTube is blurred the moment it appears, analyzed locally in the browser by two lightweight ONNX models (one for titles, one for thumbnails), and only revealed once it is judged safe. Suspicious videos are sent to a backend server for precise verification, which returns the exact spoiler regions so that only the spoiling part of a thumbnail or title is masked.

---

## Features

- **Pre-blocking** – Thumbnails and titles are blurred as soon as they are rendered, so nothing leaks while the analysis is running.
- **On-device text classification** – A quantized multilingual `e5-small` model (`Non-Spoiler` / `Indirect` / `Direct`) classifies each video title inside the extension's service worker using `transformers.js`.
- **On-device image classification** – A SigLIP-based ONNX model running on `onnxruntime-web` (WASM) checks each thumbnail.
- **Hybrid verification** – Only videos flagged as suspicious by the local models are batched (up to 16 at a time) and sent to the backend for detailed analysis.
- **Partial masking** – The server returns bounding boxes for thumbnails and character spans for titles, so only the spoiler region is covered instead of the whole card.
- **Fail-safe by default** – If the local model is not ready, inference fails, or the server is unreachable, suspicious videos stay fully blurred.
- **Works across YouTube layouts** – Home feed, search results, watch-page sidebar, Shorts shelves and the new `*-view-model` lockup components.
- **Google sign-in** – OAuth2 login through the popup to authenticate requests to the verification server.

---

## How It Works

```
 YouTube page (content scripts)                    Service worker (background.js)            Backend
 ───────────────────────────────                   ──────────────────────────────            ───────
 1. New video card detected
 2. Pre-block: blur thumbnail + title
 3. Image check (image/content.js, SigLIP) ─┐
 4. Title check ───────── CLASSIFY_TEXT ────┼────▶ e5-small (local ONNX)
                                            │
 5. Both safe? ── yes ──▶ reveal card        │
              └─ no ───▶ buffer suspicious   │
 6. Buffer full (16) or 2 s elapsed ─ SEND_BATCH_DATA ─▶ POST /api/spoiler ───────────────▶ precise
                                                                                            verification
 7. SPOILER_CHECK_RESULTS ◀──────────────────────────── boxes / spans  ◀─────────────────────┘
 8. Reveal safe cards, partially mask spoiler regions (mask.js),
    or fully blur the card when no region info is available
```

**Sensitivity** is fixed at **Medium**: anything the models do not label as `Non-Spoiler` (both direct and indirect spoilers) is hidden. A title is treated as safe locally only when the model predicts `Non-Spoiler` with a score of **0.8 or higher**.

---

## Requirements

- Google Chrome (or another Chromium-based browser) with Manifest V3 support
- [Git LFS](https://git-lfs.com/) – the ONNX model files are stored with Git LFS (~470 MB in total)

---

## Installation

### 1. Clone the repository (with Git LFS)

```bash
git lfs install
git clone https://github.com/seonghun120614/Sports-Spoiler-Detector-Extension.git
cd Sports-Spoiler-Detector-Extension
git lfs pull
```

> **Important:** If you download the repository as a ZIP from GitHub, or clone without Git LFS, the `.onnx` files will only be small pointer files and the models will fail to load. Make sure the following files have their real sizes:
>
> | File | Approx. size |
> | --- | --- |
> | `models/spoiler-e5-small/onnx/model_quantized.onnx` | 114 MB |
> | `image/assets/siglip_end2end.onnx` | 1 MB |
> | `image/assets/siglip_end2end.onnx.data` | 354 MB |

### 2. Load the extension in Chrome

1. Open `chrome://extensions/` in the address bar.
2. Turn on **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** (top-left).
4. Select the project's root folder (the one that contains `manifest.json`).
5. *Sports Spoiler Detector* now appears in your extension list. Pin it from the puzzle-piece menu for quick access.

The text model starts loading as soon as the extension is installed.

---

## Usage

1. **Sign in (recommended)**
   Click the extension icon to open the popup and press **Sign in with Google**. Signing in lets the extension send suspicious videos to the verification server for precise, partial masking. Your signed-in email is shown in the popup; use **Sign out** to log out.

2. **Browse YouTube as usual**
   Open [youtube.com](https://www.youtube.com). Video cards are briefly blurred while they are analyzed:
   - **Safe videos** are revealed automatically.
   - **Spoiler videos** stay hidden – either the spoiling part of the thumbnail/title is masked, or the whole card is blurred and dimmed.

3. **Spoiler sensitivity**
   The popup shows the current sensitivity, **Medium (incl. indirect)**, which hides both direct and indirect spoilers.

> If you are not signed in or your session has expired, the server may reject requests. In that case the extension falls back to its fail-safe mode and keeps suspicious videos fully blurred. Sign in again from the popup.

---

## Debugging

- **Content scripts (page side):** On a YouTube tab, press `F12` → **Console**. You will see logs such as image model loading, pre-blocking, and `🚨 [Blur Applied] ...` messages.
- **Service worker (background):** Go to `chrome://extensions/`, find the extension card and click **Inspect views: service worker**. This console shows local title predictions (`[Layer 1 스캔] ...`) and server request/response logs (`[SERVER-DEBUG] ...`).
- After changing any file, click the **reload** icon on the extension card and refresh the YouTube tab.

---

## Configuration

Backend endpoints are defined in [`config.js`](config.js):

```js
export const BACKEND_BASE_URL = 'https://www.sportspoilerdetector.kro.kr';
export const OAUTH_LOGIN_PATH = '/api/oauth/google';
export const SPOILER_API_PATH = '/api/spoiler';
```

Tunable constants:

| Constant | File | Default | Description |
| --- | --- | --- | --- |
| `LOCAL_SAFE_THRESHOLD` | `background.js` | `0.8` | Minimum `Non-Spoiler` score for a title to be treated as safe locally |
| `SERVER_BATCH_SIZE` | `content.js` | `16` | Max number of suspicious videos per server request |
| `SERVER_FLUSH_MS` | `content.js` | `2000` | Max wait time before flushing the server buffer |
| `IMAGE_VERDICT_TIMEOUT_MS` | `content.js` | `10000` | If the image check does not clear a thumbnail within this time, it is treated as a spoiler |

### Server API

**Request** – `POST /api/spoiler` (with `Authorization: Bearer <accessToken>` when signed in)

```json
[{ "video_id": "abc123", "title": "Team A 3-1 Team B | Highlights" }]
```

**Response**

```json
[{
  "video_id": "abc123",
  "title": "Team A 3-1 Team B | Highlights",
  "width": 1280,
  "height": 720,
  "texts":  [{ "label": "Direct", "span": { "start": 7, "end": 10 } }],
  "images": [{ "label": "Direct", "bounding_box": { "top_left": { "x": 0.1, "y": 0.2 }, "bottom_right": { "x": 0.4, "y": 0.5 } } }]
}]
```

Regions whose `label` is anything other than `Non-Spoiler` are masked. Videos missing from the response are treated as safe and revealed.

### OAuth redirect

The OAuth flow uses `chrome.identity.launchWebAuthFlow`. The backend must redirect to:

```
https://<extension-id>.chromiumapp.org/#accessToken=...&refreshToken=...&email=...&name=...
```

The `key` field in `manifest.json` pins the extension ID so that this redirect URL stays the same when the extension is loaded unpacked.

---

## Project Structure

```
.
├── manifest.json              # Extension manifest (MV3): permissions, content scripts, resources
├── background.js              # Service worker: local title classification + server batching
├── auth.js                    # Google OAuth2 sign-in / sign-out and session storage
├── config.js                  # Backend URL and API paths
├── content.js                 # YouTube page logic: card scanning, pre-blocking, verdict rendering
├── mask.js                    # Partial masking of thumbnail regions and title spans
├── popup.html / popup.js      # Extension popup (account, sensitivity)
├── tailwind.min.css           # Popup styles
├── transformers.js            # transformers.js runtime (text model)
├── test_setfit.js             # Debug helper for the text model
├── icons/                     # Extension icons
├── models/spoiler-e5-small/   # Quantized e5-small spoiler classifier (ONNX) + tokenizer
└── image/
    ├── content.js             # Thumbnail classifier (bundled, onnxruntime-web)
    └── assets/                # SigLIP ONNX model + onnxruntime-web WASM binaries
```

---

## Permissions

| Permission | Why it is needed |
| --- | --- |
| `storage` | Store the login session |
| `identity` | Run the Google OAuth2 sign-in flow |
| `activeTab` | Interact with the current YouTube tab |
| `https://*.youtube.com/*` | Run content scripts on YouTube |
| `https://www.sportspoilerdetector.kro.kr/*` | Send suspicious videos to the verification server |

Only the **video ID and title** of suspicious videos are sent to the server. Safe videos never leave your browser.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Everything stays blurred | Check that the model files were pulled with Git LFS (see sizes above), then reload the extension. |
| `❌ [Layer 1] 모델 로딩 중 에러` in the service worker console | The text model failed to load – usually an LFS pointer file instead of the real model. Run `git lfs pull`. |
| `[SERVER-DEBUG] ... 401` | Session expired – sign in again from the popup. |
| Sign-in window closes with an error | Make sure the backend's OAuth redirect URL matches your extension ID (`chrome.identity.getRedirectURL()`). |
| Changes are not applied | Click reload on `chrome://extensions/` and refresh the YouTube tab. |
