const { ipcRenderer } = require('electron');

// Get the buttons
const closeBtn = document.getElementById('windowClose');
const minBtn = document.getElementById('windowMin');
const maxBtn = document.getElementById('windowMax');

// Send commands to main process
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        ipcRenderer.send('window-close');
    });
}

if (minBtn) {
    minBtn.addEventListener('click', () => {
        ipcRenderer.send('window-minimize');
    });
}

if (maxBtn) {
    maxBtn.addEventListener('click', () => {
        ipcRenderer.send('window-maximize');
    });
}

// Optional: Listen for maximize/unmaximize updates
ipcRenderer.on('window-is-maximized', () => {
    maxBtn.classList.add('restoring');
});

ipcRenderer.on('window-is-restored', () => {
    maxBtn.classList.remove('restoring');
});
