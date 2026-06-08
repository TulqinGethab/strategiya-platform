/* =========================================================
   STRUCTURE — A4/A3 + KNIJNI/ALBOM + DIRECT TITLE EDIT + ZOOM
========================================================= */

const STRUCTURE_TITLE_STORAGE_KEY = "structure_direct_title";
const STRUCTURE_FORMAT_STORAGE_KEY = "structure_paper_format";
const STRUCTURE_ORIENTATION_STORAGE_KEY = "structure_paper_orientation";
const STRUCTURE_ZOOM_STORAGE_KEY = "structure_paper_zoom";

let currentStructureFormat = "a4";             // a4 | a3
let currentStructureOrientation = "landscape"; // landscape | portrait
let currentStructureZoom = 1;                  // 0.5 - 1.8
let structureReady = false;

function getStructureEls(){
  return {
    a4Btn: document.getElementById("createA4Format"),
    a3Btn: document.getElementById("createA3Format"),

    portraitBtn: document.getElementById("selectPortraitFormat"),
    landscapeBtn: document.getElementById("selectLandscapeFormat"),

    zoomOutBtn: document.getElementById("zoomOutStructure"),
    zoomInBtn: document.getElementById("zoomInStructure"),
    zoomResetBtn: document.getElementById("zoomResetStructure"),

    zoomStage: document.getElementById("paperZoomStage"),

    paper: document.getElementById("previewPaper"),
    paperLabel: document.getElementById("paperFormatLabel"),
    badge: document.getElementById("previewFormatBadge"),

    titlePreview: document.getElementById("paperTitlePreview")
  };
}

/* ================= STORAGE ================= */

function loadStructureTitle(){
  return localStorage.getItem(STRUCTURE_TITLE_STORAGE_KEY) || "";
}

function saveStructureTitle(value){
  localStorage.setItem(STRUCTURE_TITLE_STORAGE_KEY, value || "");
}

function loadStructureFormat(){
  const saved = localStorage.getItem(STRUCTURE_FORMAT_STORAGE_KEY);
  return saved === "a3" ? "a3" : "a4";
}

function saveStructureFormat(format){
  localStorage.setItem(STRUCTURE_FORMAT_STORAGE_KEY, format);
}

function loadStructureOrientation(){
  const saved = localStorage.getItem(STRUCTURE_ORIENTATION_STORAGE_KEY);
  return saved === "portrait" ? "portrait" : "landscape";
}

function saveStructureOrientation(orientation){
  localStorage.setItem(STRUCTURE_ORIENTATION_STORAGE_KEY, orientation);
}

function loadStructureZoom(){
  const saved = Number(localStorage.getItem(STRUCTURE_ZOOM_STORAGE_KEY));

  if (!saved || Number.isNaN(saved)) return 1;

  return Math.min(1.8, Math.max(0.5, saved));
}

function saveStructureZoom(value){
  localStorage.setItem(STRUCTURE_ZOOM_STORAGE_KEY, String(value));
}

/* ================= PAPER FORMAT ================= */

function getOrientationText(){
  return currentStructureOrientation === "portrait" ? "Knijni" : "Albom";
}

function setStructurePaper(){
  const els = getStructureEls();

  if (!els.paper) return;

  els.paper.classList.remove(
    "paper-a4",
    "paper-a3",
    "paper-portrait",
    "paper-landscape"
  );

  els.paper.classList.add(
    currentStructureFormat === "a3" ? "paper-a3" : "paper-a4"
  );

  els.paper.classList.add(
    currentStructureOrientation === "portrait"
      ? "paper-portrait"
      : "paper-landscape"
  );

  const formatText = currentStructureFormat.toUpperCase();
  const orientationText = getOrientationText();

  if (els.paperLabel) {
    els.paperLabel.innerText = formatText;
  }

  if (els.badge) {
    els.badge.innerText = `${formatText} • ${orientationText}`;
  }

  if (els.a4Btn && els.a3Btn) {
    els.a4Btn.classList.toggle("active", currentStructureFormat === "a4");
    els.a3Btn.classList.toggle("active", currentStructureFormat === "a3");
  }

  if (els.portraitBtn && els.landscapeBtn) {
    els.portraitBtn.classList.toggle("active", currentStructureOrientation === "portrait");
    els.landscapeBtn.classList.toggle("active", currentStructureOrientation === "landscape");
  }

  applyStructureZoom();
}

