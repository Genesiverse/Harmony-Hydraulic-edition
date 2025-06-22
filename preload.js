const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  toggleMaximize: () => ipcRenderer.send('window-toggle-maximize'),
  /** alias for toggleMaximize for backwards compatibility */
  maximize: () => ipcRenderer.send('window-toggle-maximize'),
  close: () => ipcRenderer.send('window-close'),
  setBlur: (enabled) => ipcRenderer.send('window-set-blur', enabled),
  onMaximize: (cb) => ipcRenderer.on('window-maximized', cb),
  onRestore: (cb) => ipcRenderer.on('window-restored', cb)
});
