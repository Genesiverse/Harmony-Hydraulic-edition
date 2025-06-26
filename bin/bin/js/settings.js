window.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.getElementById('settingsBtn');
  const closeBtn = document.getElementById('closeSettings');
  const marioToggle = document.getElementById('marioBackgroundToggle');
  const settingsContainer = document.getElementById('settingsContainer');
  const highlightPicker = document.getElementById('highlightPicker');

  // Settings panel is now always visible, so disable toggle buttons

  // if (closeBtn && editor) {
  if (closeBtn) {
    closeBtn.style.display = 'none';
  }
  if (marioToggle) {
    const hide = localStorage.getItem('hideMario') === 'true';
    document.body.classList.toggle('hide-mario', hide);
    marioToggle.checked = !hide;

    marioToggle.addEventListener('change', () => {
      const shouldHide = !marioToggle.checked;
      document.body.classList.toggle('hide-mario', shouldHide);
      localStorage.setItem('hideMario', shouldHide);
    });
  }

  // if (settingsBtn && editor) {
  if (settingsBtn && settingsContainer) {
    settingsBtn.addEventListener('click', () => {
      settingsContainer.classList.toggle('open');
      document.body.classList.toggle('settings-open', settingsContainer.classList.contains('open'));
      settingsBtn.classList.toggle('active', settingsContainer.classList.contains('open'));
    });
  }
  if (highlightPicker) {
    const storedColor = localStorage.getItem('highlightColor');
    if (storedColor) {
      document.documentElement.style.setProperty('--highlight', storedColor);
      highlightPicker.value = storedColor;
    } else {
      highlightPicker.value = getComputedStyle(document.documentElement)
        .getPropertyValue('--highlight')
        .trim();
    }

    highlightPicker.addEventListener('input', () => {
      const color = highlightPicker.value;
      document.documentElement.style.setProperty('--highlight', color);
      localStorage.setItem('highlightColor', color);
    });
  }

  const updateBtn = document.getElementById('updateButton');
  if (updateBtn) {
    let userRequested = false;
    updateBtn.addEventListener('click', () => {
      userRequested = true;
      window.electronAPI?.checkForUpdates();
    });
    if (window.electronAPI) {
      window.electronAPI.onUpdateAvailable(() => {
        if (userRequested) {
          alert('Update available!');
          userRequested = false;
        }
      });
      window.electronAPI.onUpdateNotAvailable(() => {
        if (userRequested) {
          alert('No updates found. You\'re up to date.');
          userRequested = false;
        }
      });
      window.electronAPI.onUpdateError((msg) => {
        if (userRequested) {
          alert(`Update check failed: ${msg}`);
          userRequested = false;
        }
      });
    }
  }
});
