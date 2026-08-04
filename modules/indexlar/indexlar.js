/* =========================================================
   INDEXLAR.JS
   Mijozga yo'naltirilganlik indeksi hisob-kitobi
========================================================= */

const INDEXLAR_STORAGE_KEY = "strategiya_platform_indexlar_v1";

const INDEX_COMPONENTS = {
  IQ: {
    code: "IQ",
    name: "Soliq xizmatlaridan foydalanish imkoniyati va qulayligi",
    max: 30,
    color: "#2563eb"
  },
  XS: {
    code: "XS",
    name: "Soliq xizmatlarini ko‘rsatish sifati",
    max: 30,
    color: "#16a34a"
  },
  VS: {
    code: "VS",
    name: "Soliq xizmatlarini olish va majburiyatlarni bajarishda vaqt sarfi",
    max: 20,
    color: "#f59e0b"
  },
  OH: {
    code: "O‘H",
    name: "Soliq organlari bilan o‘zaro hamkorlik darajasi",
    max: 20,
    color: "#7c3aed"
  }
};

const DEFAULT_INDEX_INDICATORS = [
  {
    id: 1,
    component: "IQ",
    short: "K₁",
    name: "Xizmat olishdan umumiy qoniqish",
    fact: 4.6,
    unit: "baho",
    max: 10,
    type: "rating10",
    source: "Push-xabarnomalar, baholash tizimi",
    period: "Oylik",
    responsible: "Xizmat ko‘rsatish departamenti, AKT departamenti",
    calcMethod: "Foydalanuvchilarning o‘rtacha bahosi"
  },
  {
    id: 2,
    component: "IQ",
    short: "K₂",
    name: "Xizmat olish jarayonining soddaligi",
    fact: 4,
    unit: "harakat",
    max: 10,
    type: "actions10",
    source: "Ishchi guruh tahlili",
    period: "Oylik",
    responsible: "Xizmat ko‘rsatish departamenti, AKT departamenti",
    calcMethod: "Foydalanuvchi amallarining o‘rtacha soni"
  },
  {
    id: 3,
    component: "IQ",
    short: "K₃",
    name: "Xizmatning texnik barqarorligi",
    fact: 2,
    unit: "nosozlik",
    max: 10,
    type: "tech10",
    source: "Texnik monitoring ma’lumotlari",
    period: "Oylik",
    responsible: "AKT departamenti, Soliq-servis DUK",
    calcMethod: "Texnik xatolarsiz muvaffaqiyatli operatsiyalar nazorati"
  },
  {
    id: 4,
    component: "XS",
    short: "K₁",
    name: "Kasbiy maslahat sifati",
    fact: 4.4,
    unit: "baho",
    max: 10,
    type: "rating10",
    source: "EHA, Qayta aloqa AT",
    period: "Oylik",
    responsible: "Soliq ma’murchiligini tahlil qilish va baholash departamenti, Tashkiliy ishlar va nazorat boshqarmasi",
    calcMethod: "Javoblarning aniqligi, to‘liqligi va kompetentlik bahosi"
  },
  {
    id: 5,
    component: "XS",
    short: "K₂",
    name: "Koll-markazi xodimlarining muloqot madaniyati",
    fact: 4.7,
    unit: "baho",
    max: 10,
    type: "rating10",
    source: "Koll-markazi axborot tizimi",
    period: "Oylik",
    responsible: "Soliq-servis DUK, Xizmat ko‘rsatish departamenti",
    calcMethod: "Xushmuomalalik, hurmat va yordam berishga tayyorlik bahosi"
  },
  {
    id: 6,
    component: "XS",
    short: "K₃",
    name: "Muammoni hal qilish darajasi (MHQD)",
    fact: 92,
    unit: "%",
    max: 10,
    type: "mhqd10",
    source: "EHA, Qayta aloqa AT",
    period: "Oylik",
    responsible: "Tashkiliy ishlar va nazorat boshqarmasi, Xizmat ko‘rsatish departamenti",
    calcMethod: "Birinchi murojaatda to‘liq hal qilingan murojaatlar ulushi"
  },
  {
    id: 7,
    component: "VS",
    short: "K₁",
    name: "Asosiy operatsiyalarni bajarish vaqti",
    fact: 12,
    unit: "daq.",
    max: 10,
    type: "minutes10",
    source: "my.soliq.uz, Soliq mobil ilovasi",
    period: "Oylik",
    responsible: "AKT departamenti, Soliq-servis DUK",
    calcMethod: "Tanlanma xronometraj orqali o‘rtacha vaqt"
  },
  {
    id: 8,
    component: "VS",
    short: "K₂",
    name: "Murojaatlarni ko‘rib chiqish muddati",
    fact: 5,
    unit: "ish kuni",
    max: 5,
    type: "appeal5",
    source: "EHA, Qayta aloqa AT",
    period: "Oylik",
    responsible: "Tashkiliy ishlar va nazorat boshqarmasi, Xizmat ko‘rsatish departamenti",
    calcMethod: "Murojaatni ko‘rib chiqishning o‘rtacha vaqti"
  },
  {
    id: 9,
    component: "VS",
    short: "K₃",
    name: "Koll-markaz operatori bilan bog‘lanishni kutish vaqti",
    fact: 55,
    unit: "soniya",
    max: 5,
    type: "callwait5",
    source: "Koll-markazi axborot tizimi",
    period: "Oylik",
    responsible: "Soliq-servis DUK",
    calcMethod: "O‘rtacha ulanish kutish vaqti"
  },
  {
    id: 10,
    component: "OH",
    short: "K₁",
    name: "Soliq organlariga ishonch darajasi",
    fact: 4.3,
    unit: "baho",
    max: 8,
    type: "rating8",
    source: "my.soliq.uz so‘rovnomalar",
    period: "Oylik",
    responsible: "Strategik rejalashtirish boshqarmasi, AKT departamenti",
    calcMethod: "Foydalanuvchilarning o‘rtacha bahosi"
  },
  {
    id: 11,
    component: "OH",
    short: "K₂",
    name: "Soliq organlarining ochiqligi va shaffofligi",
    fact: 4.5,
    unit: "baho",
    max: 6,
    type: "rating6",
    source: "my.soliq.uz ochiq ma’lumotlar so‘rovnomalari",
    period: "Oylik",
    responsible: "Strategik rejalashtirish boshqarmasi, AKT departamenti",
    calcMethod: "Ma’lumotlarning ochiqligi va foydalanish imkoniyati bahosi"
  },
  {
    id: 12,
    component: "OH",
    short: "K₃",
    name: "Taklif va so‘rovlarni ko‘rib chiqish sifati",
    fact: 4.1,
    unit: "baho",
    max: 6,
    type: "rating6",
    source: "EHA, Qayta aloqa AT so‘rovnomalari",
    period: "Oylik",
    responsible: "Strategik rejalashtirish boshqarmasi, Jamoatchilik bilan aloqalar boshqarmasi",
    calcMethod: "Taklif va murojaatlarga javoblarning sifati"
  }
];

