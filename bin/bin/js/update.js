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
