
// === Advanced Mode Toggle ===
let advancedMode = false;

function createAdvancedToggle() {
  const btn = document.getElementById('pro-advance-toogle');
  if (!btn) return;

  btn.classList.remove('hide-on-load'); // show only after load
  btn.addEventListener('click', () => {
    advancedMode = !advancedMode;
    document.body.classList.toggle('advanced-mode', advancedMode);
    rerenderFields();
  });
}

function rerenderFields() {
  const form = document.getElementById('formContainer');
  const yaml = buildFullYAML();
  form.innerHTML = '';
  renderForm(yaml);
}

function createAddNestedButton(parentKey, container) {
  const btn = document.createElement('span');
  btn.textContent = '+';
  btn.className = 'add-nested-symbol';
  btn.title = 'Add nested field';
  btn.addEventListener('click', () => {
    const keys = parentKey.split('.');
    let obj = originalConfig;
    for (let i = 0; i < keys.length; i++) {
      obj = obj[keys[i]] = obj[keys[i]] || {};
    }
    const newKey = 'new_field_' + Object.keys(obj).length;
    obj[newKey] = '';
    rerenderFields();
  });

  container.insertBefore(btn, container.firstChild);
}

// Patch into renderForm
const originalRenderForm = renderForm;
renderForm = function (obj, parentKey = '', depth = 0, parentContainer = null) {
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

      if (advancedMode) {
        createAddNestedButton(fullKey, header);
      }

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

      if (advancedMode) {
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
        if (value.some(v => typeof v === 'object')) {
          input.value = JSON.stringify(value, null, 2);
          input.dataset.objectArray = 'true';
        } else {
          input.value = value.join('\n');
        }
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
};

window.addEventListener('DOMContentLoaded', createAdvancedToggle);
