// popup.js — 로그인 UI. 실제 로직은 background(auth.js)에서 처리하고 여기서는 메시지만 전달한다.
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loggedOutView = document.getElementById('loggedOutView');
const loggedInView = document.getElementById('loggedInView');
const userEmail = document.getElementById('userEmail');
const errorMsg = document.getElementById('errorMsg');

init();

async function init() {
  const { session } = await chrome.storage.local.get('session');
  render(session);
}

function render(session) {
  if (session?.accessToken) {
    loggedOutView.classList.add('hidden');
    loggedInView.classList.remove('hidden');
    userEmail.textContent = session.email ?? '';
  } else {
    loggedInView.classList.add('hidden');
    loggedOutView.classList.remove('hidden');
  }
}

function setError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.toggle('hidden', !msg);
}

loginBtn.addEventListener('click', () => {
  setError('');
  loginBtn.disabled = true;
  loginBtn.textContent = '로그인 중...';

  chrome.runtime.sendMessage({ type: 'LOGIN' }, (response) => {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Google로 로그인';

    if (chrome.runtime.lastError) {
      setError(chrome.runtime.lastError.message);
      return;
    }
    if (!response?.success) {
      setError(response?.error ?? '로그인에 실패했습니다.');
      return;
    }
    render(response.session);
  });
});

logoutBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'LOGOUT' }, () => {
    render(null);
  });
});

// 스포일러 차단 민감도 슬라이더 — 값은 storage에 저장되고 background.js가 서버 판정 시 읽는다.
const sensitivityRange = document.getElementById('sensitivityRange');
const sensitivityLabel = document.getElementById('sensitivityLabel');
const SENSITIVITY_LABELS = { 1: '느슨하게 (직접만)', 2: '보통 (간접 포함)', 3: '엄격하게 (전체 차단)' };

function renderSensitivity(value) {
  sensitivityRange.value = value;
  sensitivityLabel.textContent = SENSITIVITY_LABELS[value];
}

chrome.storage.local.get('sensitivity').then(({ sensitivity }) => {
  renderSensitivity(Number(sensitivity) || 2);
});

sensitivityRange.addEventListener('input', () => {
  const value = Number(sensitivityRange.value);
  renderSensitivity(value);
  chrome.storage.local.set({ sensitivity: value });
});
