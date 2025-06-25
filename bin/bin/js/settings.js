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
    updateBtn.addEventListener('click', () => {
      window.electronAPI?.checkForUpdates();
    });
  }
});
