/* =========================================================
   INDICATORS MODULE
   Static localStorage asosida ishlaydi
========================================================= */

const INDICATORS_STORAGE_KEY = "strategiya_platform_indicators_v1";

let indicatorEditId = null;
let indicatorsEventsBound = false;

const DEFAULT_INDICATORS = [
  {
    id: 1,
    name: "Soliq tushumlari o‘sishi",
    direction: "Soliq ma’murchiligi",
    current: 78,
    target: 100,
    unit: "%",
    status: "process",
    deadline: "2026-09-04",
    note: "Hududlar kesimida soliq tushumlari barqarorligini oshirish."
  },
  {
    id: 2,
    name: "Raqamli xizmatlardan foydalanish",
    direction: "Raqamlashtirish",
    current: 92,
    target: 100,
    unit: "%",
    status: "completed",
    deadline: "2026-10-01",
    note: "Elektron xizmatlar orqali murojaat va hisobotlarni ko‘paytirish."
  },
  {
    id: 3,
    name: "Kechikkan topshiriqlar ulushi",
    direction: "Ijro intizomi",
    current: 18,
    target: 5,
    unit: "%",
    status: "risk",
    deadline: "2026-08-20",
    note: "Muddatdan o‘tgan topshiriqlar ulushini kamaytirish zarur."
  },
  {
    id: 4,
    name: "Jamoatchilik ishonchi indeksi",
    direction: "Jamoatchilik bilan ishlash",
    current: 64,
    target: 85,
    unit: "ball",
    status: "process",
    deadline: "2026-12-01",
    note: "Mustaqil so‘rovnomalar asosida baholanadigan indeks."
  }
];

function getIndicatorsEls() {
  return {
    totalCount: document.getElementById("indicatorTotalCount"),
    completedCount: document.getElementById("indicatorCompletedCount"),
    processCount: document.getElementById("indicatorProcessCount"),
    riskCount: document.getElementById("indicatorRiskCount"),

    searchInput: document.getElementById("indicatorSearchInput"),
    statusFilter: document.getElementById("indicatorStatusFilter"),
    directionFilter: document.getElementById("indicatorDirectionFilter"),

    formPanel: document.getElementById("indicatorFormPanel"),
    formTitle: document.getElementById("indicatorFormTitle"),
    openFormBtn: document.getElementById("openIndicatorFormBtn"),
    closeFormBtn: document.getElementById("closeIndicatorFormBtn"),
    cancelBtn: document.getElementById("cancelIndicatorBtn"),
    saveBtn: document.getElementById("saveIndicatorBtn"),
    resetBtn: document.getElementById("resetIndicatorsBtn"),

    nameInput: document.getElementById("indicatorNameInput"),
    directionInput: document.getElementById("indicatorDirectionInput"),
    currentInput: document.getElementById("indicatorCurrentInput"),
    targetInput: document.getElementById("indicatorTargetInput"),
    unitInput: document.getElementById("indicatorUnitInput"),
    statusInput: document.getElementById("indicatorStatusInput"),
    deadlineInput: document.getElementById("indicatorDeadlineInput"),
    noteInput: document.getElementById("indicatorNoteInput"),

    cardsGrid: document.getElementById("indicatorCardsGrid"),
    tableBody: document.getElementById("indicatorTableBody")
  };
}

