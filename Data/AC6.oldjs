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

window.onload = () => {
  PARTS.forEach(part => loadCSVOptions(part));
  document.getElementById('build-form').addEventListener('submit', handleSubmit);
  loadBuild();
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

  const build = {
    acName: document.getElementById('ac-name').value,
    parts: PARTS.map(part => document.getElementById(part.id).value),
    downloadCode: document.getElementById('download-code').value,
    notes: document.getElementById('notes').value
  };

  buildTable(build);
  saveBuild(build);

  document.getElementById('build-form').reset();
}

function buildTable(build) {
  const row = document.createElement('tr');
  row.appendChild(makeCell(build.acName));
  build.parts.forEach(part => row.appendChild(makeCell(part)));

  // Add download code cell with copy button
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

function saveBuild(build) {
  const builds = JSON.parse(localStorage.getItem('ac6Builds') || '[]');
  builds.push(build);
  localStorage.setItem('ac6Builds', JSON.stringify(builds));
}

function loadBuild() {
  const builds = JSON.parse(localStorage.getItem('ac6Builds') || '[]');
  builds.forEach(build => buildTable(build));
}
