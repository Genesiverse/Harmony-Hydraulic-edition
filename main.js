const { app, BrowserWindow, ipcMain, screen } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const { version } = require('./package.json');

let win;
let previousBounds;

function createWindow() {
    const binDir = app.isPackaged
        ? path.join(process.resourcesPath, 'bin')
        : path.join(__dirname, 'bin');

    win = new BrowserWindow({
        width: 1300,
        height: 700,
        skipTaskbar: false,
        fullscreenable: false,
        resizable: true,
        frame: false,
        transparent: false,
        vibrancy: 'acrylic',
        backgroundMaterial: 'acrylic',
        backgroundColor: '#00000000',
        roundedCorners: true,
        hasShadow: true,
        icon: path.join(binDir, 'images', 'logo.png'),
        visualEffectState: 'active',
        thickFrame: true,
        autoHideMenuBar: true,
        menuBarVisible: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            enableCornerSmoothingCSS: true,
            additionalArguments: [`--app-version=${version}`]
        },
        show: false
    });

    win.loadFile(path.join(binDir, 'index.html'));

    win.once('ready-to-show', () => {
        win.show();
        // win.webContents.openDevTools(); // ✅ opens DevTools automatically
    });
}

// Custom window controls
ipcMain.on('window-close', (e) => {
    e.sender.getOwnerBrowserWindow().close();
});

ipcMain.on('window-minimize', (e) => {
    e.sender.getOwnerBrowserWindow().minimize();
});

ipcMain.on('window-maximize', (e) => {
    const window = e.sender.getOwnerBrowserWindow();

    if (window._isFakeMaximized) {
        if (window._previousBounds) {
            window.setBounds(window._previousBounds);
        }
        window._isFakeMaximized = false;
        e.sender.send('window-is-restored');
    } else {
        window._previousBounds = window.getBounds();

        const primaryDisplay = screen.getPrimaryDisplay();
        const { x, y, width, height } = primaryDisplay.workArea;

        window.setBounds({
            x: x + 10,
            y: y + 10,
            width: width - 20,
            height: height - 20
        });

        window._isFakeMaximized = true;
        e.sender.send('window-is-maximized');
    }
});

// Auto update IPC
ipcMain.on('check-for-updates', () => {
    // console.log('[update] checking for updates');
    console.log('[debug] received check-for-updates');
    // autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.checkForUpdates();
});

ipcMain.on('start-update', () => {
    console.log('[debug] received start-update');
    autoUpdater.downloadUpdate();
});


ipcMain.on('open-devtools', (e) => {
    const window = e.sender.getOwnerBrowserWindow();
    window.webContents.openDevTools();
});
ipcMain.handle('get-app-version', () => app.getVersion());
function initAutoUpdater() {
    autoUpdater.on('error', (err) => {
    autoUpdater.autoDownload = false;
        console.error('Auto updater error:', err);
        win?.webContents.send('update-error', err?.message || String(err));
    });

    autoUpdater.on('update-available', () => {
        console.log('[update] update available (main)');
        win?.webContents.send('update-available');
    });

    autoUpdater.on('update-not-available', () => {
        console.log('[update] update not available (main)');
        win?.webContents.send('update-not-available');
    });

    autoUpdater.on('download-progress', (progress) => {
        console.log(`[update] download progress (main) ${progress.percent}`);
        win?.webContents.send('download-progress', progress.percent);
    });

    autoUpdater.on('update-downloaded', () => {
        console.log('[update] update downloaded (main)');
        win?.webContents.send('update-downloaded');
        autoUpdater.quitAndInstall();
    });

    // autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.checkForUpdates();
}

app.whenReady().then(() => {
    createWindow();
    initAutoUpdater();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
