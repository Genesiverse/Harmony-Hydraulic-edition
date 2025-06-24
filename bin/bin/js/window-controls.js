window.addEventListener('DOMContentLoaded', () => {
  const close = document.getElementById('windowClose');
  const min = document.getElementById('windowMin');
  const max = document.getElementById('windowMax');
  const dragZone = document.getElementById('titleBar');

  if (close) close.addEventListener('click', () => window.electronAPI?.close());
  if (min) min.addEventListener('click', () => window.electronAPI?.minimize());
  if (max) max.addEventListener('click', () => window.electronAPI?.maximize());

  // Intercept double-click to trigger custom maximize logic
  if (dragZone) {
    dragZone.addEventListener('dblclick', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.electronAPI?.maximize();
    });
  }

  // Retro64 toggle
  const retroToggle = document.getElementById('retro64Toggle');
  if (retroToggle) {
    const enabled = localStorage.getItem('retro64') === 'true';
    document.body.classList.toggle('retro64', enabled);
    retroToggle.checked = enabled;
    retroToggle.addEventListener('change', () => {
      const active = retroToggle.checked;
      document.body.classList.toggle('retro64', active);
      localStorage.setItem('retro64', active);
    });
  }

  // Brutalist toggle
  const brutalistToggle = document.getElementById('brutalistToggle');
  if (brutalistToggle) {
    const enabled = localStorage.getItem('brutalist') === 'true';
    document.body.classList.toggle('brutalist', enabled);
    brutalistToggle.checked = enabled;
    brutalistToggle.addEventListener('change', () => {
      const active = brutalistToggle.checked;
      document.body.classList.toggle('brutalist', active);
      localStorage.setItem('brutalist', active);
    });
  }
});
const brutalistToggle = document.getElementById('brutalistToggle');
if (brutalistToggle) {
  const enabled = localStorage.getItem('brutalist') === 'true';
  document.body.classList.toggle('brutalist', enabled);
  brutalistToggle.checked = enabled;

  brutalistToggle.addEventListener('change', () => {
    const active = brutalistToggle.checked;
    document.body.classList.toggle('brutalist', active);
    localStorage.setItem('brutalist', active);
  });
}