const INDEX_WORKFLOW_STEPS = [
  {
    no: 1,
    title: "Ma’lumotlarni yig‘ish",
    date: "Har oy 3-sanasiga qadar",
    text: "my.soliq.uz, mobil ilova, CRM, koll-markaz, murojaatlar bazasi, SMS, Push, QR, Telegram va elektron pochta manbalaridan ma’lumotlar jamlanadi."
  },
  {
    no: 2,
    title: "Tekshirish va avtomatik hisoblash",
    date: "Har oy 10-sanasiga qadar",
    text: "Ma’lumotlarning to‘liqligi va to‘g‘riligi tekshiriladi, takroriy yozuvlar chiqariladi hamda uslubiyot formulalari asosida barcha indikatorlar hisoblanadi."
  },
  {
    no: 3,
    title: "Qiyosiy tahlil va reyting",
    date: "Har chorak 10-sanasiga qadar",
    text: "Yig‘ma qaydnoma, indikatorlar reestri, qiyosiy tahlil va xizmatlar reytingi tayyorlanadi."
  },
  {
    no: 4,
    title: "Chora-tadbirlar rejasini kiritish",
    date: "Har chorak 20-sanasiga qadar",
    text: "Maqsadga erishilmagan ko‘rsatkichlar bo‘yicha sabablar va ularni bartaraf etish choralarini rahbariyatga kiritish."
  },
  {
    no: 5,
    title: "Ijroni nazorat qilish",
    date: "Rejada belgilangan muddatlarda",
    text: "Chora-tadbirlar ijrosi, erishilgan natijalar va indeksga ta’siri nazorat qilinadi."
  },
  {
    no: 6,
    title: "Yakuniy yillik hisobot",
    date: "1-fevralga qadar",
    text: "Ko‘rsatkichlar dinamikasi tahlil qilinadi va soliq ma’muriyatchiligini takomillashtirish bo‘yicha takliflar shakllantiriladi."
  }
];

