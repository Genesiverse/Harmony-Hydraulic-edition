const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const vibrancy = require('electron-windows-vibrancy');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    frame: false,
    transparent: true,
    backgroundColor: '#00000000',
    roundedCorners: true,
    vibrancy: 'fullscreen-ui',    // on macOS
    backgroundMaterial: 'acrylic', // on Windows 11
    visualEffectState: 'active',   // required for backgroundMaterial
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Apply initial vibrancy
  try {
    vibrancy.SetVibrancy(win, 0);
  } catch (err) {
    console.error('Failed to apply vibrancy:', err);
  }

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

ipcMain.on('window-toggle-maximize', (e) => {
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

ipcMain.on('window-set-blur', (e, enabled) => {
  const win = e.sender.getOwnerBrowserWindow();
  if (enabled) {
    try {
      vibrancy.SetVibrancy(win, 0);
    } catch (err) {
      console.error('Failed to enable vibrancy:', err);
    }
  } else {
    try {
      vibrancy.DisableVibrancy(win);
    } catch (err) {
      console.error('Failed to disable vibrancy:', err);
    }
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
