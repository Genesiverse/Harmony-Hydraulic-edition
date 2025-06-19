
// === Drag and Drop ===
const dropZone = document.getElementById('dropZone');
const mainDrop = document.getElementById('layoutContainer');
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
let dragCounter = 0;

['dragenter', 'dragover'].forEach(event =>
  mainDrop.addEventListener(event, e => {
    e.preventDefault();
    if (event === 'dragenter') dragCounter++;
    mainDrop.classList.add('drag-active');
  })
);
['dragleave', 'dragexit', 'drop'].forEach(event =>
  mainDrop.addEventListener(event, e => {
    e.preventDefault();
    if (event === 'dragleave' || event === 'dragexit') dragCounter = Math.max(0, dragCounter - 1);
    if (dragCounter === 0 || event === 'drop') {
      mainDrop.classList.remove('drag-active');
      dragCounter = 0;
    }
  })
);

mainDrop.addEventListener('drop', async e => {
  const file = e.dataTransfer.files[0];
  dragCounter = 0;
  mainDrop.classList.remove('drag-active');
  if (file && /\.(ya?ml)$/i.test(file.name)) {
    const content = await file.text();
    sessionStorage.setItem('yamlContent', content);
    window.location.reload();
  }
});


function mergePatch(target, patch) {
  for (const key in patch) {
    const val = patch[key];
    if (Array.isArray(val)) {
      target[key] = val.slice();
    } else if (typeof val === 'object' && val !== null) {
      target[key] = target[key] || {};
      mergePatch(target[key], val);
    } else {
      target[key] = val;
    }
  }
}

function refreshFormFromOutput() {
  const output = document.getElementById('output');
  if (!output) return;
  try {
    const parsed = jsyaml.load(output.value);
    if (previewMode === 'feather') {
      mergePatch(originalConfig, parsed);
    } else {
      originalConfig = parsed;
    }
    const container = document.getElementById('formContainer');
    container.innerHTML = '';
    renderForm(originalConfig, '', container);
    applyDynamicDepths(container);
  } catch {
    // ignore invalid YAML while typing
  }
}


function updateLiveOutput() {
  const inputs = document.querySelectorAll('#formContainer input, #formContainer textarea');
  const data = previewMode === 'pro' ? buildFullYAML() : buildDiff(inputs);
  const yamlOut = jsyaml.dump(removeEmptyObjects(data));
  document.getElementById('output').value = yamlOut;
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

const formEl = document.getElementById('formContainer');
if (formEl) {
  formEl.addEventListener('input', () => {
    updateLiveOutput();
  });
}

const outputEl = document.getElementById('output');
if (outputEl) {
  outputEl.addEventListener('input', refreshFormFromOutput);
}