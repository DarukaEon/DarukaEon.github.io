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
    loadSavedBuilds();
  };
  
  function loadCSVOptions(part) {
    fetch(`AC6_db/ArmoredCore6_PartsDatabase_${part.file}.csv`)
      .then(res => res.text())
      .then(data => {
        const [header, ...lines] = data.trim().split('\n');
        const headers = header.split(',');
        const nameIndex = headers.indexOf("Part Name");
        if (nameIndex === -1) return;
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
      notes: document.getElementById('notes').value
    };
  
    appendBuildToTable(build);
    saveBuildToStorage(build);
  
    document.getElementById('build-form').reset();
  }
  
  function appendBuildToTable(build) {
    const row = document.createElement('tr');
    row.appendChild(makeCell(build.acName));
    build.parts.forEach(part => row.appendChild(makeCell(part)));
    row.appendChild(makeCell(build.notes));
    document.querySelector('#builds-table tbody').appendChild(row);
  }
  
  function makeCell(text) {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
  }
  
  function saveBuildToStorage(build) {
    const builds = JSON.parse(localStorage.getItem('acviBuilds') || '[]');
    builds.push(build);
    localStorage.setItem('acviBuilds', JSON.stringify(builds));
  }
  
  function loadSavedBuilds() {
    const builds = JSON.parse(localStorage.getItem('acviBuilds') || '[]');
    builds.forEach(build => appendBuildToTable(build));
  }
  