const INDEX_REPORT_FORMS = [
  ["1-shakl", "Indeks hisoblashning qisqacha bayoni"],
  ["2-shakl", "Ko‘rsatkichlar reestri"],
  ["3-shakl", "Qiyosiy tahlil"],
  ["4-shakl", "Soliq xizmatlari reytingi"],
  ["5-shakl", "Tuzatish harakatlari rejasi"],
  ["6-shakl", "Mijozga yo‘naltirilganlik indeksining yig‘ma jadvali"]
];

function getIndexlarEls() {
  return {
    section: document.getElementById("indexlarSection"),
    periodInput: document.getElementById("indexPeriodInput"),
    regionFilter: document.getElementById("indexRegionFilter"),
    componentFilter: document.getElementById("indexComponentFilter"),
    searchInput: document.getElementById("indexSearchInput"),
    resetBtn: document.getElementById("resetIndexlarBtn"),
    downloadCsvBtn: document.getElementById("downloadIndexlarCsvBtn"),
    totalScore: document.getElementById("indexTotalScore"),
    ringValue: document.getElementById("indexRingValue"),
    totalProgress: document.getElementById("indexTotalProgress"),
    iqScore: document.getElementById("indexIqScore"),
    xsScore: document.getElementById("indexXsScore"),
    vsOhScore: document.getElementById("indexVsOhScore"),
    componentCards: document.getElementById("indexComponentCards"),
    tableBody: document.getElementById("indexIndicatorsBody"),
    workflowSteps: document.getElementById("indexWorkflowSteps"),
    reportForms: document.getElementById("indexReportForms")
  };
}

