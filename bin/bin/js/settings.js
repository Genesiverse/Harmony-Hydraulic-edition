window.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.getElementById('settingsBtn');
  const closeBtn = document.getElementById('closeSettings');

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      document.body.classList.toggle('show-settings');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.body.classList.remove('show-settings');
    });
  }
});