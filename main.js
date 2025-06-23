const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1300,
        height: 700,
        frame: true,
        transparent: true,
        backgroundColor: '#00000000',
        roundedCorners: true,
        hasShadow: true,
        vibrancy: 'acrylic',
        visualEffectState: 'active',
        autoHideMenuBar: true,
        menuBarVisible: false,
        backgroundMaterial: 'acrylic',
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
    });
}

app.whenReady().then(createWindow);
