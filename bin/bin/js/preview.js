function createPreviewToggle() {
  const container = document.querySelector('#outputContainer');
  if (!container) return;

  const header = document.createElement('div');
  header.className = 'preview-header-inline';

  const title = document.createElement('span');
  title.className = 'preview-title';
  title.textContent = 'Preview';

  const mode = document.createElement('span');
  mode.className = 'preview-mode-label';
  mode.textContent = 'feather';

  const label = document.createElement('label');
  label.className = 'toggle-switch';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.id = 'previewToggle';
  input.checked = false;

  const slider = document.createElement('span');
  slider.className = 'slider';

  input.addEventListener('change', () => {
    previewMode = input.checked ? 'pro' : 'feather';
    mode.textContent = previewMode;
    const out = document.getElementById('output');
    if (out) out.readOnly = previewMode === 'feather';
    updateLiveOutput();
  });

  label.appendChild(input);
  label.appendChild(slider);

  // const closeBtn = document.createElement('button');
  // closeBtn.className = 'preview-close';
  // closeBtn.textContent = '✖';
  // closeBtn.addEventListener('click', () => {
    // const wrapper = document.querySelector('.editor-container');
    // wrapper.classList.remove('show-preview');
    // document.getElementById('output').textContent = '';
  // });
  
  const group = document.createElement('div');
  group.className = 'preview-toggle-group';
  group.appendChild(mode);
  group.appendChild(label);
  // group.appendChild(closeBtn);

  header.appendChild(title);
  // header.appendChild(mode);
  // header.appendChild(label);
  // header.appendChild(closeBtn);
  header.appendChild(group);

  container.prepend(header);
  const out = document.getElementById('output');
  if (out) out.readOnly = previewMode === 'feather';
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
    output.value = '';
    return;
  }

  const inputs = document.querySelectorAll('#formContainer input, #formContainer textarea');
  const data = previewMode === 'pro' ? buildFullYAML() : buildDiff(inputs);
  const yaml = jsyaml.dump(removeEmptyObjects(data));
  output.value = yaml;
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

const output = document.getElementById('output');
if (output) {
  output.addEventListener('input', () => {
    output.style.height = 'auto';
    output.style.height = `${output.scrollHeight}px`;
  });
}


window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.preload-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const file = btn.dataset.file;
      if (!file) {
        alert('Preset not available');
        return;
      }

      // fallback to fetch if running on a server
      const useEmbedded =
        location.protocol === 'file:' && window.preloadYamls && window.preloadYamls[file];

      const load = useEmbedded
        ? Promise.resolve(window.preloadYamls[file])
        : fetch(file).then(r => r.text());

      load
        .then(text => {
          sessionStorage.setItem('yamlContent', text);
          window.location.reload();
        })
        .catch(() => alert('Failed to load preset'));
    });
  });
});