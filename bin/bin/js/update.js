window.addEventListener('DOMContentLoaded', () => {
  const titleBar = document.getElementById('titleBar');
  if (!titleBar) return;

  const updateBtn = document.createElement('button');
  updateBtn.id = 'updateTitleBtn';
  updateBtn.textContent = 'Update';

  let userRequested = false;

  updateBtn.addEventListener('click', () => {
    userRequested = true;
    updateBtn.disabled = true;
    window.electronAPI.checkForUpdates();
  });
  titleBar.appendChild(updateBtn);





  const topActions = document.getElementById('topActions');

  function updateButtonMargin() {
    if (topActions && !topActions.classList.contains('hide-on-load')) {
      updateBtn.classList.add('shifted');
    } else {
      updateBtn.classList.remove('shifted');
    }
  }

  // Initial check
  updateButtonMargin();

  // Optional: observe changes if the class is toggled later
  const observer = new MutationObserver(updateButtonMargin);
  if (topActions) {
    observer.observe(topActions, { attributes: true, attributeFilter: ['class'] });
  }

  // Electron update events
  window.electronAPI.onUpdateAvailable(() => {
    titleBar.classList.add('update-available');
    if (userRequested) {
      window.electronAPI.startUpdate();
    }
  });

  window.electronAPI.onUpdateNotAvailable(() => {
    if (userRequested) {
      updateBtn.disabled = false;
      updateBtn.textContent = 'No Update';
      setTimeout(() => {
        updateBtn.textContent = 'Update';
      }, 3000);
      userRequested = false;
    }
  });

  window.electronAPI.onUpdateError((msg) => {
    console.error('[update] error', msg);
    if (userRequested) {
      updateBtn.disabled = false;
      updateBtn.textContent = 'Error';
      setTimeout(() => {
        updateBtn.textContent = 'Update';
      }, 3000);
      userRequested = false;
    }
  });

  window.electronAPI.onDownloadProgress((percent) => {
    debugLog('[update] download progress', percent);
    updateBtn.textContent = `${Math.floor(percent)}%`;
  });

  window.electronAPI.onUpdateDownloaded(() => {
    debugLog('[update] update downloaded');
    updateBtn.textContent = 'Restarting';
  });
  const el = document.getElementById('app-version');
  if (!el || !window.electronAPI?.getAppVersion) return;
  window.electronAPI.getAppVersion().then(v => {
    el.textContent = v;
  });
});
