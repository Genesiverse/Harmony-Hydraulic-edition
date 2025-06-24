const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;
let previousBounds;

function createWindow() {
    win = new BrowserWindow({
        width: 1300,
        height: 700,
        skipTaskbar: false,
        fullscreenable: true,
        resizable: true,
        frame: false,
        transparent: true,
        vibrancy: 'acrylic',
        backgroundMaterial: 'acrylic',
        backgroundColor: '#00000000',
        roundedCorners: true,
        hasShadow: true,
        visualEffectState: 'active',
        autoHideMenuBar: true,
        menuBarVisible: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            enableCornerSmoothingCSS: true
        },
        show: false
    });

    win.loadFile(path.join('bin', 'index.html'));

    win.once('ready-to-show', () => {
        win.show();

        // Call Windows rounding hint
        if (process.platform === 'win32') {
            require('./rounding');
        }
    });
}

// Handle custom window controls from renderer
ipcMain.on('window-close', (e) => {
    e.sender.getOwnerBrowserWindow().close();
});

ipcMain.on('window-minimize', (e) => {
    e.sender.getOwnerBrowserWindow().minimize();
});

ipcMain.on('window-maximize', (e) => {
    const window = e.sender.getOwnerBrowserWindow();
    if (window.isMaximized()) {
        if (previousBounds) {
            window.setBounds(previousBounds);
            previousBounds = null;
        } else {
            window.restore();
        }
        e.sender.send('window-is-restored');
    } else {
        previousBounds = window.getBounds(); // Save current size & position
        window.maximize();
        e.sender.send('window-is-maximized');
    }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
