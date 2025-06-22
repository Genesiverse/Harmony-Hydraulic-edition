const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    transparent: true,
    roundedCorners: true,
    backgroundMaterial: process.platform === 'win32' ? 'acrylic' : 'blurbehind',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join('bin', 'index.html'));

  win.on('maximize', () => {
    win.webContents.send('window-maximized');
  });
  win.on('unmaximize', () => {
    win.webContents.send('window-restored');
  });
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
