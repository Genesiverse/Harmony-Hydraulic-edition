
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
  const data = previewMode === 'full' ? buildFullYAML() : buildDiff(inputs);
  const yamlOut = jsyaml.dump(removeEmptyObjects(data));
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