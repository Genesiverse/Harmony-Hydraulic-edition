let debugEnabled = localStorage.getItem('debugEnabled') === 'true';

window.debugLog = function (...args) {
  if (debugEnabled) {
    console.log(...args);
  }
};

window.setDebugEnabled = function (enabled) {
  debugEnabled = enabled;
  localStorage.setItem('debugEnabled', String(enabled));
  if (window.electronAPI?.toggleDebug) {
    window.electronAPI.toggleDebug(enabled);
  }
};

window.isDebugEnabled = function () {
  return debugEnabled;
};

if (window.electronAPI?.toggleDebug) {
  window.electronAPI.toggleDebug(debugEnabled);
}
