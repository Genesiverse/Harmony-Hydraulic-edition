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
      window.electronAPI?.doubleClickTitlebar();
    });
  }

});
