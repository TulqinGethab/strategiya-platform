/* =========================================================
   STRUCTURE — SQ / SOLIQ QO‘MITASI CHART
========================================================= */

let currentStructureTarget = "committee";
let currentStructureZoom = 0.72;
let structureReady = false;

const STRUCTURE_ZOOM_STORAGE_KEY = "structure_sq_zoom";

const STRUCTURE_PLACEHOLDER_TITLES = {
  ysti: "YSTI strukturasi",
  departments: "Soliq boshqarmalari strukturasi",
  inspections: "Soliq inspeksiyalari strukturasi"
};

const SQ_ORG_COLUMNS = [
  {
    leader: "Raisning birinchi o‘rinbosari",
    children: [
      { title: "Budjet daromadlarini prognozlashtirish departamenti", count: 21, type: "dept" },
      { title: "Statistika va prognozlashtirish boshqarmasi", type: "sub" },
      { title: "Soliq to‘lovchilarning shaxsiy hisobvaraqlarini monitoring qilish bo‘limi", type: "sub" },
      { title: "Budjet bilan munosabatlarini boshqarish boshqarmasi", type: "sub" },
      { title: "Qo‘shilgan qiymat solig‘i ma’muriyatchiligi departamenti", count: 20, type: "dept" },
      { title: "Elektron hisobvaraq-faktura va yuk xatlarini tahlil hamda nazorat qilish boshqarmasi", type: "sub" },
      { title: "Qo‘shilgan qiymat solig‘i to‘lovchilarni maxsus ro‘yxatdan o‘tkazish bo‘limi", type: "sub" },
      { title: "Qo‘shilgan qiymat solig‘i o‘rnini qoplash bo‘limi", type: "sub" },
      { title: "Xavfni tahlil qilish va soliq to‘lovchilarni segmentlash boshqarmasi", count: 13, type: "dept" },
      { title: "Soliq nizolarini sudgacha hal qilish boshqarmasi", count: 9, type: "dept" },
      { title: "Yirik soliq to‘lovchilar bo‘yicha hududlararo soliq inspeksiyasi*", type: "external" }
    ]
  },
  {
    leader: "Rais o‘rinbosari",
    children: [
      { title: "Yuridik shaxslarga xizmat ko‘rsatish departamenti", count: 45, type: "dept" },
      { title: "Umumbelgilangan soliqlar ma’muriyatchiligi boshqarmasi", type: "sub" },
      { title: "Jismoniy shaxsning to‘lov manbaidan olinadigan daromad solig‘i ma’muriyatchiligi boshqarmasi", type: "sub" },
      { title: "Soliq to‘lovchilarni hisobga olish va hisobini yuritish bo‘limi", type: "sub" },
      { title: "Resurs soliqlar ma’muriyatchiligi boshqarmasi", type: "sub" },
      { title: "Jismoniy shaxslar resurs soliqlar ma’muriyatchiligi bo‘limi", type: "sub" },
      { title: "Yuridik shaxslar resurs soliqlar ma’muriyatchiligi bo‘limi", type: "sub" },
      { title: "Soliq organlarining “mahallabay” ishini tashkil etish departamenti", count: 24, type: "dept" },
      { title: "Soliq organlarining “mahallabay” ishini hududlarda tashkil etish boshqarmasi", type: "sub" },
      { title: "Ma’lumotlar hisobini yuritish va umumlashtirish boshqarmasi", type: "sub" },
      { title: "O‘zini o‘zi band qilganlar bilan ishlash bo‘limi", type: "sub" },
      { title: "Deklaratsiya asosida jismoniy shaxslarni soliqqa tortish ma’muriyatchiligi bo‘limi", count: 8, type: "dept" },
      { title: "Soliq to‘lovchilarga xizmat ko‘rsatish boshqarmasi", count: 8, type: "dept" }
    ]
  },
  {
    leader: "Rais o‘rinbosari",
    children: [
      { title: "Soliq nazorati departamenti", count: 51, type: "dept" },
      { title: "Soliq auditi boshqarmasi", type: "sub" },
      { title: "Kameral soliq tekshiruvlari boshqarmasi", type: "sub" },
      { title: "Sayyor soliq tekshiruvlari boshqarmasi", type: "sub" },
      { title: "Soliq qarzini undirishni tashkil qilish departamenti", count: 21, type: "dept" },
      { title: "Yuridik shaxslar soliq qarzini undirishni tashkil qilish boshqarmasi", type: "sub" },
      { title: "Jismoniy shaxslar soliq qarzini undirishni tashkil qilish bo‘limi", type: "sub" },
      { title: "Xalqaro soliqqa tortish ma’muriyatchiligi departamenti", count: 17, type: "dept" },
      { title: "Transfert narxlar shakllanishini tahlil qilish hamda nazorat qilinadigan Chet el kompaniyalari foydasiga soliq solish bo‘limi", type: "sub" },
      { title: "Xalqaro soliq solish bo‘limi", type: "sub" },
      { title: "Ma’muriy amaliyot boshqarmasi", count: 5, type: "dept" },
      { title: "Raqamli markirovka qoidalariga rioya qilinishini nazorat qilish bo‘yicha hududlararo soliq inspeksiyasi*", type: "external" }
    ]
  },
  {
    leader: "Rais o‘rinbosari",
    children: [
      { title: "Yuridik boshqarma", count: 8, type: "dept" },
      { title: "Xalqaro soliq munosabatlari bo‘limi", count: 4, type: "dept" },
      { title: "Hududiy soliq organlari faoliyatini muvofiqlashtirish boshqarmasi", type: "dept" },
      { title: "Moliya iqtisod boshqarmasi", count: 10, type: "dept" },
      { title: "Buxgalteriya bo‘limi", type: "sub" },
      { title: "Navbatchi qism va idoraviy qo‘riqlash**", count: 2, type: "external" },
      { title: "Ishlar boshqarmasi", count: 7, type: "dept" },
      { title: "“G‘azalkent sog‘lomlashtirish markazi” davlat muassasasi*", type: "external" }
    ]
  },
  {
    leader: "Raisning komplayens va korrupsiyaga qarshi ichki nazorat bo‘yicha o‘rinbosari",
    children: [
      { title: "Komplayens va korrupsiyaga qarshi nazorat boshqarmasi", count: 13, type: "dept" },
      { title: "Korrupsiyaga qarshi nazorat bo‘limi", type: "sub" },
      { title: "Komplayens-nazorat bo‘limi", type: "sub" },
      { title: "Ichki audit boshqarmasi", count: 7, type: "dept" },
      { title: "Birinchi bo‘lim", count: 3, type: "dept" }
    ]
  },
  {
    leader: "Rais maslahatchisi",
    children: [
      { title: "Iqtisodiy tahlil va yashirin iqtisodiyot monitoringi boshqarmasi", count: 12, type: "dept" },
      { title: "Yangi daromad manbalarini legallashtirish bo‘limi", type: "sub" },
      { title: "Soliq solish metodologiyasi departamenti", count: 21, type: "dept" },
      { title: "Soliq ma’muriyatchiligi metodologiyasi boshqarmasi", type: "sub" },
      { title: "Soliq solish bo‘yicha maslahat bo‘limi", type: "sub" },
      { title: "Soliq oliy maktabi rektori", type: "external" }
    ]
  },
  {
    leader: "Raisning sun’iy intellekt va axborot-kommunikatsiya texnologiyalari masalalari bo‘yicha maslahatchisi",
    children: [
      { title: "Axborot-kommunikatsiya texnologiyalari departamenti", count: 23, type: "dept" },
      { title: "Soliq ma’murchiligi sohasida sun’iy intellekt texnologiyalarini joriy qilish boshqarmasi", type: "sub" },
      { title: "Idoralararo integratsiya bo‘limi", type: "sub" },
      { title: "Kiberxavfsizlikni ta’minlash bo‘limi", type: "sub" },
      { title: "“Soliq” mobil ilovasi bo‘limi", type: "sub" },
      { title: "Texnik hujjatlashtirish bo‘limi", type: "sub" }
    ]
  },
  {
    leader: "Raisning ma’naviyat va davlat tili masalalari bo‘yicha maslahatchisi",
    children: [
      { title: "Rais maslahatchisi — Strategik rejalashtirish boshqarmasi", count: 9, type: "dept" },
      { title: "Ma’naviyat targ‘iboti va lingvistik ekspertiza bo‘limi", count: 4, type: "dept" }
    ]
  },
  {
    leader: "Korporativ boshqaruv bosh inspektori",
    children: [
      { title: "Soliq ma’murchiligini tahlil qilish va baholash departamenti", count: 20, type: "dept" },
      { title: "Umumiy tahlil qilish boshqarmasi", type: "sub" },
      { title: "Soliq organlarida operatsion xavflarni tahlil qilish bo‘limi", type: "sub" },
      { title: "Soliq auditini monitoring qilish bo‘limi", type: "sub" },
      { title: "Inson resurslarini rivojlantirish va boshqarish departamenti", count: 21, type: "dept" },
      { title: "Saralash va hisobga olish boshqarmasi", type: "sub" },
      { title: "Kompetensiyalarni boshqarish va rivojlantirish bo‘limi", type: "sub" },
      { title: "Xodimlar faoliyati samaradorligini baholash bo‘limi", type: "sub" },
      { title: "Kadrlar qo‘nimsizligi bilan bog‘liq xavf-xatarlarni baholash bo‘limi", type: "sub" },
      { title: "Yig‘ma axborot-tahlil boshqarmasi", count: 8, type: "dept" },
      { title: "Jamoatchilik bilan aloqalar boshqarmasi", count: 7, type: "dept" },
      { title: "Tashkiliy ishlar va nazorat boshqarmasi", count: 15, type: "dept" },
      { title: "Murojaatlar bilan ishlash bo‘limi", type: "sub" }
    ]
  }
];

