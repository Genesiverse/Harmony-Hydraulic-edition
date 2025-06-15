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

// === YAML logic ===
let originalConfig = {};

function getValue(input) {
  if (input.type === 'checkbox') return input.checked;
  if (input.tagName === 'TEXTAREA') return input.value.split('\n');
  if (input.type === 'number') return parseFloat(input.value);
  try { return JSON.parse(input.value); } catch { return input.value; }
}

function isEmpty(val) {
  return val === null || val === '' || (Array.isArray(val) && val.length === 0);
}

function renderForm(obj, parentKey = '', depth = 0, parentContainer = null) {
  const container = parentContainer || document.getElementById('formContainer');

  for (const key in obj) {
    const value = obj[key];
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const section = document.createElement('div');
      section.className = 'section';

      const header = document.createElement('div');
      header.className = 'section-title';
      header.textContent = key.charAt(0).toUpperCase() + key.slice(1);

      const fieldBlock = document.createElement('div');
      fieldBlock.className = 'field-block';

      const subGroup = document.createElement('div');
      subGroup.className = 'field-subgroup';

      fieldBlock.appendChild(subGroup);
      section.appendChild(header);
      section.appendChild(fieldBlock);
      container.appendChild(section);

      renderForm(value, fullKey, depth + 1, subGroup);
    } else {
      const group = document.createElement('div');
      group.className = 'field-group';

      const label = document.createElement('label');
      label.className = 'toggle';

      const span = document.createElement('span');
      span.textContent = key;

      let input;
      if (typeof value === 'boolean') {
        input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = value;
      } else if (typeof value === 'number') {
        input = document.createElement('input');
        input.type = 'number';
        input.value = value;
      } else if (Array.isArray(value)) {
        input = document.createElement('textarea');
        input.value = value.join('\n');
      } else {
        input = document.createElement('input');
        input.type = 'text';
        input.value = value;
      }

      input.dataset.key = fullKey;
      label.appendChild(span);
      label.appendChild(input);
      group.appendChild(label);
      container.appendChild(group);
    }
  }
}

function buildFullYAML() {
  const inputs = document.querySelectorAll('#formContainer input, #formContainer textarea');
  const clone = structuredClone(originalConfig);

  inputs.forEach(input => {
    const keys = input.dataset.key.split('.');
    let obj = clone;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]] = obj[keys[i]] || {};
    }
    obj[keys.at(-1)] = getValue(input);
  });

  return clone;
}

function buildDiff(inputs, skipEmpty = false) {
  const result = {};
  inputs.forEach(input => {
    const keys = input.dataset.key.split('.');
    let obj = result;
    let ref = originalConfig;
    const val = getValue(input);

    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]] = obj[keys[i]] || {};
      ref = ref?.[keys[i]];
    }

    const lastKey = keys.at(-1);
    const originalVal = ref?.[lastKey];

    if (JSON.stringify(val) !== JSON.stringify(originalVal)) {
      if (!(skipEmpty && isEmpty(val))) {
        obj[lastKey] = val;
      }
    }
  });
  return result;
}

function getFilenameFromInput() {
  const raw = document.getElementById('filenameInput')?.value.trim();
  return raw ? (raw.endsWith('.yml') ? raw : `${raw}.yml`) : 'unnamed.yml';
}

// === File load/render ===
function loadYAML(content) {
  try {
    originalConfig = jsyaml.load(content);
  } catch {
    alert('Invalid YAML file.');
    return;
  }

  const input = document.getElementById('filenameInput');
  const guess = originalConfig?.file_name || originalConfig?.name;
  if (guess && input) input.value = guess;

  const container = document.getElementById('formContainer');
  container.innerHTML = '';
  renderForm(originalConfig, '', 0, container);
  triggerLayoutTransform();
}

// === Button handlers ===
document.getElementById('openFileBtn').addEventListener('click', () => {
  document.getElementById('configLoader').click();
});

document.getElementById('configLoader').addEventListener('change', async e => {
  const file = e.target.files[0];
  const content = await file.text();
  sessionStorage.setItem('yamlContent', content);
  window.location.reload();
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const inputs = document.querySelectorAll('#formContainer input, #formContainer textarea');
  const diff = buildDiff(inputs);
  const yaml = jsyaml.dump(diff);
  document.getElementById('output').textContent = yaml;

  const wrapper = document.querySelector('.editor-container');
  wrapper.classList.toggle('show-preview', yaml.trim());
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const yaml = jsyaml.dump(buildFullYAML());
  const blob = new Blob([yaml], { type: 'text/yaml' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = getFilenameFromInput();
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
});

document.getElementById('downloadCompactBtn').addEventListener('click', () => {
  const inputs = document.querySelectorAll('#formContainer input, #formContainer textarea');
  const yaml = jsyaml.dump(buildDiff(inputs, true));
  const blob = new Blob([yaml], { type: 'text/yaml' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = getFilenameFromInput();
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  location.reload();
});

// === Layout updates ===
function triggerLayoutTransform() {
  document.body.classList.add('file-loaded');
  document.querySelectorAll('.hide-on-load').forEach(el => el.classList.remove('hide-on-load'));

  const dropZone = document.getElementById('dropZone');
  const sidebar = document.querySelector('.sidebar-buttons');
  if (dropZone && sidebar) {
    sidebar.appendChild(dropZone);
    dropZone.classList.add('moved-to-sidebar');
  }

  document.getElementById('mainTitle')?.classList.add('loaded-title');
}

// === Drag and Drop ===
const dropZone = document.getElementById('dropZone');
const mainDrop = document.getElementById('mainDropArea');
const overlay = document.getElementById('dropOverlay');

dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', async e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && /\.(ya?ml)$/i.test(file.name)) {
    const content = await file.text();
    sessionStorage.setItem('yamlContent', content);
    window.location.reload();
  }
});

['dragenter', 'dragover'].forEach(event =>
  mainDrop.addEventListener(event, e => {
    e.preventDefault();
    mainDrop.classList.add('drag-active');
  })
);
['dragleave', 'dragexit', 'drop'].forEach(event =>
  mainDrop.addEventListener(event, e => {
    e.preventDefault();
    mainDrop.classList.remove('drag-active');
  })
);

mainDrop.addEventListener('drop', async e => {
  const file = e.dataTransfer.files[0];
  if (file && /\.(ya?ml)$/i.test(file.name)) {
    const content = await file.text();
    sessionStorage.setItem('yamlContent', content);
    window.location.reload();
  }
});
function updateLiveOutput() {
  const inputs = document.querySelectorAll('#formContainer input, #formContainer textarea');
  const diffConfig = buildDiff(inputs);
  const yamlOut = jsyaml.dump(diffConfig);
  document.getElementById('output').textContent = yamlOut;
}
let outputVisible = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    outputVisible = entry.isIntersecting;
  });
}, {
  root: null,
  threshold: 0.1
});

observer.observe(document.getElementById('output'));

document.addEventListener('input', () => {
  if (outputVisible) {
    updateLiveOutput();
  }
});

