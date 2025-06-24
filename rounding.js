const ffi = require('ffi-napi');
const ref = require('ref-napi');
const user32 = new ffi.Library('user32', {
  'FindWindowW': ['pointer', ['pointer', 'pointer']],
  'GetForegroundWindow': ['pointer', []],
});
const dwmapi = new ffi.Library('dwmapi', {
  'DwmSetWindowAttribute': ['int', ['pointer', 'int', 'pointer', 'int']]
});

const HWND = user32.GetForegroundWindow();
const DWMWA_WINDOW_CORNER_PREFERENCE = 33;
const DWMWCP_ROUND = 2;
const pref = ref.alloc('int', DWMWCP_ROUND);

dwmapi.DwmSetWindowAttribute(HWND, DWMWA_WINDOW_CORNER_PREFERENCE, pref, 4);
