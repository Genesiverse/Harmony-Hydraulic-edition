let previewMode = 'feather'; // 'full' or 'feather'

// === File load/render ===
function loadYAML(content) {
  try {
    baselineConfig = jsyaml.load(content);
    originalConfig = structuredClone(baselineConfig);
  } catch {
    alert('Invalid YAML file.');
    return;
  }

  const input = document.getElementById('filenameInputName');
  const guess = originalConfig?.file_name || originalConfig?.name;
  if (guess && input) input.value = guess;

  const container = document.getElementById('formContainer');
  container.innerHTML = '';
  renderForm(originalConfig, '', container); // ⬅️ no static depth
  applyDynamicDepths(container); // ✅ assign true DOM-based depth
  triggerLayoutTransform();
  createPreviewToggle();
  openPreview();
}

function applyDynamicDepths(root) {
  const sections = root.querySelectorAll('.section');
  sections.forEach(section => {
    let depth = 0;
    let parent = section.parentElement;
    while (parent) {
      if (parent.classList.contains('section')) depth++;
      parent = parent.parentElement;
    }
    section.setAttribute('data-depth', depth);
  });
}



// === YAML logic ===
let baselineConfig = {};
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

function renderForm(obj, parentKey = '', parentContainer = null) {
  const container = parentContainer || document.getElementById('formContainer');
  const keys = Object.keys(obj);

  keys.forEach((key) => {
    const value = obj[key];
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    const sectionWrapper = document.createElement('div');
    sectionWrapper.className = 'section';

    const header = document.createElement('div');
    header.className = 'section-title';
    header.textContent = key.charAt(0).toUpperCase() + key.slice(1);

    if (typeof advancedMode !== 'undefined' && advancedMode) {
      createAddNestedButton(fullKey, header);
    }

    sectionWrapper.appendChild(header);

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const fieldBlock = document.createElement('div');
      fieldBlock.className = 'field-block';

      const subGroup = document.createElement('div');
      subGroup.className = 'field-subgroup';

      fieldBlock.appendChild(subGroup);
      sectionWrapper.appendChild(fieldBlock);
      container.appendChild(sectionWrapper);

      renderForm(value, fullKey, subGroup); // no depth param needed now
    } else {
      const group = document.createElement('div');
      group.className = 'field-group';

      const label = document.createElement('label');
      label.className = 'toggle';

      if (typeof advancedMode !== 'undefined' && advancedMode) {
        createAddNestedButton(parentKey, label);
      }

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

      const wrapper = document.createElement('div');
      wrapper.className = 'field-block';
      wrapper.appendChild(group);

      sectionWrapper.appendChild(wrapper);
      container.appendChild(sectionWrapper);
    }
  });
}

function removeEmptyObjects(obj) {
  if (Array.isArray(obj)) {
    return obj
      .map(removeEmptyObjects)
      .filter(v => v !== undefined && !(typeof v === 'object' && Object.keys(v).length === 0));
  } else if (typeof obj === 'object' && obj !== null) {
    const cleaned = {};
    for (const key in obj) {
      const val = removeEmptyObjects(obj[key]);
      if (val !== undefined && !(typeof val === 'object' && Object.keys(val).length === 0)) {
        cleaned[key] = val;
      }
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined;
  }
  return obj;
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
    let ref = baselineConfig;
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
  const raw = document.getElementById('filenameInputName')?.value.trim();
  return raw ? (raw.endsWith('.yml') ? raw : `${raw}.yml`) : 'unnamed.yml';
}



function resetInputToDefault(input) {
  const keys = input.dataset.key.split('.');
  let val = baselineConfig;
  for (const k of keys) {
    val = val?.[k];
    if (val === undefined) break;
  }

  if (input.type === 'checkbox') {
    input.checked = !!val;
  } else if (input.tagName === 'TEXTAREA') {
    input.value = Array.isArray(val) ? val.join('\n') : (val ?? '');
  } else {
    input.value = val ?? '';
  }

  input.dispatchEvent(new Event('input', { bubbles: true }));
}

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
    const target = e.target;
    if (target && target.matches('#formContainer input, #formContainer textarea')) {
      e.preventDefault();
      resetInputToDefault(target);
    }
  }
});