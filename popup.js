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
  loginBtn.textContent = 'Signing in...';

  chrome.runtime.sendMessage({ type: 'LOGIN' }, (response) => {
    loginBtn.disabled = false;
    loginBtn.textContent = 'Sign in with Google';

    if (chrome.runtime.lastError) {
      setError(chrome.runtime.lastError.message);
      return;
    }
    if (!response?.success) {
      setError(response?.error ?? 'Sign-in failed.');
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
