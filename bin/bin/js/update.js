window.addEventListener('DOMContentLoaded', () => {
  const titleBar = document.getElementById('titleBar');
  if (!titleBar) return;

  const updateBtn = document.createElement('button');
  updateBtn.id = 'updateTitleBtn';
  updateBtn.textContent = 'Update';
  updateBtn.addEventListener('click', () => {
    window.electronAPI.startUpdate();
    updateBtn.disabled = true;
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
  });

  window.electronAPI.onDownloadProgress((percent) => {
    updateBtn.textContent = `${Math.floor(percent)}%`;
  });

  window.electronAPI.onUpdateDownloaded(() => {
    updateBtn.textContent = 'Restarting';
  });
});
