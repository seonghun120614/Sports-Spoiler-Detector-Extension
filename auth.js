// auth.js — OAuth2 로그인 로직 (background.js 에서 import)
import { BACKEND_BASE_URL, OAUTH_LOGIN_PATH } from './config.js';

// 팝업이 닫혀도 로그인/로그아웃 로직이 끊기지 않도록 background에서 처리한다.
export function registerAuthMessageHandler() {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'LOGIN') {
      handleLogin()
        .then(sendResponse)
        .catch((err) => sendResponse({ success: false, error: err.message }));
      return true; // 비동기 응답을 사용한다는 표시
    }

    if (message.type === 'LOGOUT') {
      handleLogout()
        .then(sendResponse)
        .catch((err) => sendResponse({ success: false, error: err.message }));
      return true;
    }
  });
}

export async function getSession() {
  const { session } = await chrome.storage.local.get('session');
  return session ?? null;
}

async function handleLogin() {
  const redirectedUrl = await launchOAuthFlow();
  const session = parseSession(redirectedUrl);

  await chrome.storage.local.set({ session });

  return { success: true, session };
}

export async function handleLogout() {
  await chrome.storage.local.remove('session');
  return { success: true };
}

function launchOAuthFlow() {
  return new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      { url: `${BACKEND_BASE_URL}${OAUTH_LOGIN_PATH}`, interactive: true },
      (redirectedUrl) => {
        if (chrome.runtime.lastError || !redirectedUrl) {
          reject(new Error(chrome.runtime.lastError?.message || '로그인에 실패했습니다.'));
          return;
        }
        resolve(redirectedUrl);
      }
    );
  });
}

// 예상 리다이렉트 형태: https://<확장ID>.chromiumapp.org/#accessToken=...&refreshToken=...&email=...&name=...
function parseSession(redirectedUrl) {
  const params = new URLSearchParams(new URL(redirectedUrl).hash.slice(1));
  const accessToken = params.get('accessToken');

  if (!accessToken) {
    throw new Error(params.get('error') || '백엔드에서 토큰을 받지 못했습니다.');
  }

  return {
    accessToken,
    refreshToken: params.get('refreshToken'),
    email: params.get('email'),
    name: params.get('name'),
  };
}
