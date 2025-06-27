const { contextBridge, ipcRenderer } = require('electron');

// Parse version from process.argv
const versionArg = process.argv.find(arg => arg.startsWith('--app-version='));
const version = versionArg ? versionArg.split('=')[1] : 'unknown';

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  toggleMaximize: () => ipcRenderer.send('window-maximize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  onMaximize: (cb) => ipcRenderer.on('window-is-maximized', cb),
  onRestore: (cb) => ipcRenderer.on('window-is-restored', cb),
  onUpdateNotAvailable: (cb) => ipcRenderer.on('update-not-available', cb),
  onUpdateError: (cb) => ipcRenderer.on('update-error', (_, msg) => cb(msg)),
  checkForUpdates: () => ipcRenderer.send('check-for-updates'),
  startUpdate: () => ipcRenderer.send('start-update'),
  onUpdateAvailable: (cb) => ipcRenderer.on('update-available', cb),
  onDownloadProgress: (cb) => ipcRenderer.on('download-progress', (_, p) => cb(p)),
  onUpdateDownloaded: (cb) => ipcRenderer.on('update-downloaded', cb),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  openDevTools: () => ipcRenderer.send('open-devtools')
  
});

contextBridge.exposeInMainWorld("appInfo", {
  version: version
});
