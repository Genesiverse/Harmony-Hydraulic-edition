const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  toggleMaximize: () => ipcRenderer.send('window-maximize'),
  /** alias for toggleMaximize for backwards compatibility */
  // maximize: () => ipcRenderer.send('window-toggle-maximize'), 
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  onMaximize: (cb) => ipcRenderer.on('window-is-maximized', cb),
  onRestore: (cb) => ipcRenderer.on('window-is-restored', cb),
  onUpdateNotAvailable: (cb) => ipcRenderer.on('update-not-available', cb),
  onUpdateError: (cb) => ipcRenderer.on('update-error', (_, msg) => cb(msg)),
  checkForUpdates: () => ipcRenderer.send('check-for-updates')
});
