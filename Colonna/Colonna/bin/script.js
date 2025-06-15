// === Theme logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark');
}
window.addEventListener('DOMContentLoaded', () => {
  const isDark = document.body.classList.contains('dark');
  document.getElementById('themeToggle').checked = isDark;

  document.querySelectorAll('.hide-on-load').forEach(el => {
    el.classList.add('hide-on-load');
  });

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

// === YAML logic
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
      header.textContent = key.charAt(0).toUpperCase() + key.slice(1);
      header.className = 'section-title';
      header.style.fontSize = '1.5em';
      header.style.fontWeight = 'bold';
      header.style.margin = '20px 0 10px 0';

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
    const lastKey = keys[keys.length - 1];
    obj[lastKey] = getValue(input);
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
    const lastKey = keys[keys.length - 1];
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
  const input = document.getElementById('filenameInput');
  const raw = input?.value.trim();
  if (!raw) return 'unnamed.yml';
  return raw.endsWith('.yml') ? raw : raw + '.yml';
}

// === File handling
function loadYAML(content) {
  try {
    originalConfig = jsyaml.load(content);
  } catch (e) {
    alert("Invalid YAML file.");
    return;
  }

  const fileInput = document.getElementById('filenameInput');
  const fileNameGuess = originalConfig?.file_name || originalConfig?.name;
  if (fileNameGuess && fileInput) {
    fileInput.value = fileNameGuess;
  }

  const container = document.getElementById('formContainer');
  container.innerHTML = '';
  renderForm(originalConfig, '', container);
  triggerLayoutTransform();
}

// === Button handlers
document.getElementById('openFileBtn').addEventListener('click', () => {
  document.getElementById('configLoader').click();
});

document.getElementById('configLoader').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const content = await file.text();
  sessionStorage.setItem('yamlContent', content);
  window.location.reload(); // triggers fresh render
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const inputs = document.querySelectorAll('#formContainer input, #formContainer textarea');
  const diffConfig = buildDiff(inputs);
  const yamlOut = jsyaml.dump(diffConfig);
  const outputEl = document.getElementById('output');
  const outputContainer = document.getElementById('outputContainer');

  outputEl.textContent = yamlOut;
  outputContainer.style.display = yamlOut.trim() ? 'block' : 'none';
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const fullConfig = buildFullYAML();
  const yamlOut = jsyaml.dump(fullConfig);
  const blob = new Blob([yamlOut], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = getFilenameFromInput();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

document.getElementById('downloadCompactBtn').addEventListener('click', () => {
  const inputs = document.querySelectorAll('#formContainer input, #formContainer textarea');
  const compact = buildDiff(inputs, true);
  const yamlOut = jsyaml.dump(compact);
  const blob = new Blob([yamlOut], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = getFilenameFromInput();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

document.getElementById('resetBtn').addEventListener('click', () => {
  location.reload();
});

function triggerLayoutTransform() {
  document.body.classList.add('file-loaded');
  document.querySelectorAll('.hide-on-load').forEach(el => {
    el.classList.remove('hide-on-load');
  });

  const dropZone = document.getElementById('dropZone');
  const sidebar = document.querySelector('.sidebar-buttons');
  if (dropZone && sidebar) {
    sidebar.appendChild(dropZone);
    dropZone.classList.add('moved-to-sidebar');
  }

  document.getElementById('mainTitle')?.classList.add('loaded-title');
}

// === Drag and drop
const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});
dropZone.addEventListener('drop', async e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && /\.(ya?ml)$/i.test(file.name)) {
    const content = await file.text();
    sessionStorage.setItem('yamlContent', content);
    window.location.reload(); // triggers new state with file
  }
});
const mainDrop = document.getElementById('mainDropArea');
const overlay = document.getElementById('dropOverlay');

['dragenter', 'dragover'].forEach(eventName => {
  mainDrop.addEventListener(eventName, e => {
    e.preventDefault();
    mainDrop.classList.add('drag-active');
  });
});

['dragleave', 'dragend', 'drop'].forEach(eventName => {
  mainDrop.addEventListener(eventName, e => {
    e.preventDefault();
    mainDrop.classList.remove('drag-active');
  });
});

mainDrop.addEventListener('drop', async e => {
  const file = e.dataTransfer.files[0];
  if (file && /\.(ya?ml)$/i.test(file.name)) {
    const content = await file.text();
    sessionStorage.setItem('yamlContent', content);
    window.location.reload();
  }
});
