
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

const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxkcZREOnj4iBo32dRJBMsPIOUOrK1sANrX2lXmJzUNK7qG_XB8b5U4X_N5i_5wzr5qHg/exec";
const BAD_WORDS = ["fuck", "pussy", "bitch", "asshole", "kys", "kill yourself", "dyke", "nigger", "nigga", "niger"];

window.onload = () => {
  PARTS.forEach(part => loadCSVOptions(part));
  document.getElementById('build-form').addEventListener('submit', handleSubmit);
  googleSheetLoad();

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

  document.getElementById('search-bar')?.addEventListener('input', function () {
    const filter = this.value.toLowerCase();
    const entries = document.querySelectorAll('.build-entry');
    entries.forEach(entry => {
      const text = entry.textContent.toLowerCase();
      entry.style.display = text.includes(filter) ? '' : 'none';
    });
  });
};

function containsProfanity(text) {
  const normalized = text.toLowerCase().replace(/\s+/g, '');
  return BAD_WORDS.some(bad => normalized.includes(bad));
}

function loadCSVOptions(part) {
  fetch(`Parts/${part.file}.csv`)
    .then(res => res.text())
    .then(data => {
      const [header, ...lines] = data.trim().split('\n');
      const headers = header.split(',');
      const nameIndex = headers.indexOf("unitName");
      if (nameIndex === -1) return;

      const select = document.getElementById(part.id);
      lines.forEach(line => {
        const cells = line.split(',');
        const option = document.createElement('option');
        option.value = option.textContent = cells[nameIndex];
        select.appendChild(option);
      });
    });
}

function handleSubmit(event) {
  event.preventDefault();

  if (document.getElementById('website').value !== "") {
    alert("Bot submission detected.");
    return;
  }

  const captchaResponse = grecaptcha.getResponse();
  if (!captchaResponse) {
    alert("Please verify CAPTCHA.");
    return;
  }

  const build = {
    acName: document.getElementById('ac-name').value,
    head: document.getElementById('head-select').value,
    core: document.getElementById('core-select').value,
    arms: document.getElementById('arms-select').value,
    legs: document.getElementById('legs-select').value,
    booster: document.getElementById('booster-select').value,
    generator: document.getElementById('generator-select').value,
    fcs: document.getElementById('fcs-select').value,
    expansion: document.getElementById('expansion-select').value,
    rarm: document.getElementById('rarm-select').value,
    larm: document.getElementById('larm-select').value,
    rback: document.getElementById('rback-select').value,
    lback: document.getElementById('lback-select').value,
    code: document.getElementById('download-code').value,
    notes: document.getElementById('notes').value
  };

  const combinedText = (build.acName + build.notes).replace(/\s+/g, '');
  if (containsProfanity(combinedText)) {
    alert("Please remove offensive words from AC Name or Notes.");
    return;
  }

  buildTable(build);
  googleSheetSave(build);
  document.getElementById('build-form').reset();
  grecaptcha.reset();
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
      rawBuilds.forEach(entry => {
        buildTable({
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
        });
      });
    })
    .catch(err => console.error('Error loading builds:', err));
}
