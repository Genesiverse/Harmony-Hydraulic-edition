let previewMode = 'feather'; // 'full' or 'feather'
// === Theme logic ===
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

window.addEventListener('DOMContentLoaded', () => {
  const isDark = document.body.classList.contains('dark');
  document.getElementById('themeToggle').checked = isDark;

  document.querySelectorAll('.hide-on-load').forEach(el => el.classList.add('hide-on-load'));

  const storedContent = sessionStorage.getItem('yamlContent');
  if (storedContent) {
    sessionStorage.removeItem('yamlContent');
    loadYAML(storedContent);
  }
});

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  document.getElementById('themeToggle').checked = isDark;
}
