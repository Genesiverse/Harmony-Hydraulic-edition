const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  toggleMaximize: () => ipcRenderer.send('window-toggle-maximize'),
  /** alias for toggleMaximize for backwards compatibility */
  maximize: () => ipcRenderer.send('window-toggle-maximize'), 
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  onMaximize: (cb) => ipcRenderer.on('window-maximized', cb),
  onRestore: (cb) => ipcRenderer.on('window-restored', cb),
  checkForUpdates: () => ipcRenderer.send('check-for-updates'),
  startUpdate: () => ipcRenderer.send('start-update'),
  onUpdateAvailable: (cb) => ipcRenderer.on('update-available', cb),
  onUpdateNotAvailable: (cb) => ipcRenderer.on('update-not-available', cb),
  onUpdateError: (cb) => ipcRenderer.on('update-error', (_, msg) => cb(msg)),
  onDownloadProgress: (cb) => ipcRenderer.on('download-progress', (_, p) => cb(p)),
  onUpdateDownloaded: (cb) => ipcRenderer.on('update-downloaded', cb)
});
