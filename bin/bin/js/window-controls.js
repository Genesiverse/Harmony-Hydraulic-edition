window.addEventListener('DOMContentLoaded', () => {
  const close = document.getElementById('windowClose');
  const min = document.getElementById('windowMin');
  const max = document.getElementById('windowMax');

  if (close) close.addEventListener('click', () => window.electronAPI?.close());
  if (min) min.addEventListener('click', () => window.electronAPI?.minimize());
  if (max) max.addEventListener('click', () => window.electronAPI?.maximize());

  const blurToggle = document.getElementById('blurEffectToggle');
  if (blurToggle) {
    const enabled = localStorage.getItem('blurWindow') === 'true';
    document.body.classList.toggle('blur-window', enabled);
    blurToggle.checked = enabled;
    blurToggle.addEventListener('change', () => {
      const active = blurToggle.checked;
      document.body.classList.toggle('blur-window', active);
      localStorage.setItem('blurWindow', active);
    });
  }
});
