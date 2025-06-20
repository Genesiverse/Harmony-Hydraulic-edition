window.addEventListener('DOMContentLoaded', () => {
  const settingsBtn = document.getElementById('settingsBtn');
  const closeBtn = document.getElementById('closeSettings');
  const marioToggle = document.getElementById('marioBackgroundToggle');
  const editor = document.querySelector('.editor-container');
  const highlightPicker = document.getElementById('highlightPicker');

  // Settings panel is now always visible, so disable toggle buttons

  if (closeBtn && editor) {
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

  if (settingsBtn && editor) {
    settingsBtn.addEventListener('click', () => {
      editor.classList.toggle('show-settings');
      settingsBtn.classList.toggle('active', editor.classList.contains('show-settings'));
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
});
