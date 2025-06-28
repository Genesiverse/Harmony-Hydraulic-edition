window.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.getElementById('settingsBtn');
  const closeBtn = document.getElementById('closeSettings');
  const marioToggle = document.getElementById('marioBackgroundToggle');
  // const editor = document.querySelector('.editor-container');
  const settingsPanel = document.getElementById('settingsPanel');
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
  if (settingsBtn && settingsPanel) {
    settingsBtn.addEventListener('click', () => {
      // editor.classList.toggle('show-settings');
      // settingsBtn.classList.toggle('active', editor.classList.contains('show-settings'));
      settingsPanel.classList.toggle('visible');
      settingsBtn.classList.toggle('active', settingsPanel.classList.contains('visible'));
    });
  }
  const homeBtn = document.getElementById('resetBtn');
  const actionGroup = document.getElementById('actionGroup');
  
  if (homeBtn && actionGroup && actionGroup.classList.contains('hide-on-load')) {
    homeBtn.classList.add('active');
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
      debugLog('[debug] update button clicked');
      userRequested = true;
      window.electronAPI?.checkForUpdates();
    });
    if (window.electronAPI) {
      window.electronAPI.onUpdateAvailable(() => {
        if (userRequested) {
          if (confirm('Update available!\nUpdate Now or Do It Later?')) {
            window.electronAPI.startUpdate();
          }
          userRequested = false;
        }
      });
      window.electronAPI.onUpdateNotAvailable(() => {
        if (userRequested) {
          alert("No updates found. You're up to date.");
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