function readIndexlar() {
  try {
    const saved = localStorage.getItem(INDEXLAR_STORAGE_KEY);

    if (!saved) {
      const initial = DEFAULT_INDEX_INDICATORS.map(normalizeIndexIndicator);
      localStorage.setItem(INDEXLAR_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed.map(normalizeIndexIndicator);
  } catch (error) {
    console.error("INDEXLAR STORAGE READ ERROR:", error);
    return DEFAULT_INDEX_INDICATORS.map(normalizeIndexIndicator);
  }
}

function saveIndexlar(items) {
  localStorage.setItem(INDEXLAR_STORAGE_KEY, JSON.stringify(items || []));
}

function normalizeIndexIndicator(item = {}) {
  return {
    id: Number(item.id) || Date.now(),
    component: item.component || "IQ",
    short: item.short || "K",
    name: item.name || "Nomsiz ko‘rsatkich",
    fact: Number(item.fact) || 0,
    unit: item.unit || "",
    max: Number(item.max) || 10,
    type: item.type || "rating10",
    source: item.source || "",
    period: item.period || "Oylik",
    responsible: item.responsible || "",
    calcMethod: item.calcMethod || ""
  };
}

function scoreByRating(value, maxScore) {
  const v = Number(value) || 0;

  if (maxScore === 10) {
    if (v < 3.0) return 0;
    if (v < 3.5) return 2;
    if (v < 4.0) return 4;
    if (v < 4.5) return 6;
    if (v < 4.8) return 8;
    return 10;
  }

  if (maxScore === 8) {
    if (v < 3.0) return 0;
    if (v < 3.5) return 2;
    if (v < 4.0) return 4;
    if (v < 4.5) return 6;
    if (v < 4.8) return 7;
    return 8;
  }

  if (maxScore === 6) {
    if (v < 3.0) return 0;
    if (v < 3.5) return 2;
    if (v < 4.0) return 3;
    if (v < 4.5) return 4;
    if (v < 4.8) return 5;
    return 6;
  }

  return 0;
}

function scoreIndexIndicator(item) {
  const value = Number(item.fact) || 0;

  if (item.type === "rating10") return scoreByRating(value, 10);
  if (item.type === "rating8") return scoreByRating(value, 8);
  if (item.type === "rating6") return scoreByRating(value, 6);

  if (item.type === "actions10") {
    if (value >= 8) return 0;
    if (value === 7) return 2;
    if (value === 6) return 4;
    if (value === 5) return 6;
    if (value === 4) return 8;
    return 10;
  }

  if (item.type === "tech10") {
    if (value > 10) return 0;
    if (value >= 7) return 2;
    if (value >= 5) return 4;
    if (value >= 3) return 6;
    if (value >= 1) return 8;
    return 10;
  }

  if (item.type === "mhqd10") {
    if (value < 70) return 0;
    if (value < 80) return 2;
    if (value < 85) return 4;
    if (value < 90) return 6;
    if (value < 95) return 8;
    return 10;
  }

  if (item.type === "minutes10") {
    if (value > 40) return 0;
    if (value >= 31) return 2;
    if (value >= 21) return 4;
    if (value >= 16) return 6;
    if (value >= 11) return 8;
    return 10;
  }

  if (item.type === "appeal5") {
    if (value > 15) return 0;
    if (value >= 11) return 1;
    if (value >= 8) return 2;
    if (value >= 6) return 3;
    if (value >= 4) return 4;
    return 5;
  }

  if (item.type === "callwait5") {
    if (value > 240) return 0;
    if (value >= 181) return 2;
    if (value >= 121) return 3;
    if (value >= 61) return 4;
    return 5;
  }

  return 0;
}

function getIndexlarSummary(items = readIndexlar()) {
  const summary = Object.keys(INDEX_COMPONENTS).reduce((acc, key) => {
    acc[key] = {
      ...INDEX_COMPONENTS[key],
      score: 0,
      count: 0
    };
    return acc;
  }, {});

  items.forEach(item => {
    if (!summary[item.component]) return;
    summary[item.component].score += scoreIndexIndicator(item);
    summary[item.component].count += 1;
  });

  const total = Object.values(summary).reduce((sum, item) => sum + item.score, 0);

  return { summary, total };
}

function formatScore(value) {
  const rounded = Math.round((Number(value) || 0) * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function scoreClass(score, max) {
  const pct = max > 0 ? (score / max) * 100 : 0;
  if (pct >= 80) return "good";
  if (pct >= 55) return "mid";
  return "bad";
}

function getFilteredIndexlar() {
  const els = getIndexlarEls();
  const component = els.componentFilter?.value || "all";
  const query = (els.searchInput?.value || "").trim().toLowerCase();

  return readIndexlar().filter(item => {
    const matchesComponent = component === "all" || item.component === component;
    const text = [
      item.name,
      item.source,
      item.responsible,
      item.calcMethod,
      INDEX_COMPONENTS[item.component]?.name || ""
    ].join(" ").toLowerCase();
    const matchesSearch = !query || text.includes(query);
    return matchesComponent && matchesSearch;
  });
}

function renderIndexlarStats() {
  const els = getIndexlarEls();
  const { summary, total } = getIndexlarSummary();
  const percent = Math.round(total);

  if (els.totalScore) els.totalScore.textContent = `${formatScore(total)} / 100`;
  if (els.ringValue) els.ringValue.textContent = `${percent}%`;
  if (els.totalProgress) els.totalProgress.style.width = `${Math.max(0, Math.min(100, total))}%`;

  if (els.iqScore) els.iqScore.textContent = `${formatScore(summary.IQ.score)} / ${summary.IQ.max}`;
  if (els.xsScore) els.xsScore.textContent = `${formatScore(summary.XS.score)} / ${summary.XS.max}`;
  if (els.vsOhScore) els.vsOhScore.textContent = `${formatScore(summary.VS.score + summary.OH.score)} / 40`;
}

function renderIndexlarComponents() {
  const els = getIndexlarEls();
  if (!els.componentCards) return;

  const { summary } = getIndexlarSummary();

  els.componentCards.innerHTML = Object.values(summary).map(item => {
    const pct = item.max > 0 ? Math.round((item.score / item.max) * 100) : 0;

    return `
      <article class="indexlar-component-card">
        <div class="indexlar-component-card-top">
          <div class="indexlar-component-code" style="background:${item.color}">${escapeHTML(item.code)}</div>
          <small>${pct}%</small>
        </div>
        <h4>${escapeHTML(item.name)}</h4>
        <strong>${formatScore(item.score)} / ${item.max}</strong>
        <div class="indexlar-component-progress">
          <span style="width:${Math.min(100, pct)}%; background:${item.color}"></span>
        </div>
      </article>
    `;
  }).join("");
}

function renderIndexlarTable() {
  const els = getIndexlarEls();
  if (!els.tableBody) return;

  const items = getFilteredIndexlar();

  if (!items.length) {
    els.tableBody.innerHTML = `
      <tr>
        <td colspan="9" class="indexlar-muted-cell" style="text-align:center;padding:34px">
          Ko‘rsatkich topilmadi
        </td>
      </tr>
    `;
    return;
  }

  els.tableBody.innerHTML = items.map((item, idx) => {
    const component = INDEX_COMPONENTS[item.component] || INDEX_COMPONENTS.IQ;
    const score = scoreIndexIndicator(item);
    const diff = score - item.max;
    const cls = scoreClass(score, item.max);

    return `
      <tr>
        <td>${idx + 1}</td>
        <td>
          <span class="indexlar-component-pill" style="background:${component.color}1A;color:${component.color}">
            ${escapeHTML(component.code)}
          </span>
        </td>
        <td>
          <strong>${escapeHTML(item.name)}</strong>
          <div class="indexlar-muted-cell">${escapeHTML(item.calcMethod)}</div>
        </td>
        <td>
          <input class="indexlar-fact-input" type="number" step="0.1" data-index-id="${item.id}" value="${item.fact}">
          <span class="indexlar-muted-cell">${escapeHTML(item.unit)}</span>
        </td>
        <td>${item.max}</td>
        <td><span class="indexlar-score-pill ${cls}">${formatScore(score)} ball</span></td>
        <td class="indexlar-muted-cell">${diff === 0 ? "0" : diff}</td>
        <td><span class="indexlar-source-pill">${escapeHTML(item.source)}</span></td>
        <td class="indexlar-muted-cell">${escapeHTML(item.responsible)}</td>
      </tr>
    `;
  }).join("");
}

function renderIndexlarWorkflow() {
  const els = getIndexlarEls();
  if (!els.workflowSteps) return;

  els.workflowSteps.innerHTML = INDEX_WORKFLOW_STEPS.map(step => `
    <div class="indexlar-step">
      <div class="indexlar-step-no">${step.no}</div>
      <div>
        <h4>${escapeHTML(step.title)}</h4>
        <p>${escapeHTML(step.text)}</p>
        <span>${escapeHTML(step.date)}</span>
      </div>
    </div>
  `).join("");
}

function renderIndexlarReportForms() {
  const els = getIndexlarEls();
  if (!els.reportForms) return;

  els.reportForms.innerHTML = INDEX_REPORT_FORMS.map(item => `
    <div class="indexlar-report-item">
      <div>
        <strong>${escapeHTML(item[0])}</strong>
        <span>${escapeHTML(item[1])}</span>
      </div>
      <i class="ri-file-list-3-line"></i>
    </div>
  `).join("");
}

function updateIndexIndicatorFact(id, fact) {
  const items = readIndexlar();
  const index = items.findIndex(item => String(item.id) === String(id));

  if (index === -1) return;

  items[index].fact = Number(fact) || 0;
  saveIndexlar(items);
  renderIndexlarSection(false);
}

function resetIndexlarData() {
  if (!confirm("Indexlar bo‘limidagi namuna ma’lumotlar tiklansinmi?")) return;

  const initial = DEFAULT_INDEX_INDICATORS.map(normalizeIndexIndicator);
  saveIndexlar(initial);
  renderIndexlarSection(false);
}

function downloadIndexlarCsv() {
  const items = readIndexlar();
  const headers = [
    "№",
    "Komponent",
    "Ko‘rsatkich",
    "Fakt",
    "O‘lchov",
    "Maksimal ball",
    "Ball",
    "Og‘ish",
    "Ma’lumotlar manbai",
    "Davr",
    "Mas’ul tuzilma"
  ];

  const rows = items.map((item, idx) => {
    const component = INDEX_COMPONENTS[item.component] || INDEX_COMPONENTS.IQ;
    const score = scoreIndexIndicator(item);
    return [
      idx + 1,
      component.name,
      item.name,
      item.fact,
      item.unit,
      item.max,
      score,
      score - item.max,
      item.source,
      item.period,
      item.responsible
    ];
  });

  const csv = [headers, ...rows]
    .map(row => row.map(value => `"${String(value ?? "").replaceAll('"', '""')}"`).join(";"))
    .join("\n");

  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "mijozga-yonaltirilganlik-indexi.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

function bindIndexlarEvents() {
  const els = getIndexlarEls();
  if (!els.section || els.section.dataset.bound === "1") return;

  els.section.dataset.bound = "1";

  if (els.componentFilter) els.componentFilter.addEventListener("change", () => renderIndexlarSection(false));
  if (els.searchInput) els.searchInput.addEventListener("input", () => renderIndexlarTable());
  if (els.regionFilter) els.regionFilter.addEventListener("change", () => renderIndexlarSection(false));
  if (els.periodInput) els.periodInput.addEventListener("change", () => renderIndexlarSection(false));
  if (els.resetBtn) els.resetBtn.addEventListener("click", resetIndexlarData);
  if (els.downloadCsvBtn) els.downloadCsvBtn.addEventListener("click", downloadIndexlarCsv);

  if (els.tableBody) {
    els.tableBody.addEventListener("change", event => {
      const input = event.target.closest(".indexlar-fact-input");
      if (!input) return;
      updateIndexIndicatorFact(input.dataset.indexId, input.value);
    });
  }
}

function renderIndexlarSection(bindEvents = true) {
  renderIndexlarStats();
  renderIndexlarComponents();
  renderIndexlarTable();
  renderIndexlarWorkflow();
  renderIndexlarReportForms();

  if (bindEvents) bindIndexlarEvents();
}
