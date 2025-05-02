
const PARTS = [
  { id: 'head-select', file: 'Head' },
  { id: 'core-select', file: 'Core' },
  { id: 'arms-select', file: 'Arms' },
  { id: 'legs-select', file: 'Legs' },
  { id: 'booster-select', file: 'Booster' },
  { id: 'generator-select', file: 'Generator' },
  { id: 'fcs-select', file: 'FCS' },
  { id: 'expansion-select', file: 'Expansion' },
  { id: 'rarm-select', file: 'R-Arm_Unit' },
  { id: 'larm-select', file: 'L-Arm_Unit' },
  { id: 'rback-select', file: 'R-Back_Unit' },
  { id: 'lback-select', file: 'L-Back_Unit' }
];

const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxS6o36AYdA-y3luhOoOyNq7lQvSxsyiNu7ZRu-YghLJERO_eb7OkheCGaQEG-rQ2_d1Q/exec";

window.onload = () => {
  PARTS.forEach(part => loadCSVOptions(part));
  document.getElementById('build-form').addEventListener('submit', handleSubmit);
  googleSheetLoad();
};

function loadCSVOptions(part) {
  fetch(`Parts/${part.file}.csv`)
    .then(res => res.text())
    .then(data => {
      const [header, ...lines] = data.trim().split('\n');
      const headers = header.split(',');
      const nameIndex = headers.indexOf("unitName");
      if (nameIndex === -1) {
        console.error(`"unitName" column not found in ${part.file}.csv`);
        return;
      }
      const select = document.getElementById(part.id);
      lines.forEach(line => {
        const cells = line.split(',');
        const option = document.createElement('option');
        option.value = option.textContent = cells[nameIndex];
        select.appendChild(option);
      });
    })
    .catch(err => console.error(`Error loading ${part.file}:`, err));
}

function handleSubmit(event) {
  event.preventDefault();

  if (document.getElementById('website').value !== "") {
    alert("Bot submission detected. Submission blocked.");
    return;
  }

  const captchaResponse = grecaptcha.getResponse();
  if (!captchaResponse) {
    alert("Please confirm you're not a beep boopin' robot.");
    return;
  }

  const build = {
    acName: document.getElementById('ac-name').value,
    parts: PARTS.map(part => document.getElementById(part.id).value),
    downloadCode: document.getElementById('download-code').value,
    notes: document.getElementById('notes').value
  };

  buildTable(build);
  googleSheetSave(build);
  document.getElementById('build-form').reset();
  grecaptcha.reset();
}


function buildTable(build) {
  const row = document.createElement('tr');
  row.appendChild(makeCell(build.acName));
  build.parts.forEach(part => row.appendChild(makeCell(part)));

  const codeCell = document.createElement('td');
  const codeText = document.createElement('span');
  codeText.textContent = build.downloadCode;
  codeText.className = "download-code";
  const copyBtn = document.createElement('button');
  copyBtn.textContent = "Copy";
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(build.downloadCode);
    copyBtn.textContent = "Copied!";
    setTimeout(() => copyBtn.textContent = "Copy", 1000);
  };
  codeCell.appendChild(codeText);
  codeCell.appendChild(copyBtn);
  row.appendChild(codeCell);

  row.appendChild(makeCell(build.notes));
  document.querySelector('#builds-table tbody').appendChild(row);
}

function makeCell(text) {
  const td = document.createElement('td');
  td.textContent = text;
  return td;
}

function googleSheetSave(build) {
  const formData = new URLSearchParams();
  formData.append("data", JSON.stringify(build));

  fetch(GOOGLE_SHEETS_WEBAPP_URL, {
    method: 'POST',
    body: formData
  })
}

function googleSheetLoad() {
  fetch(GOOGLE_SHEETS_WEBAPP_URL)
    .then(res => res.json())
    .then(builds => {
      builds.forEach(build => buildTable(build));
    })
    .catch(err => console.error('Error loading builds:', err));
}
