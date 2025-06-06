
function copyToClipboard(button) {
  const code = button.parentElement.querySelector('.code-text').textContent;
  navigator.clipboard.writeText(code).then(() => {
    button.textContent = "Copied!";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 1000);
  }).catch(err => {
    console.error("Failed to copy:", err);
  });
}



function buildTable(build) {
  const container = document.getElementById("builds-container");
  const entry = document.createElement("div");
  entry.className = "build-entry";
  entry.innerHTML = `
    <table>
      <tr><th>AC Name</th><td>${build.acName}</td><td rowspan="14" class="notes-cell">${build.notes}</td></tr>
      <tr><th>Head</th><td>${build.head}</td></tr>
      <tr><th>Core</th><td>${build.core}</td></tr>
      <tr><th>Arms</th><td>${build.arms}</td></tr>
      <tr><th>Legs</th><td>${build.legs}</td></tr>
      <tr><th>Booster</th><td>${build.booster}</td></tr>
      <tr><th>Generator</th><td>${build.generator}</td></tr>
      <tr><th>FCS</th><td>${build.fcs}</td></tr>
      <tr><th>Expansion</th><td>${build.expansion}</td></tr>
      <tr><th>R-Arm</th><td>${build.rarm}</td></tr>
      <tr><th>L-Arm</th><td>${build.larm}</td></tr>
      <tr><th>R-Back</th><td>${build.rback}</td></tr>
      <tr><th>L-Back</th><td>${build.lback}</td></tr>
      <tr>
        <th>Download Code</th>
        <td>
          <span class="code-text">${build.code}</span>
          <button onclick="copyToClipboard(this)">Copy</button>
        </td>
      </tr>
    </table>
  `;
  container.appendChild(entry);
}

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

const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxDafgqfwR2XMpAEy5lJywXf-btoHoyFjFCDkLw7TaudyBgtzjpbZtlfibBEHpUtyyy/exec";

window.onload = () => {
  PARTS.forEach(part => loadCSVOptions(part));
  document.getElementById('build-form').addEventListener('submit', handleSubmit);
  googleSheetLoad();

  const music = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");

  musicToggle.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicToggle.textContent = "Pause Music";
    } else {
      music.pause();
      musicToggle.textContent = "Play Music";
    }
  });

  const toggleBtn = document.getElementById("toggle-form");
  const container = document.getElementById("form-container");

  const savedState = localStorage.getItem("formVisibility");
  if (savedState === "hidden") {
    container.classList.add("hidden");
    toggleBtn.textContent = "Show";
  } else {
    toggleBtn.textContent = "Hide";
  }

  toggleBtn.addEventListener("click", () => {
    if (container.classList.contains("hidden")) {
      container.classList.remove("hidden");
      toggleBtn.textContent = "Hide";
      localStorage.setItem("formVisibility", "shown");
    } else {
      container.classList.add("hidden");
      toggleBtn.textContent = "Show";
      localStorage.setItem("formVisibility", "hidden");
    }
  });


  document.getElementById('search-bar').addEventListener('input', function () {
    const filter = this.value.toLowerCase();
    const entries = document.querySelectorAll('.build-entry');

    entries.forEach(entry => {
      const text = entry.textContent.toLowerCase();
      entry.style.display = text.includes(filter) ? '' : 'none';
    });
  });

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
  const acName = document.getElementById('ac-name').value;
  const notes = document.getElementById('notes').value;

  // Initialize the filter
  const filter = new Filter();

  filter.addWords("fuck", "fucker", "nigger", "nigga", "cunt", "bitch", "asshole", "dyke", "kys", "pussy", "faggot", "fag", "chink");

  const normalize = str => str.toLowerCase().replace(/\s+/g, "");

  const isProfane = text => filter.isProfane(normalize(text));

  if (isProfane(acName) || isProfane(notes)) {
    alert("Your AC name or notes contain inappropriate language. Please revise and try again.");
    return;
  }

  if (document.getElementById('website').value !== "") {
    alert("Bot submission detected. Submission blocked.");
    return;
  }

  const captchaResponse = grecaptcha.getResponse();
  if (!captchaResponse) {
    alert("Please confirm you're not a robot using the checkbox.");
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
    .then(res => res.text())
    .then(data => console.log('Saved to Google Sheets:', data))
    .catch(err => console.error('Error saving build:', err));
}


function googleSheetLoad() {
  fetch(GOOGLE_SHEETS_WEBAPP_URL)
    .then(res => res.json())
    .then(rawBuilds => {
      console.log("Loaded builds:", rawBuilds);
      rawBuilds.forEach(entry => {
        const build = {
          acName: entry.acName,
          head: entry.head,
          core: entry.core,
          arms: entry.arms,
          legs: entry.legs,
          booster: entry.booster,
          generator: entry.generator,
          fcs: entry.fcs,
          expansion: entry.expansion,
          rarm: entry.rarm,
          larm: entry.larm,
          rback: entry.rback,
          lback: entry.lback,
          code: entry.downloadCode,
          notes: entry.notes
        };
        buildTable(build);
      });
    })
    .catch(err => console.error('Error loading builds:', err));
}


const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicToggle.textContent = "Pause Music";
  } else {
    music.pause();
    musicToggle.textContent = "Play Music";
  }
});