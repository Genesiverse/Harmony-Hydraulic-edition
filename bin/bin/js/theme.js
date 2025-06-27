
// === Theme logic ===
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}

const savedRetro = localStorage.getItem('retro64');
if (savedRetro === 'true') {
  document.body.classList.add('retro64');
}

const savedBrutal = localStorage.getItem('brutalist');
if (savedBrutal === 'true') {
  document.body.classList.add('brutalist');
}

const savedBrutald = localStorage.getItem('brutalist-d');
if (savedBrutald === 'true') {
  document.body.classList.add('brutalist-d');
}
const savedD97 = localStorage.getItem('d97');
if (savedD97 === 'true') {
  document.body.classList.add('d97');
}

function setupToggle(id, className, storageKey) {
  const toggle = document.getElementById(id);
  if (!toggle) return;
  const enabled = storageKey === 'theme'
    ? localStorage.getItem(storageKey) === 'dark'
    : localStorage.getItem(storageKey) === 'true';
  document.body.classList.toggle(className, enabled);
  toggle.checked = enabled;
  toggle.addEventListener('change', () => {
    const active = toggle.checked;
    document.body.classList.toggle(className, active);
    if (storageKey === 'theme') {
      localStorage.setItem(storageKey, active ? 'dark' : 'light');
    } else {
      localStorage.setItem(storageKey, active);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setupToggle('themeToggle', 'dark', 'theme');
  setupToggle('retro64Toggle', 'retro64', 'retro64');
  setupToggle('brutalistToggle', 'brutalist', 'brutalist');
  setupToggle('brutalistDarkToggle', 'brutalist-d', 'brutalist-d');
  setupToggle('D97Toggle', 'd97', 'd97');

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
