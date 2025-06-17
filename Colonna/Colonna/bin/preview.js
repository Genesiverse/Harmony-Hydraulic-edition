function createPreviewToggle() {
  const container = document.querySelector('#outputContainer');
  if (!container) return;

  const header = document.createElement('div');
  header.className = 'preview-header-inline';

  const title = document.createElement('span');
  title.className = 'preview-title';
  title.textContent = 'Preview';

  const text = document.createElement('span');
  text.className = 'preview-mode-label';
  text.textContent = 'feather';

  const label = document.createElement('label');
  label.className = 'toggle-switch';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = 'previewToggle';
  input.checked = true;

  const slider = document.createElement('span');
  slider.className = 'slider';

  input.addEventListener('change', () => {
    previewMode = input.checked ? 'feather' : 'full';
    text.textContent = previewMode;
    updateLiveOutput();
  });

  label.appendChild(input);
  label.appendChild(slider);

  header.appendChild(title);
  header.appendChild(text);
  header.appendChild(label);

  container.prepend(header);
}





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
  const wrapper = document.querySelector('.editor-container');
  const output = document.getElementById('output');

  // Toggle visibility
  if (wrapper.classList.contains('show-preview')) {
    wrapper.classList.remove('show-preview');
    output.textContent = '';
    return;
  }

  const inputs = document.querySelectorAll('#formContainer input, #formContainer textarea');
  const data = previewMode === 'full' ? buildFullYAML() : buildDiff(inputs);
  const yaml = jsyaml.dump(removeEmptyObjects(data));
  output.textContent = yaml;
  wrapper.classList.add('show-preview');
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const yaml = jsyaml.dump(removeEmptyObjects(buildFullYAML()));
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
  const yaml = jsyaml.dump(removeEmptyObjects(buildDiff(inputs, true)));
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