function setStructureFormat(format){
  currentStructureFormat = format === "a3" ? "a3" : "a4";
  saveStructureFormat(currentStructureFormat);
  setStructurePaper();
}

function setStructureOrientation(orientation){
  currentStructureOrientation = orientation === "portrait" ? "portrait" : "landscape";
  saveStructureOrientation(currentStructureOrientation);
  setStructurePaper();
}

/* ================= ZOOM ================= */

function applyStructureZoom(){
  const els = getStructureEls();

  if (!els.zoomStage) return;

  els.zoomStage.style.transform = `scale(${currentStructureZoom})`;

  if (els.zoomResetBtn) {
    els.zoomResetBtn.innerText = Math.round(currentStructureZoom * 100) + "%";
  }

  saveStructureZoom(currentStructureZoom);
}

function zoomInStructure(){
  currentStructureZoom = Math.min(1.8, currentStructureZoom + 0.1);
  currentStructureZoom = Number(currentStructureZoom.toFixed(2));
  applyStructureZoom();
}

function zoomOutStructure(){
  currentStructureZoom = Math.max(0.5, currentStructureZoom - 0.1);
  currentStructureZoom = Number(currentStructureZoom.toFixed(2));
  applyStructureZoom();
}

function resetStructureZoom(){
  currentStructureZoom = 1;
  applyStructureZoom();
}

/* ================= DIRECT TITLE EDIT ================= */

function initDirectTitleEdit(){
  const els = getStructureEls();

  if (!els.titlePreview) return;

  els.titlePreview.innerText = loadStructureTitle();

  els.titlePreview.addEventListener("input", () => {
    saveStructureTitle(els.titlePreview.innerText.trim());
  });

  els.titlePreview.addEventListener("paste", event => {
    event.preventDefault();

    const text = (event.clipboardData || window.clipboardData).getData("text/plain");

    if (document.queryCommandSupported && document.queryCommandSupported("insertText")) {
      document.execCommand("insertText", false, text);
      return;
    }

    els.titlePreview.innerText += text;
    saveStructureTitle(els.titlePreview.innerText.trim());
  });
}

/* ================= INIT ================= */

function initStructureBuilder(){
  if (structureReady) return;

  const els = getStructureEls();

  currentStructureFormat = loadStructureFormat();
  currentStructureOrientation = loadStructureOrientation();
  currentStructureZoom = loadStructureZoom();

  if (els.a4Btn) {
    els.a4Btn.onclick = () => setStructureFormat("a4");
  }

  if (els.a3Btn) {
    els.a3Btn.onclick = () => setStructureFormat("a3");
  }

  if (els.portraitBtn) {
    els.portraitBtn.onclick = () => setStructureOrientation("portrait");
  }

  if (els.landscapeBtn) {
    els.landscapeBtn.onclick = () => setStructureOrientation("landscape");
  }

  if (els.zoomInBtn) {
    els.zoomInBtn.onclick = zoomInStructure;
  }

  if (els.zoomOutBtn) {
    els.zoomOutBtn.onclick = zoomOutStructure;
  }

  if (els.zoomResetBtn) {
    els.zoomResetBtn.onclick = resetStructureZoom;
  }

  initDirectTitleEdit();

  structureReady = true;
}

/* ================= RENDER ================= */

function renderStructureSection(){
  initStructureBuilder();
  setStructurePaper();
  applyStructureZoom();
}

window.renderStructureSection = renderStructureSection;