function getStructureEls(){
  return {
    root: document.getElementById("structureRoot"),
    chart: document.getElementById("sqOrgChart"),
    zoomStage: document.getElementById("structureZoomStage"),
    zoomOutBtn: document.getElementById("zoomOutStructure"),
    zoomInBtn: document.getElementById("zoomInStructure"),
    zoomResetBtn: document.getElementById("zoomResetStructure"),
    toolbarTitle: document.getElementById("structureToolbarTitle"),
    toolbarBadge: document.getElementById("structureToolbarBadge"),
    sideTitle: document.getElementById("structureSideTitle"),
    sideText: document.getElementById("structureSideText")
  };
}

function escapeStructureHTML(value){
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadStructureZoom(){
  const saved = Number(localStorage.getItem(STRUCTURE_ZOOM_STORAGE_KEY));
  if (!Number.isFinite(saved) || saved <= 0) return 0.72;
  return Math.min(1.45, Math.max(0.45, saved));
}

function saveStructureZoom(value){
  localStorage.setItem(STRUCTURE_ZOOM_STORAGE_KEY, String(value));
}

function applyStructureZoom(){
  const els = getStructureEls();
  if (!els.zoomStage) return;

  els.zoomStage.style.transform = `scale(${currentStructureZoom})`;

  if (els.zoomResetBtn) {
    els.zoomResetBtn.textContent = Math.round(currentStructureZoom * 100) + "%";
  }

  saveStructureZoom(currentStructureZoom);
}

function zoomInStructure(){
  currentStructureZoom = Math.min(1.45, Number((currentStructureZoom + 0.08).toFixed(2)));
  applyStructureZoom();
}

function zoomOutStructure(){
  currentStructureZoom = Math.max(0.45, Number((currentStructureZoom - 0.08).toFixed(2)));
  applyStructureZoom();
}

function resetStructureZoom(){
  currentStructureZoom = 0.72;
  applyStructureZoom();
}

function renderSqNode(node){
  const count = node.count ? `<span class="sq-count">${escapeStructureHTML(node.count)}</span>` : "";
  return `<div class="sq-node ${escapeStructureHTML(node.type || "sub")}">${escapeStructureHTML(node.title)}${count}</div>`;
}

function renderCommitteeStructure(){
  const els = getStructureEls();
  if (!els.chart) return;

  els.chart.innerHTML = `
    <div class="sq-root-row">
      <div class="sq-org-secretariat"><span>Kotibiyat</span><strong>3</strong></div>
      <div class="sq-org-root">Rais</div>
    </div>

    <div class="sq-org-columns">
      ${SQ_ORG_COLUMNS.map(column => `
        <div class="sq-org-column">
          <div class="sq-node leader">${escapeStructureHTML(column.leader)}</div>
          ${column.children.map((child, index) => `
            ${index === 0 ? '<div class="sq-branch-line"></div>' : ''}
            ${renderSqNode(child)}
          `).join("")}
        </div>
      `).join("")}
    </div>
  `;
}

function renderStructurePlaceholder(target){
  const els = getStructureEls();
  if (!els.chart) return;

  const title = STRUCTURE_PLACEHOLDER_TITLES[target] || "Struktura";
  els.chart.innerHTML = `
    <div class="sq-placeholder">
      <i class="ri-organization-chart"></i>
      <h3>${escapeStructureHTML(title)}</h3>
      <p>Bu submenu uchun alohida struktura keyingi bosqichda PDF namunasi yoki jadval asosida shakllantiriladi.</p>
    </div>
  `;
}

function setStructureHeadings(target){
  const els = getStructureEls();

  const isCommittee = target === "committee";
  const title = isCommittee
    ? "Soliq qo‘mitasi markaziy apparatining tuzilmasi"
    : STRUCTURE_PLACEHOLDER_TITLES[target] || "Struktura";

  if (els.root) els.root.dataset.structureView = target;
  if (els.toolbarBadge) els.toolbarBadge.textContent = isCommittee ? "SOLIQ QO‘MITASI" : "STRUKTURA";
  if (els.toolbarTitle) els.toolbarTitle.textContent = title;
  if (els.sideTitle) els.sideTitle.textContent = isCommittee ? "Soliq qo‘mitasi" : title;
  if (els.sideText) els.sideText.textContent = isCommittee ? "Markaziy apparat tuzilmasi" : "Submenu bo‘yicha struktura";
}

function initStructureBuilder(){
  if (structureReady) return;

  const els = getStructureEls();

  currentStructureZoom = loadStructureZoom();

  if (els.zoomInBtn) els.zoomInBtn.onclick = zoomInStructure;
  if (els.zoomOutBtn) els.zoomOutBtn.onclick = zoomOutStructure;
  if (els.zoomResetBtn) els.zoomResetBtn.onclick = resetStructureZoom;

  structureReady = true;
}

function renderStructureSection(target = "committee"){
  currentStructureTarget = target || "committee";
  initStructureBuilder();
  setStructureHeadings(currentStructureTarget);

  if (currentStructureTarget === "committee") {
    renderCommitteeStructure();
  } else {
    renderStructurePlaceholder(currentStructureTarget);
  }

  applyStructureZoom();
}

window.renderStructureSection = renderStructureSection;
