const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join('bin', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on('window-minimize', (e) => {
  e.sender.getOwnerBrowserWindow().minimize();
});

ipcMain.on('window-maximize', (e) => {
  const win = e.sender.getOwnerBrowserWindow();
  if (win.isMaximized()) {
    win.restore();
  } else {
    win.maximize();
  }
});

ipcMain.on('window-close', (e) => {
  e.sender.getOwnerBrowserWindow().close();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