function readIndicators() {
  try {
    const saved = localStorage.getItem(INDICATORS_STORAGE_KEY);

    if (!saved) {
      localStorage.setItem(INDICATORS_STORAGE_KEY, JSON.stringify(DEFAULT_INDICATORS));
      return [...DEFAULT_INDICATORS];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.map(normalizeIndicator);
  } catch (error) {
    console.error("INDICATORS STORAGE READ ERROR:", error);
    return [];
  }
}

function saveIndicators(items) {
  localStorage.setItem(INDICATORS_STORAGE_KEY, JSON.stringify(items || []));
}

function normalizeIndicator(item = {}) {
  return {
    id: item.id || Date.now(),
    name: item.name || "Nomsiz indikator",
    direction: item.direction || "Umumiy",
    current: Number(item.current) || 0,
    target: Number(item.target) || 0,
    unit: item.unit || "",
    status: item.status || "process",
    deadline: item.deadline || "",
    note: item.note || ""
  };
}

function indicatorProgress(item) {
  const current = Number(item.current) || 0;
  const target = Number(item.target) || 0;

  if (target <= 0) return 0;

  const value = Math.round((current / target) * 100);
  return Math.max(0, Math.min(100, value));
}

function getIndicatorStatusText(status) {
  if (status === "completed") return "Bajarilgan";
  if (status === "risk") return "Risk";
  return "Jarayonda";
}

function getFilteredIndicators() {
  const els = getIndicatorsEls();
  const search = (els.searchInput?.value || "").trim().toLowerCase();
  const status = els.statusFilter?.value || "all";
  const direction = els.directionFilter?.value || "all";

  return readIndicators().filter(item => {
    const text = [item.name, item.direction, item.note, item.unit]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !search || text.includes(search);
    const matchesStatus = status === "all" || item.status === status;
    const matchesDirection = direction === "all" || item.direction === direction;

    return matchesSearch && matchesStatus && matchesDirection;
  });
}

function renderIndicatorDirectionOptions() {
  const els = getIndicatorsEls();
  if (!els.directionFilter) return;

  const currentValue = els.directionFilter.value || "all";
  const directions = [...new Set(readIndicators().map(item => item.direction || "Umumiy"))]
    .sort((a, b) => a.localeCompare(b));

  els.directionFilter.innerHTML = `<option value="all">Barcha yo‘nalishlar</option>`;

  directions.forEach(direction => {
    const option = document.createElement("option");
    option.value = direction;
    option.textContent = direction;
    els.directionFilter.appendChild(option);
  });

  if (["all", ...directions].includes(currentValue)) {
    els.directionFilter.value = currentValue;
  }
}

function renderIndicatorStats() {
  const els = getIndicatorsEls();
  const items = readIndicators();

  const completed = items.filter(item => item.status === "completed").length;
  const process = items.filter(item => item.status === "process").length;
  const risk = items.filter(item => item.status === "risk").length;

  if (els.totalCount) els.totalCount.textContent = items.length;
  if (els.completedCount) els.completedCount.textContent = completed;
  if (els.processCount) els.processCount.textContent = process;
  if (els.riskCount) els.riskCount.textContent = risk;
}

function renderIndicatorCards(items) {
  const els = getIndicatorsEls();
  if (!els.cardsGrid) return;

  if (!items.length) {
    els.cardsGrid.innerHTML = `
      <div class="indicators-empty">
        <i class="ri-line-chart-line"></i><br>
        Indikator topilmadi
      </div>
    `;
    return;
  }

  els.cardsGrid.innerHTML = items.map(item => {
    const progress = indicatorProgress(item);
    const statusText = getIndicatorStatusText(item.status);

    return `
      <article class="indicator-card">
        <div class="indicator-card-top">
          <div>
            <h4>${escapeHTML(item.name)}</h4>
            <p>${escapeHTML(item.direction)}</p>
          </div>
          <span class="indicator-status-pill ${escapeHTML(item.status)}">${statusText}</span>
        </div>

        <div class="indicator-values">
          <div class="indicator-value-box">
            <span>Joriy qiymat</span>
            <strong>${escapeHTML(item.current)} ${escapeHTML(item.unit)}</strong>
          </div>
          <div class="indicator-value-box">
            <span>Maqsad</span>
            <strong>${escapeHTML(item.target)} ${escapeHTML(item.unit)}</strong>
          </div>
        </div>

        <div class="indicator-progress">
          <div class="indicator-progress-line">
            <div class="indicator-progress-fill" style="width:${progress}%"></div>
          </div>
          <div class="indicator-progress-meta">
            <span>${progress}% bajarilgan</span>
            <span>${escapeHTML(item.deadline || "Muddat yo‘q")}</span>
          </div>
        </div>

        <p>${escapeHTML(item.note || "Izoh kiritilmagan")}</p>
      </article>
    `;
  }).join("");
}

function renderIndicatorTable(items) {
  const els = getIndicatorsEls();
  if (!els.tableBody) return;

  if (!items.length) {
    els.tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="indicators-empty">Indikator topilmadi</td>
      </tr>
    `;
    return;
  }

  els.tableBody.innerHTML = items.map(item => {
    const progress = indicatorProgress(item);
    const statusText = getIndicatorStatusText(item.status);

    return `
      <tr>
        <td>
          ${escapeHTML(item.name)}
          <small>${escapeHTML(item.note || "")}</small>
        </td>
        <td>${escapeHTML(item.direction)}</td>
        <td>${escapeHTML(item.current)} ${escapeHTML(item.unit)}</td>
        <td>${escapeHTML(item.target)} ${escapeHTML(item.unit)}</td>
        <td>
          <div class="indicator-table-progress">
            <div class="indicator-progress-line">
              <div class="indicator-progress-fill" style="width:${progress}%"></div>
            </div>
            <small>${progress}%</small>
          </div>
        </td>
        <td><span class="indicator-status-pill ${escapeHTML(item.status)}">${statusText}</span></td>
        <td>${escapeHTML(item.deadline || "-")}</td>
        <td>
          <div class="indicator-actions">
            <button type="button" class="indicator-action-btn" onclick="editIndicator(${Number(item.id)})" title="Tahrirlash">
              <i class="ri-edit-2-line"></i>
            </button>
            <button type="button" class="indicator-action-btn delete" onclick="deleteIndicator(${Number(item.id)})" title="O‘chirish">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function openIndicatorForm(id = null) {
  const els = getIndicatorsEls();
  indicatorEditId = id;

  if (!els.formPanel) return;

  if (id) {
    const item = readIndicators().find(ind => String(ind.id) === String(id));

    if (!item) return;

    if (els.formTitle) els.formTitle.textContent = "Indikatorni tahrirlash";
    if (els.nameInput) els.nameInput.value = item.name;
    if (els.directionInput) els.directionInput.value = item.direction;
    if (els.currentInput) els.currentInput.value = item.current;
    if (els.targetInput) els.targetInput.value = item.target;
    if (els.unitInput) els.unitInput.value = item.unit;
    if (els.statusInput) els.statusInput.value = item.status;
    if (els.deadlineInput) els.deadlineInput.value = item.deadline;
    if (els.noteInput) els.noteInput.value = item.note;
  } else {
    if (els.formTitle) els.formTitle.textContent = "Yangi indikator";
    clearIndicatorForm();
  }

  els.formPanel.style.display = "block";
  els.formPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeIndicatorForm() {
  const els = getIndicatorsEls();
  indicatorEditId = null;
  clearIndicatorForm();

  if (els.formPanel) {
    els.formPanel.style.display = "none";
  }
}

function clearIndicatorForm() {
  const els = getIndicatorsEls();

  if (els.nameInput) els.nameInput.value = "";
  if (els.directionInput) els.directionInput.value = "";
  if (els.currentInput) els.currentInput.value = "";
  if (els.targetInput) els.targetInput.value = "";
  if (els.unitInput) els.unitInput.value = "%";
  if (els.statusInput) els.statusInput.value = "process";
  if (els.deadlineInput) els.deadlineInput.value = "";
  if (els.noteInput) els.noteInput.value = "";
}

function collectIndicatorFormData() {
  const els = getIndicatorsEls();

  return normalizeIndicator({
    id: indicatorEditId || Date.now(),
    name: els.nameInput?.value?.trim() || "",
    direction: els.directionInput?.value?.trim() || "Umumiy",
    current: Number(els.currentInput?.value || 0),
    target: Number(els.targetInput?.value || 0),
    unit: els.unitInput?.value?.trim() || "",
    status: els.statusInput?.value || "process",
    deadline: els.deadlineInput?.value || "",
    note: els.noteInput?.value?.trim() || ""
  });
}

function saveIndicator() {
  const data = collectIndicatorFormData();

  if (!data.name) {
    showError("Indikator nomini kiriting");
    return;
  }

  if (data.target <= 0) {
    showError("Maqsadli qiymat 0 dan katta bo‘lishi kerak");
    return;
  }

  const items = readIndicators();

  if (indicatorEditId) {
    const index = items.findIndex(item => String(item.id) === String(indicatorEditId));

    if (index !== -1) {
      items[index] = data;
    }
  } else {
    items.push(data);
  }

  saveIndicators(items);
  closeIndicatorForm();
  renderIndicatorsSection();
}

function editIndicator(id) {
  openIndicatorForm(id);
}

function deleteIndicator(id) {
  const ok = confirm("Bu indikator o‘chirilsinmi?");
  if (!ok) return;

  const items = readIndicators().filter(item => String(item.id) !== String(id));
  saveIndicators(items);
  renderIndicatorsSection();
}

function resetIndicators() {
  const ok = confirm("Namuna indikatorlar qayta tiklansinmi? Hozirgi indikatorlar almashtiriladi.");
  if (!ok) return;

  saveIndicators(DEFAULT_INDICATORS);
  renderIndicatorsSection();
}

function bindIndicatorsEvents() {
  if (indicatorsEventsBound) return;

  const els = getIndicatorsEls();

  if (els.searchInput) els.searchInput.addEventListener("input", renderIndicatorsSection);
  if (els.statusFilter) els.statusFilter.addEventListener("change", renderIndicatorsSection);
  if (els.directionFilter) els.directionFilter.addEventListener("change", renderIndicatorsSection);

  if (els.openFormBtn) els.openFormBtn.addEventListener("click", () => openIndicatorForm());
  if (els.closeFormBtn) els.closeFormBtn.addEventListener("click", closeIndicatorForm);
  if (els.cancelBtn) els.cancelBtn.addEventListener("click", closeIndicatorForm);
  if (els.saveBtn) els.saveBtn.addEventListener("click", saveIndicator);
  if (els.resetBtn) els.resetBtn.addEventListener("click", resetIndicators);

  indicatorsEventsBound = true;
}

function renderIndicatorsSection() {
  bindIndicatorsEvents();
  renderIndicatorDirectionOptions();
  renderIndicatorStats();

  const filtered = getFilteredIndicators();

  renderIndicatorCards(filtered);
  renderIndicatorTable(filtered);
}

window.editIndicator = editIndicator;
window.deleteIndicator = deleteIndicator;
window.renderIndicatorsSection = renderIndicatorsSection;
