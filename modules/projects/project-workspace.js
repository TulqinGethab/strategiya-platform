/* =========================================================
   PROJECT WORKSPACE
   Word-like editor + DOCX import + table + orientation
   zoom + horizontal/vertical ruler indent + track changes
   + variant select editor open/close
   + left panel full hide mode
========================================================= */

let selectedProjectForWorkspace = null;
let activeWorkspacePage = null;
let paginationLock = false;

let workspacePageOrientation = "portrait";
let workspaceZoomValue = 90;
let workspaceWheelZoomLock = false;

const WORKSPACE_ZOOM_LEVELS = [50, 75, 90, 100, 110, 125, 150, 175, 200];

let workspaceIndentState = {
  paperLeft: 70,
  paperRight: 210,
  firstLine: 24,
  paperTop: 64,
  paperBottom: 64
};

let workspaceRulerActiveMarker = null;
let workspaceVerticalRulerActiveMarker = null;

/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function clamp(value, min, max) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return min;
  }

  return Math.min(Math.max(number, min), max);
}

/* =========================================================
   ELEMENTS
========================================================= */

function getProjectWorkspaceEls() {
  return {
    listView: document.getElementById("projectsListView"),
    workspaceView: document.getElementById("projectWorkspaceView"),

    workspaceBody:
      document.getElementById("projectWorkspaceBody") ||
      document.querySelector(".project-workspace-body"),

    leftPanel: document.querySelector(".workspace-left-panel"),
    editorSide: document.querySelector(".workspace-editor-side"),

    backBtn: document.getElementById("backToProjectsBtn"),
    saveBtn: document.getElementById("saveWorkspaceBtn"),
    saveBottomBtn: document.getElementById("saveWorkspaceBottomBtn"),
    clearBtn: document.getElementById("clearWorkspaceBtn"),

    importWordBtn: document.getElementById("importWordBtn"),
    importWordInput: document.getElementById("importWordInput"),

    taskText: document.getElementById("workspaceTaskText"),
    author: document.getElementById("workspaceAuthor"),
    incomingDate: document.getElementById("workspaceIncomingDate"),
    deadline: document.getElementById("workspaceDeadline"),
    leaderInput: document.getElementById("workspaceLeaderInput"),
    sendLeaderBtn: document.getElementById("workspaceSendLeaderBtn"),

    paperWrap: document.querySelector(".workspace-paper-wrap"),
    paperStack: document.getElementById("workspacePaperStack"),
    pagesBox: document.getElementById("workspacePages"),

    fontName: document.getElementById("workspaceFontName"),
    fontSize: document.getElementById("workspaceFontSize"),
    textColor: document.getElementById("workspaceTextColor"),

    orientationBtn: document.getElementById("orientationBtn"),
    orientationMenu: document.getElementById("orientationMenu"),
    orientationLabel: document.getElementById("orientationLabel"),

    zoomOutBtn: document.getElementById("zoomOutBtn"),
    zoomInBtn: document.getElementById("zoomInBtn"),
    zoomSelect: document.getElementById("workspaceZoomSelect"),

    insertTableBtn: document.getElementById("insertTableBtn"),

    rulerHorizontal: document.querySelector(".ruler-horizontal"),
    rulerVertical: document.querySelector(".ruler-vertical"),

    bottomPageInfo: document.querySelector(".bottom-page-info"),
    bottomStats: document.querySelectorAll(".bottom-stat")
  };
}

function getWorkspacePapers() {
  return Array.from(document.querySelectorAll(".workspace-paper"));
}

function getWorkspacePageThumbs() {
  return Array.from(document.querySelectorAll(".page-thumb"));
}

function getWorkspacePaperWrap() {
  return document.querySelector(".workspace-paper-wrap");
}

/* =========================================================
   PROJECT DATA HELPERS
========================================================= */

function getProjectWorkspaceStorageKey(projectId) {
  return `project_workspace_content_${projectId || "default"}`;
}

function getWorkspaceOrientationKey() {
  const projectId = selectedProjectForWorkspace?.id || "default";
  return `project_workspace_orientation_${projectId}`;
}

function getWorkspaceZoomKey() {
  const projectId = selectedProjectForWorkspace?.id || "default";
  return `project_workspace_zoom_${projectId}`;
}

function getWorkspaceIndentKey() {
  const projectId = selectedProjectForWorkspace?.id || "default";
  return `project_workspace_indent_${projectId}`;
}

function getProjectById(projectId) {
  if (typeof AppState === "undefined" || !Array.isArray(AppState.projects)) {
    return null;
  }

  return AppState.projects.find(project => Number(project.id) === Number(projectId)) || null;
}

function getProjectName(project) {
  return (
    project?.name ||
    project?.eventName ||
    project?.event_name ||
    project?.docName ||
    project?.doc_name ||
    "Strategik islohotlar"
  );
}

function getProjectAuthor(project) {
  return (
    project?.author ||
    project?.muallif ||
    project?.manager ||
    project?.supervisor ||
    "F.Pulatov"
  );
}

function getProjectDeadline(project) {
  return (
    project?.deadline ||
    project?.endDate ||
    project?.end_date ||
    "04.09.2026"
  );
}

function getProjectIncomingDate(project) {
  return (
    project?.incomingDate ||
    project?.incoming_date ||
    project?.kirimDate ||
    project?.created_at ||
    "2026-05-12"
  );
}

function getProjectStatus(project) {
  return (
    project?.status ||
    project?.state ||
    "active"
  );
}

function getProjectMechanism(project) {
  return (
    project?.mechanism ||
    project?.manager ||
    project?.implementation_mechanism ||
    "2. Jamoatchilik fikrini baholash uchun mustaqil tashkilotlarni tanlash."
  );
}

function getProjectForm(project) {
  return (
    project?.form ||
    project?.actionForm ||
    project?.action_form ||
    project?.implementation_form ||
    "Strategik islohotlar"
  );
}

function fillProjectWorkspaceInfo(project) {
  const els = getProjectWorkspaceEls();

  if (els.taskText) {
    els.taskText.textContent = getProjectName(project);
  }

  if (els.author) {
    els.author.textContent = getProjectAuthor(project);
  }

  if (els.incomingDate) {
    els.incomingDate.textContent = getProjectIncomingDate(project);
  }

  if (els.deadline) {
    els.deadline.textContent = getProjectDeadline(project);
  }
}

/* =========================================================
   DEFAULT CONTENT
========================================================= */

function createDefaultWorkspaceContent(project) {
  return `
    <h1>${escapeHTML(getProjectName(project))}</h1>

    <p><strong>Muallif:</strong> ${escapeHTML(getProjectAuthor(project))}</p>
    <p><strong>Muddat:</strong> ${escapeHTML(getProjectDeadline(project))}</p>
    <p><strong>Holati:</strong> ${escapeHTML(getProjectStatus(project))}</p>

    <p><strong>Amalga oshirish mexanizmi:</strong> ${escapeHTML(getProjectMechanism(project))}</p>
    <p><strong>Amalga oshirish shakli:</strong> ${escapeHTML(getProjectForm(project))}</p>

    <p>
      Bu yerda loyiha bo‘yicha to‘liq matn, topshiriq, izoh, tahlil va hujjat matnlarini yozish mumkin.
    </p>
  `;
}

function loadWorkspaceContent(project) {
  const saved = localStorage.getItem(getProjectWorkspaceStorageKey(project.id));

  if (saved && saved.trim()) {
    return saved;
  }

  return createDefaultWorkspaceContent(project);
}

/* =========================================================
   VIEW MODE
   panel-center      = chap panel ko‘rinadi
   editor-open       = editor rejimi ochiladi
   editor-full-mode  = workspace-left-panel yopiladi
========================================================= */

function setWorkspacePanelCenterMode() {
  const els = getProjectWorkspaceEls();

  if (!els.workspaceView) return;

  els.workspaceView.classList.add("panel-center");
  els.workspaceView.classList.remove("editor-open");

  if (els.workspaceBody) {
    els.workspaceBody.classList.remove("editor-full-mode");
  }
}

function setWorkspaceEditorOpenMode() {
  const els = getProjectWorkspaceEls();

  if (!els.workspaceView) return;

  els.workspaceView.classList.remove("panel-center");
  els.workspaceView.classList.add("editor-open");

  if (els.workspaceBody) {
    els.workspaceBody.classList.add("editor-full-mode");
  }
}

function clearWorkspaceViewMode() {
  const els = getProjectWorkspaceEls();

  if (!els.workspaceView) return;

  els.workspaceView.classList.remove("panel-center");
  els.workspaceView.classList.remove("editor-open");

  if (els.workspaceBody) {
    els.workspaceBody.classList.remove("editor-full-mode");
  }
}

/* =========================================================
   VARIANT SELECT
========================================================= */

function resetWorkspaceVariantSelection() {
  document.querySelectorAll(".variant-item").forEach(item => {
    item.classList.remove("is-selected");
    item.classList.remove("active");
  });
}

function openWorkspaceEditorSide() {
  setWorkspaceEditorOpenMode();

  resetWorkspaceVariantSelection();

  const wordVariant = document.querySelector('[data-workspace-variant="word"]');

  if (wordVariant) {
    wordVariant.classList.add("is-selected");
    wordVariant.classList.add("active");
  }

  setTimeout(() => {
    const firstPage = document.querySelector(".workspace-paper");

    if (firstPage) {
      firstPage.focus();
      setActiveWorkspacePage(firstPage);
    }

    autoPaginateWorkspace();
    updateWorkspaceBottomStats();
  }, 80);
}

function closeWorkspaceEditorSide() {
  setWorkspacePanelCenterMode();
}

function selectWorkspaceVariant(variant) {
  resetWorkspaceVariantSelection();

  const selectedItem = document.querySelector(
    `[data-workspace-variant="${variant}"]`
  );

  if (selectedItem) {
    selectedItem.classList.add("is-selected");
    selectedItem.classList.add("active");
  }

  if (variant === "word") {
    openWorkspaceEditorSide();
    return;
  }

  closeWorkspaceEditorSide();

  if (variant === "survey") {
    alert("Ijtimoiy so‘rov bo‘limi keyin ochiladi");
  }

  if (variant === "program") {
    alert("Dasturiy mahsul bo‘limi keyin ochiladi");
  }
}

function bindWorkspaceVariantEvents() {
  document.querySelectorAll("[data-workspace-variant]").forEach(item => {
    if (item.dataset.variantBound === "1") return;

    item.dataset.variantBound = "1";

    item.addEventListener("click", () => {
      const variant = item.dataset.workspaceVariant;
      selectWorkspaceVariant(variant);
    });
  });
}

/* =========================================================
   PAGE CREATE / RESET
========================================================= */

function createPageElement(pageNumber, html = "<p><br></p>") {
  const page = document.createElement("div");

  page.className = "workspace-paper";
  page.contentEditable = "true";
  page.spellcheck = false;
  page.dataset.page = String(pageNumber);
  page.innerHTML = html || "<p><br></p>";

  bindSinglePageEvents(page);

  return page;
}

function createThumbElement(pageNumber) {
  const thumb = document.createElement("div");

  thumb.className = "page-thumb";
  thumb.dataset.pageThumb = String(pageNumber);
  thumb.innerHTML = `<span>${pageNumber}</span>`;

  thumb.onclick = () => {
    const page = document.querySelector(`.workspace-paper[data-page="${pageNumber}"]`);

    if (!page) return;

    openWorkspaceEditorSide();

    setTimeout(() => {
      page.focus();
      setActiveWorkspacePage(page);

      page.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 80);
  };

  return thumb;
}

function resetWorkspacePages(htmlContent) {
  const els = getProjectWorkspaceEls();

  if (!els.paperStack || !els.pagesBox) return;

  els.paperStack.innerHTML = "";
  els.pagesBox.innerHTML = "";

  const parts = String(htmlContent || "")
    .split('<div class="page-break"></div>')
    .map(part => part.trim())
    .filter(Boolean);

  const pageContents = parts.length ? parts : ["<p><br></p>"];

  pageContents.forEach((html, index) => {
    const pageNumber = index + 1;

    const page = createPageElement(pageNumber, html);
    const thumb = createThumbElement(pageNumber);

    els.paperStack.appendChild(page);
    els.pagesBox.appendChild(thumb);
  });

  refreshWorkspaceThumbNumbers();

  const firstPage = getWorkspacePapers()[0];

  if (firstPage) {
    setActiveWorkspacePage(firstPage);
  }

  updateWorkspaceBottomStats();
}

function createWorkspacePage(html = "<p><br></p>") {
  const els = getProjectWorkspaceEls();

  if (!els.paperStack || !els.pagesBox) return null;

  const nextPageNumber = getWorkspacePapers().length + 1;

  const page = createPageElement(nextPageNumber, html);
  const thumb = createThumbElement(nextPageNumber);

  els.paperStack.appendChild(page);
  els.pagesBox.appendChild(thumb);

  refreshWorkspaceThumbNumbers();
  updateWorkspaceBottomStats();

  return page;
}

/* =========================================================
   ACTIVE PAGE
========================================================= */

function setActiveWorkspacePage(page) {
  if (!page) return;

  activeWorkspacePage = page;

  getWorkspacePapers().forEach(item => {
    item.classList.remove("active");
  });

  page.classList.add("active");

  const pageNumber = Number(page.dataset.page || 1);

  getWorkspacePageThumbs().forEach(thumb => {
    thumb.classList.remove("active");

    if (Number(thumb.dataset.pageThumb || 0) === pageNumber) {
      thumb.classList.add("active");
    }
  });

  updateWorkspaceBottomStats();
}

function getActiveWorkspacePage() {
  if (activeWorkspacePage && document.body.contains(activeWorkspacePage)) {
    return activeWorkspacePage;
  }

  const firstPage = getWorkspacePapers()[0];

  if (firstPage) {
    setActiveWorkspacePage(firstPage);
  }

  return firstPage || null;
}

/* =========================================================
   OPEN / CLOSE
========================================================= */

function openProjectWorkspace(projectId) {
  const project = getProjectById(projectId);

  if (!project) {
    alert("Project topilmadi");
    return;
  }

  selectedProjectForWorkspace = project;

  const els = getProjectWorkspaceEls();

  if (!els.listView || !els.workspaceView) return;

  els.listView.style.display = "none";
  els.workspaceView.style.display = "flex";

  setWorkspacePanelCenterMode();
  resetWorkspaceVariantSelection();

  fillProjectWorkspaceInfo(project);
  resetWorkspacePages(loadWorkspaceContent(project));

  bindWorkspaceVariantEvents();

  bindWorkspaceOrientation();
  loadWorkspaceOrientation();

  bindWorkspaceZoom();
  loadWorkspaceZoom();

  bindWorkspaceRulerIndent();
  bindWorkspaceVerticalRulerIndent();
  loadWorkspaceIndent();

  bindWorkspaceTrackChanges();

  setTimeout(() => {
    autoPaginateWorkspace();

    const firstPage = getWorkspacePapers()[0];

    if (firstPage) {
      setActiveWorkspacePage(firstPage);
    }

    updateWorkspaceBottomStats();
  }, 80);
}

function closeProjectWorkspace() {
  const els = getProjectWorkspaceEls();

  if (!els.listView || !els.workspaceView) return;

  els.workspaceView.style.display = "none";
  clearWorkspaceViewMode();

  els.listView.style.display = "flex";

  resetWorkspaceVariantSelection();

  selectedProjectForWorkspace = null;
  activeWorkspacePage = null;
}

/* =========================================================
   SAVE / CLEAR
========================================================= */

function getAllWorkspacePagesHtml() {
  return getWorkspacePapers()
    .map(page => page.innerHTML)
    .join('<div class="page-break"></div>');
}

function saveWorkspaceContent() {
  if (!selectedProjectForWorkspace) return;

  const html = getAllWorkspacePagesHtml();

  localStorage.setItem(
    getProjectWorkspaceStorageKey(selectedProjectForWorkspace.id),
    html
  );

  localStorage.setItem(getWorkspaceOrientationKey(), workspacePageOrientation);
  localStorage.setItem(getWorkspaceZoomKey(), String(workspaceZoomValue));

  saveWorkspaceIndent();

  alert("Workspace matni saqlandi");
}

function clearWorkspaceContent() {
  if (!selectedProjectForWorkspace) return;

  const confirmClear = confirm("Workspace matnini tozalaysizmi?");

  if (!confirmClear) return;

  localStorage.removeItem(
    getProjectWorkspaceStorageKey(selectedProjectForWorkspace.id)
  );

  resetWorkspacePages(createDefaultWorkspaceContent(selectedProjectForWorkspace));

  setTimeout(() => {
    autoPaginateWorkspace();

    const firstPage = getWorkspacePapers()[0];

    if (firstPage) {
      firstPage.focus();
      setActiveWorkspacePage(firstPage);
    }

    updateWorkspaceBottomStats();
  }, 50);
}

/* =========================================================
   WORD TOOLBAR
========================================================= */

function execWorkspaceCommand(command, value = null) {
  const page = getActiveWorkspacePage();

  if (page) {
    openWorkspaceEditorSide();
    page.focus();
  }

  document.execCommand(command, false, value);

  setTimeout(() => {
    autoPaginateWorkspace();
    updateWorkspaceBottomStats();
  }, 20);
}

function bindWorkspaceToolbar() {
  document.querySelectorAll(".word-btn[data-cmd]").forEach(button => {
    if (button.dataset.bound === "1") return;

    button.dataset.bound = "1";

    button.onclick = () => {
      const command = button.getAttribute("data-cmd");
      execWorkspaceCommand(command);
    };
  });

  const els = getProjectWorkspaceEls();

  if (els.fontName && els.fontName.dataset.bound !== "1") {
    els.fontName.dataset.bound = "1";

    els.fontName.onchange = () => {
      execWorkspaceCommand("fontName", els.fontName.value);
    };
  }

  if (els.fontSize && els.fontSize.dataset.bound !== "1") {
    els.fontSize.dataset.bound = "1";

    els.fontSize.onchange = () => {
      execWorkspaceCommand("fontSize", els.fontSize.value);
    };
  }

  if (els.textColor && els.textColor.dataset.bound !== "1") {
    els.textColor.dataset.bound = "1";

    els.textColor.oninput = () => {
      execWorkspaceCommand("foreColor", els.textColor.value);
    };
  }
}

/* =========================================================
   PAGE ORIENTATION
========================================================= */

function setWorkspaceOrientation(orientation = "portrait", save = true) {
  const wrap = getWorkspacePaperWrap();
  const label = document.getElementById("orientationLabel");

  workspacePageOrientation = orientation === "landscape" ? "landscape" : "portrait";

  if (wrap) {
    wrap.classList.toggle("is-landscape", workspacePageOrientation === "landscape");
  }

  if (label) {
    label.textContent = workspacePageOrientation === "landscape"
      ? "Albom"
      : "Kitobcha";
  }

  applyWorkspaceIndentValues();

  if (save) {
    localStorage.setItem(getWorkspaceOrientationKey(), workspacePageOrientation);
  }

  setTimeout(() => {
    autoPaginateWorkspace();
    updateWorkspaceBottomStats();
  }, 80);
}

function loadWorkspaceOrientation() {
  const saved = localStorage.getItem(getWorkspaceOrientationKey()) || "portrait";
  setWorkspaceOrientation(saved, false);
}

function bindWorkspaceOrientation() {
  const btn = document.getElementById("orientationBtn");
  const menu = document.getElementById("orientationMenu");

  if (!btn || !menu || btn.dataset.bound === "1") return;

  btn.dataset.bound = "1";

  btn.onclick = event => {
    event.stopPropagation();
    menu.classList.toggle("show");
  };

  menu.querySelectorAll("button[data-orientation]").forEach(item => {
    if (item.dataset.bound === "1") return;

    item.dataset.bound = "1";

    item.onclick = event => {
      event.stopPropagation();

      const orientation = item.dataset.orientation || "portrait";

      setWorkspaceOrientation(orientation, true);
      menu.classList.remove("show");
    };
  });

  if (document.body.dataset.orientationCloseBound !== "1") {
    document.body.dataset.orientationCloseBound = "1";

    document.addEventListener("click", () => {
      const currentMenu = document.getElementById("orientationMenu");

      if (currentMenu) {
        currentMenu.classList.remove("show");
      }
    });
  }
}

/* =========================================================
   PAGE ZOOM
========================================================= */

function normalizeWorkspaceZoom(value) {
  const num = Number(value || 100);

  if (Number.isNaN(num)) return 100;

  return Math.max(50, Math.min(200, num));
}

function getNextWorkspaceZoom(direction = 1) {
  const current = normalizeWorkspaceZoom(workspaceZoomValue);

  let index = WORKSPACE_ZOOM_LEVELS.findIndex(item => item >= current);

  if (index === -1) {
    index = WORKSPACE_ZOOM_LEVELS.length - 1;
  }

  if (direction > 0) {
    if (WORKSPACE_ZOOM_LEVELS[index] === current) {
      index++;
    }

    return WORKSPACE_ZOOM_LEVELS[
      Math.min(index, WORKSPACE_ZOOM_LEVELS.length - 1)
    ];
  }

  if (WORKSPACE_ZOOM_LEVELS[index] === current) {
    index--;
  } else {
    index--;
  }

  return WORKSPACE_ZOOM_LEVELS[Math.max(index, 0)];
}

function setWorkspaceZoom(value = 100, save = true, anchorEvent = null) {
  const els = getProjectWorkspaceEls();
  const wrap = els.paperWrap;

  const oldZoomRatio = workspaceZoomValue / 100;

  workspaceZoomValue = normalizeWorkspaceZoom(value);

  const newZoomRatio = workspaceZoomValue / 100;

  let anchorX = null;
  let anchorY = null;
  let localX = null;
  let localY = null;

  if (wrap && anchorEvent) {
    const rect = wrap.getBoundingClientRect();

    localX = anchorEvent.clientX - rect.left;
    localY = anchorEvent.clientY - rect.top;

    anchorX = (wrap.scrollLeft + localX) / oldZoomRatio;
    anchorY = (wrap.scrollTop + localY) / oldZoomRatio;
  }

  if (wrap) {
    wrap.style.setProperty("--workspace-zoom", String(newZoomRatio));
  }

  if (els.zoomSelect) {
    els.zoomSelect.value = String(workspaceZoomValue);
  }

  if (save) {
    localStorage.setItem(getWorkspaceZoomKey(), String(workspaceZoomValue));
  }

  if (wrap && anchorEvent && anchorX !== null && anchorY !== null) {
    requestAnimationFrame(() => {
      wrap.scrollLeft = anchorX * newZoomRatio - localX;
      wrap.scrollTop = anchorY * newZoomRatio - localY;
    });
  }
}

function loadWorkspaceZoom() {
  const savedZoom = localStorage.getItem(getWorkspaceZoomKey()) || "90";
  setWorkspaceZoom(savedZoom, false);
}

function handleWorkspaceWheelZoom(event) {
  const els = getProjectWorkspaceEls();

  if (!els.paperWrap) return;
  if (!event.ctrlKey) return;

  event.preventDefault();

  if (workspaceWheelZoomLock) return;

  workspaceWheelZoomLock = true;

  const direction = event.deltaY < 0 ? 1 : -1;
  const nextZoom = getNextWorkspaceZoom(direction);

  setWorkspaceZoom(nextZoom, true, event);

  setTimeout(() => {
    workspaceWheelZoomLock = false;
  }, 90);
}

function bindWorkspaceZoom() {
  const els = getProjectWorkspaceEls();

  if (els.zoomSelect && els.zoomSelect.dataset.bound !== "1") {
    els.zoomSelect.dataset.bound = "1";

    els.zoomSelect.onchange = () => {
      setWorkspaceZoom(els.zoomSelect.value, true);
    };
  }

  if (els.zoomOutBtn && els.zoomOutBtn.dataset.bound !== "1") {
    els.zoomOutBtn.dataset.bound = "1";

    els.zoomOutBtn.onclick = () => {
      setWorkspaceZoom(getNextWorkspaceZoom(-1), true);
    };
  }

  if (els.zoomInBtn && els.zoomInBtn.dataset.bound !== "1") {
    els.zoomInBtn.dataset.bound = "1";

    els.zoomInBtn.onclick = () => {
      setWorkspaceZoom(getNextWorkspaceZoom(1), true);
    };
  }

  if (els.paperWrap && els.paperWrap.dataset.zoomWheelBound !== "1") {
    els.paperWrap.dataset.zoomWheelBound = "1";

    els.paperWrap.addEventListener("wheel", handleWorkspaceWheelZoom, {
      passive: false
    });
  }
}

/* =========================================================
   RULER SIZE HELPERS
========================================================= */

function getWorkspacePaperWidthValue() {
  const wrap = getWorkspacePaperWrap();

  if (!wrap) return 794;

  const value = getComputedStyle(wrap)
    .getPropertyValue("--paper-w")
    .trim();

  const number = parseFloat(value);

  if (!Number.isFinite(number) || number <= 0) {
    return 794;
  }

  return number;
}

function getWorkspacePaperHeightValue() {
  const wrap = getWorkspacePaperWrap();

  if (!wrap) return 1123;

  const value = getComputedStyle(wrap)
    .getPropertyValue("--paper-h")
    .trim();

  const number = parseFloat(value);

  if (!Number.isFinite(number) || number <= 0) {
    return 1123;
  }

  return number;
}

/* =========================================================
   INDENT STATE
========================================================= */

function normalizeWorkspaceIndentState() {
  const paperWidth = getWorkspacePaperWidthValue();
  const paperHeight = getWorkspacePaperHeightValue();

  workspaceIndentState.paperLeft = clamp(
    Number(workspaceIndentState.paperLeft) || 70,
    30,
    paperWidth - 220
  );

  workspaceIndentState.paperRight = clamp(
    Number(workspaceIndentState.paperRight) || 210,
    30,
    paperWidth - workspaceIndentState.paperLeft - 180
  );

  workspaceIndentState.firstLine = clamp(
    Number(workspaceIndentState.firstLine) || 0,
    0,
    180
  );

  workspaceIndentState.paperTop = clamp(
    Number(workspaceIndentState.paperTop) || 64,
    30,
    paperHeight - workspaceIndentState.paperBottom - 220
  );

  workspaceIndentState.paperBottom = clamp(
    Number(workspaceIndentState.paperBottom) || 64,
    30,
    paperHeight - workspaceIndentState.paperTop - 220
  );
}

function applyWorkspaceIndentValues() {
  const wrap = getWorkspacePaperWrap();

  if (!wrap) return;

  normalizeWorkspaceIndentState();

  wrap.style.setProperty("--paper-left", `${workspaceIndentState.paperLeft}px`);
  wrap.style.setProperty("--paper-right", `${workspaceIndentState.paperRight}px`);
  wrap.style.setProperty("--first-line-indent", `${workspaceIndentState.firstLine}px`);
  wrap.style.setProperty("--paper-top", `${workspaceIndentState.paperTop}px`);
  wrap.style.setProperty("--paper-bottom", `${workspaceIndentState.paperBottom}px`);
}

function saveWorkspaceIndent() {
  localStorage.setItem(
    getWorkspaceIndentKey(),
    JSON.stringify(workspaceIndentState)
  );
}

function loadWorkspaceIndent() {
  const saved = localStorage.getItem(getWorkspaceIndentKey());

  if (saved) {
    try {
      const parsed = JSON.parse(saved);

      workspaceIndentState = {
        paperLeft: Number(parsed.paperLeft) || 70,
        paperRight: Number(parsed.paperRight) || 210,
        firstLine: Number(parsed.firstLine) || 24,
        paperTop: Number(parsed.paperTop) || 64,
        paperBottom: Number(parsed.paperBottom) || 64
      };
    } catch {
      workspaceIndentState = {
        paperLeft: 70,
        paperRight: 210,
        firstLine: 24,
        paperTop: 64,
        paperBottom: 64
      };
    }
  } else {
    workspaceIndentState = {
      paperLeft: 70,
      paperRight: 210,
      firstLine: 24,
      paperTop: 64,
      paperBottom: 64
    };
  }

  applyWorkspaceIndentValues();
}

/* =========================================================
   HORIZONTAL RULER INDENT
========================================================= */

function getXOnWorkspaceRuler(event) {
  const els = getProjectWorkspaceEls();
  const ruler = els.rulerHorizontal;

  if (!ruler) return 0;

  const rect = ruler.getBoundingClientRect();
  const paperWidth = getWorkspacePaperWidthValue();

  const x = event.clientX - rect.left;
  const ratio = rect.width > 0 ? x / rect.width : 0;

  return clamp(ratio * paperWidth, 0, paperWidth);
}

function handleWorkspaceRulerPointerDown(event) {
  const marker = event.target.closest("[data-indent-marker]");

  if (!marker) return;

  event.preventDefault();
  event.stopPropagation();

  workspaceRulerActiveMarker = marker.dataset.indentMarker;

  document.body.classList.add("is-dragging-ruler");
}

function handleWorkspaceRulerPointerMove(event) {
  if (!workspaceRulerActiveMarker) return;

  const paperWidth = getWorkspacePaperWidthValue();
  const x = getXOnWorkspaceRuler(event);

  if (workspaceRulerActiveMarker === "left") {
    workspaceIndentState.paperLeft = clamp(
      x,
      30,
      paperWidth - workspaceIndentState.paperRight - 180
    );
  }

  if (workspaceRulerActiveMarker === "first") {
    const absoluteFirstLine = clamp(
      x,
      workspaceIndentState.paperLeft,
      workspaceIndentState.paperLeft + 180
    );

    workspaceIndentState.firstLine = absoluteFirstLine - workspaceIndentState.paperLeft;
  }

  if (workspaceRulerActiveMarker === "right") {
    workspaceIndentState.paperRight = clamp(
      paperWidth - x,
      30,
      paperWidth - workspaceIndentState.paperLeft - 180
    );
  }

  applyWorkspaceIndentValues();
}

function handleWorkspaceRulerPointerUp() {
  if (!workspaceRulerActiveMarker) return;

  workspaceRulerActiveMarker = null;

  document.body.classList.remove("is-dragging-ruler");

  saveWorkspaceIndent();

  setTimeout(() => {
    autoPaginateWorkspace();
  }, 50);
}

function bindWorkspaceRulerIndent() {
  const els = getProjectWorkspaceEls();

  if (!els.rulerHorizontal || els.rulerHorizontal.dataset.indentBound === "1") {
    return;
  }

  els.rulerHorizontal.dataset.indentBound = "1";
  els.rulerHorizontal.addEventListener("pointerdown", handleWorkspaceRulerPointerDown);

  document.addEventListener("pointermove", handleWorkspaceRulerPointerMove);
  document.addEventListener("pointerup", handleWorkspaceRulerPointerUp);

  applyWorkspaceIndentValues();
}

/* =========================================================
   VERTICAL RULER INDENT
========================================================= */

function getYOnWorkspaceVerticalRuler(event) {
  const els = getProjectWorkspaceEls();
  const ruler = els.rulerVertical;

  if (!ruler) return 0;

  const rect = ruler.getBoundingClientRect();
  const paperHeight = getWorkspacePaperHeightValue();

  const y = event.clientY - rect.top;
  const ratio = rect.height > 0 ? y / rect.height : 0;

  return clamp(ratio * paperHeight, 0, paperHeight);
}

function handleWorkspaceVerticalRulerPointerDown(event) {
  const marker = event.target.closest("[data-v-indent-marker]");

  if (!marker) return;

  event.preventDefault();
  event.stopPropagation();

  workspaceVerticalRulerActiveMarker = marker.dataset.vIndentMarker;

  document.body.classList.add("is-dragging-v-ruler");
}

function handleWorkspaceVerticalRulerPointerMove(event) {
  if (!workspaceVerticalRulerActiveMarker) return;

  const paperHeight = getWorkspacePaperHeightValue();
  const y = getYOnWorkspaceVerticalRuler(event);

  if (workspaceVerticalRulerActiveMarker === "top") {
    workspaceIndentState.paperTop = clamp(
      y,
      30,
      paperHeight - workspaceIndentState.paperBottom - 220
    );
  }

  if (workspaceVerticalRulerActiveMarker === "bottom") {
    workspaceIndentState.paperBottom = clamp(
      paperHeight - y,
      30,
      paperHeight - workspaceIndentState.paperTop - 220
    );
  }

  applyWorkspaceIndentValues();
}

function handleWorkspaceVerticalRulerPointerUp() {
  if (!workspaceVerticalRulerActiveMarker) return;

  workspaceVerticalRulerActiveMarker = null;

  document.body.classList.remove("is-dragging-v-ruler");

  saveWorkspaceIndent();

  setTimeout(() => {
    autoPaginateWorkspace();
  }, 50);
}

function bindWorkspaceVerticalRulerIndent() {
  const els = getProjectWorkspaceEls();

  if (!els.rulerVertical || els.rulerVertical.dataset.vIndentBound === "1") {
    return;
  }

  els.rulerVertical.dataset.vIndentBound = "1";

  els.rulerVertical.addEventListener(
    "pointerdown",
    handleWorkspaceVerticalRulerPointerDown
  );

  document.addEventListener(
    "pointermove",
    handleWorkspaceVerticalRulerPointerMove
  );

  document.addEventListener(
    "pointerup",
    handleWorkspaceVerticalRulerPointerUp
  );

  applyWorkspaceIndentValues();
}

/* =========================================================
   AUTO PAGINATION
========================================================= */

function isPageOverflowing(page) {
  return page.scrollHeight > page.clientHeight + 2;
}

function getOrCreateNextPage(currentPage) {
  const currentNumber = Number(currentPage.dataset.page || 1);

  let nextPage = document.querySelector(
    `.workspace-paper[data-page="${currentNumber + 1}"]`
  );

  if (!nextPage) {
    nextPage = createWorkspacePage();
  }

  return nextPage;
}

function moveLastBlockToNextPage(page) {
  const nextPage = getOrCreateNextPage(page);

  if (!nextPage) return;

  const lastNode = page.lastChild;

  if (!lastNode) return;

  if (page.childNodes.length === 1 && lastNode.nodeType === Node.ELEMENT_NODE) {
    const tag = lastNode.tagName ? lastNode.tagName.toLowerCase() : "";

    if (tag === "p" || tag === "div") {
      const text = lastNode.innerText || "";

      if (text.length > 300) {
        const half = Math.floor(text.length * 0.65);

        const firstText = text.slice(0, half).trim();
        const secondText = text.slice(half).trim();

        lastNode.innerText = firstText;

        const newBlock = document.createElement(tag);
        newBlock.innerText = secondText || "";

        nextPage.insertBefore(newBlock, nextPage.firstChild);

        return;
      }
    }
  }

  nextPage.insertBefore(lastNode, nextPage.firstChild);
}

function autoPaginateWorkspace() {
  if (paginationLock) return;

  paginationLock = true;

  try {
    let safeGlobalCounter = 0;

    while (safeGlobalCounter < 100) {
      const overflowingPage = getWorkspacePapers().find(page => isPageOverflowing(page));

      if (!overflowingPage) break;

      let safePageCounter = 0;

      while (
        isPageOverflowing(overflowingPage) &&
        overflowingPage.childNodes.length > 0 &&
        safePageCounter < 30
      ) {
        moveLastBlockToNextPage(overflowingPage);
        safePageCounter++;
      }

      safeGlobalCounter++;
    }

    removeEmptyExtraPages();
    refreshWorkspaceThumbNumbers();
    updateWorkspaceBottomStats();

  } finally {
    paginationLock = false;
  }
}

function removeEmptyExtraPages() {
  const pages = getWorkspacePapers();

  if (pages.length <= 1) return;

  for (let i = pages.length - 1; i >= 1; i--) {
    const page = pages[i];
    const text = page.innerText.replace(/\s+/g, "").trim();

    if (!text) {
      const pageNumber = page.dataset.page;
      const thumb = document.querySelector(
        `.page-thumb[data-page-thumb="${pageNumber}"]`
      );

      page.remove();

      if (thumb) {
        thumb.remove();
      }
    } else {
      break;
    }
  }
}

function refreshWorkspaceThumbNumbers() {
  const pages = getWorkspacePapers();
  const thumbs = getWorkspacePageThumbs();

  pages.forEach((page, index) => {
    const number = index + 1;
    page.dataset.page = String(number);
  });

  thumbs.forEach((thumb, index) => {
    const number = index + 1;
    thumb.dataset.pageThumb = String(number);
    thumb.innerHTML = `<span>${number}</span>`;
  });
}

/* =========================================================
   PAGE EVENTS
========================================================= */

function bindSinglePageEvents(page) {
  if (!page || page.dataset.bound === "1") return;

  page.dataset.bound = "1";

  page.addEventListener("focus", () => {
    setActiveWorkspacePage(page);
  });

  page.addEventListener("click", () => {
    setActiveWorkspacePage(page);
  });

  page.addEventListener("input", () => {
    autoPaginateWorkspace();
    updateWorkspaceBottomStats();
  });

  page.addEventListener("paste", () => {
    setTimeout(() => {
      autoPaginateWorkspace();
      updateWorkspaceBottomStats();
    }, 30);
  });

  page.addEventListener("keydown", handleWorkspacePageKeydown);
}

function bindWorkspacePages() {
  getWorkspacePapers().forEach(page => {
    bindSinglePageEvents(page);
  });

  getWorkspacePageThumbs().forEach(thumb => {
    thumb.onclick = () => {
      const pageNumber = thumb.dataset.pageThumb;
      const page = document.querySelector(`.workspace-paper[data-page="${pageNumber}"]`);

      if (!page) return;

      openWorkspaceEditorSide();

      setTimeout(() => {
        page.focus();
        setActiveWorkspacePage(page);

        page.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }, 80);
    };
  });

  const firstPage = getWorkspacePapers()[0];

  if (firstPage) {
    setActiveWorkspacePage(firstPage);
  }
}

function handleWorkspacePageKeydown(event) {
  const page = event.currentTarget;

  if (event.key !== "Backspace") return;

  const text = page.innerText.replace(/\s+/g, "").trim();

  if (text) return;

  const pages = getWorkspacePapers();

  if (pages.length <= 1) return;

  event.preventDefault();

  const pageNumber = Number(page.dataset.page || 1);
  const prevPage = document.querySelector(
    `.workspace-paper[data-page="${pageNumber - 1}"]`
  );

  const thumb = document.querySelector(
    `.page-thumb[data-page-thumb="${pageNumber}"]`
  );

  page.remove();

  if (thumb) {
    thumb.remove();
  }

  refreshWorkspaceThumbNumbers();
  updateWorkspaceBottomStats();

  if (prevPage) {
    prevPage.focus();
    setActiveWorkspacePage(prevPage);
  }
}

/* =========================================================
   WORD IMPORT DOCX
========================================================= */

function cleanImportedWordHtml(html) {
  const box = document.createElement("div");
  box.innerHTML = String(html || "");

  box.querySelectorAll("script, style").forEach(el => el.remove());

  box.querySelectorAll("*").forEach(el => {
    el.removeAttribute("class");
    el.removeAttribute("style");
    el.removeAttribute("id");
    el.removeAttribute("width");
    el.removeAttribute("height");
  });

  box.querySelectorAll("table").forEach(table => {
    table.setAttribute("contenteditable", "true");

    if (!table.querySelector("tbody")) {
      const tbody = document.createElement("tbody");

      Array.from(table.children).forEach(child => {
        if (child.tagName && child.tagName.toLowerCase() === "tr") {
          tbody.appendChild(child);
        }
      });

      if (tbody.children.length) {
        table.appendChild(tbody);
      }
    }
  });

  box.querySelectorAll("td, th").forEach(cell => {
    if (!cell.innerHTML.trim()) {
      cell.innerHTML = "<p><br></p>";
    }
  });

  return box.innerHTML.trim();
}

function setImportedWordToWorkspace(html) {
  const cleanedHtml = cleanImportedWordHtml(html);

  if (!cleanedHtml) {
    alert("Word fayl ichida matn topilmadi");
    return;
  }

  resetWorkspacePages(cleanedHtml);

  loadWorkspaceOrientation();
  loadWorkspaceZoom();
  loadWorkspaceIndent();

  openWorkspaceEditorSide();

  setTimeout(() => {
    autoPaginateWorkspace();

    const firstPage = getWorkspacePapers()[0];

    if (firstPage) {
      firstPage.focus();
      setActiveWorkspacePage(firstPage);
    }

    updateWorkspaceBottomStats();
  }, 100);
}

async function importWordFile(event) {
  try {
    const file = event.target.files && event.target.files[0];

    if (!file) return;

    const fileName = file.name.toLowerCase();

    if (!fileName.endsWith(".docx")) {
      alert("Faqat .docx formatdagi Word fayl import qilinadi");
      event.target.value = "";
      return;
    }

    if (typeof mammoth === "undefined") {
      alert("DOCX import kutubxonasi yuklanmagan. mammoth.js ulanmagan.");
      event.target.value = "";
      return;
    }

    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.convertToHtml({
      arrayBuffer: arrayBuffer
    });

    setImportedWordToWorkspace(result.value);

    if (result.messages && result.messages.length > 0) {
      console.warn("DOCX IMPORT WARNINGS:", result.messages);
    }

    event.target.value = "";

  } catch (err) {
    console.error("WORD IMPORT ERROR:", err);
    alert("Word faylni import qilishda xatolik: " + err.message);
  }
}

function bindWordImportEvents() {
  const els = getProjectWorkspaceEls();

  if (!els.importWordBtn || !els.importWordInput) return;

  if (els.importWordBtn.dataset.bound === "1") return;

  els.importWordBtn.dataset.bound = "1";

  els.importWordBtn.onclick = () => {
    openWorkspaceEditorSide();
    els.importWordInput.click();
  };

  els.importWordInput.onchange = importWordFile;
}

/* =========================================================
   INSERT TABLE
========================================================= */

function buildWorkspaceTable(rows = 3, cols = 3) {
  let html = `
    <table>
      <tbody>
  `;

  for (let r = 0; r < rows; r++) {
    html += "<tr>";

    for (let c = 0; c < cols; c++) {
      html += `<td><p><br></p></td>`;
    }

    html += "</tr>";
  }

  html += `
      </tbody>
    </table>
    <p><br></p>
  `;

  return html;
}

function insertWorkspaceTable() {
  openWorkspaceEditorSide();

  const rowsInput = prompt("Nechta qator?", "3");
  const colsInput = prompt("Nechta ustun?", "3");

  const rows = Math.max(1, Math.min(20, Number(rowsInput || 3)));
  const cols = Math.max(1, Math.min(10, Number(colsInput || 3)));

  const tableHTML = buildWorkspaceTable(rows, cols);

  const activePage = getActiveWorkspacePage();

  if (activePage) {
    activePage.focus();
  }

  document.execCommand("insertHTML", false, tableHTML);

  setTimeout(() => {
    autoPaginateWorkspace();
    updateWorkspaceBottomStats();
  }, 50);
}

function bindWorkspaceTableButton() {
  const btn = document.getElementById("insertTableBtn");

  if (!btn || btn.dataset.bound === "1") return;

  btn.dataset.bound = "1";
  btn.onclick = insertWorkspaceTable;
}

/* =========================================================
   TRACK CHANGES
========================================================= */

const workspaceTrackState = {
  enabled: true,
  currentUser: "User",
  authorMap: new Map(),
  authorClasses: [
    "author-red",
    "author-blue",
    "author-green",
    "author-purple",
    "author-orange",
    "author-pink"
  ]
};

function getTrackAuthorClass(user) {
  const name = String(user || "User").trim();

  if (!workspaceTrackState.authorMap.has(name)) {
    const index = workspaceTrackState.authorMap.size % workspaceTrackState.authorClasses.length;
    workspaceTrackState.authorMap.set(name, workspaceTrackState.authorClasses[index]);
  }

  return workspaceTrackState.authorMap.get(name);
}

function createChangeHTML(text, type = "add", user = workspaceTrackState.currentUser) {
  if (!text) return "";

  const safeText = escapeHTML(text);
  const safeUser = escapeHTML(user);
  const authorClass = getTrackAuthorClass(user);

  return `
    <span 
      class="change-mark change-${type} ${authorClass}" 
      data-user="${safeUser}"
    >${safeText}</span>
  `;
}

function insertWorkspaceHTML(html) {
  document.execCommand("insertHTML", false, html);
}

function getSelectedWorkspaceText() {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) return "";

  return selection.toString();
}

function deleteWorkspaceSelection() {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) return;

  selection.deleteFromDocument();
}

function sameWorkspaceMark(a, b) {
  if (!a || !b) return false;

  const sameUser = a.dataset.user === b.dataset.user;

  const sameType =
    (a.classList.contains("change-add") && b.classList.contains("change-add")) ||
    (a.classList.contains("change-edit") && b.classList.contains("change-edit")) ||
    (a.classList.contains("change-delete") && b.classList.contains("change-delete"));

  const sameAuthor = workspaceTrackState.authorClasses.some(cls => {
    return a.classList.contains(cls) && b.classList.contains(cls);
  });

  return sameUser && sameType && sameAuthor;
}

function normalizeAdjacentWorkspaceMarks(container) {
  const marks = Array.from(container.querySelectorAll(".change-mark"));

  marks.forEach(mark => {
    let next = mark.nextSibling;

    while (
      next &&
      next.nodeType === 1 &&
      next.classList.contains("change-mark") &&
      sameWorkspaceMark(mark, next)
    ) {
      mark.textContent += next.textContent;
      next.remove();
      next = mark.nextSibling;
    }
  });
}

function handleWorkspaceTrackBeforeInput(event) {
  const paper = event.target.closest(".workspace-paper");

  if (!paper) return;
  if (!workspaceTrackState.enabled) return;

  const inputType = event.inputType;
  const selectedText = getSelectedWorkspaceText();

  if (inputType === "insertText" && event.data) {
    event.preventDefault();

    if (selectedText) {
      deleteWorkspaceSelection();

      const oldHTML = createChangeHTML(selectedText, "delete");
      const newHTML = createChangeHTML(event.data, "edit");

      insertWorkspaceHTML(oldHTML + newHTML);
    } else {
      insertWorkspaceHTML(createChangeHTML(event.data, "add"));
    }

    normalizeAdjacentWorkspaceMarks(paper);

    setTimeout(() => {
      autoPaginateWorkspace();
      updateWorkspaceBottomStats();
    }, 20);

    return;
  }

  if (inputType === "insertFromPaste") {
    event.preventDefault();

    const pastedText =
      event.clipboardData?.getData("text/plain") ||
      window.clipboardData?.getData("Text") ||
      "";

    if (!pastedText) return;

    if (selectedText) {
      deleteWorkspaceSelection();

      const oldHTML = createChangeHTML(selectedText, "delete");
      const newHTML = createChangeHTML(pastedText, "edit");

      insertWorkspaceHTML(oldHTML + newHTML);
    } else {
      insertWorkspaceHTML(createChangeHTML(pastedText, "add"));
    }

    normalizeAdjacentWorkspaceMarks(paper);

    setTimeout(() => {
      autoPaginateWorkspace();
      updateWorkspaceBottomStats();
    }, 20);

    return;
  }

  if (
    inputType === "deleteContentBackward" ||
    inputType === "deleteContentForward" ||
    inputType === "deleteByCut"
  ) {
    if (selectedText) {
      event.preventDefault();

      deleteWorkspaceSelection();
      insertWorkspaceHTML(createChangeHTML(selectedText, "delete"));

      normalizeAdjacentWorkspaceMarks(paper);

      setTimeout(() => {
        autoPaginateWorkspace();
        updateWorkspaceBottomStats();
      }, 20);
    }
  }
}

function bindWorkspaceTrackChanges() {
  const paperStack = document.getElementById("workspacePaperStack");
  const userBtn = document.getElementById("workspaceUserBtn");
  const trackBtn = document.getElementById("trackChangesBtn");

  if (!paperStack || !userBtn || !trackBtn) return;

  workspaceTrackState.currentUser = userBtn.textContent.trim() || "User";

  if (paperStack.dataset.trackBound !== "1") {
    paperStack.dataset.trackBound = "1";
    paperStack.addEventListener("beforeinput", handleWorkspaceTrackBeforeInput);
  }

  if (trackBtn.dataset.trackBound !== "1") {
    trackBtn.dataset.trackBound = "1";

    trackBtn.addEventListener("click", function () {
      workspaceTrackState.enabled = !workspaceTrackState.enabled;

      trackBtn.classList.toggle("track-active", workspaceTrackState.enabled);
      trackBtn.classList.toggle("track-disabled", !workspaceTrackState.enabled);
    });
  }

  if (userBtn.dataset.trackBound !== "1") {
    userBtn.dataset.trackBound = "1";

    userBtn.addEventListener("click", function () {
      const newName = prompt(
        "Foydalanuvchi ismini kiriting:",
        workspaceTrackState.currentUser
      );

      if (!newName || !newName.trim()) return;

      workspaceTrackState.currentUser = newName.trim();
      userBtn.textContent = workspaceTrackState.currentUser;
    });
  }
}

/* =========================================================
   BOTTOM STATS
========================================================= */

function updateWorkspaceBottomStats() {
  const els = getProjectWorkspaceEls();

  const pages = getWorkspacePapers();

  const activePageNumber = activeWorkspacePage
    ? Number(activeWorkspacePage.dataset.page || 1)
    : 1;

  const allText = pages
    .map(page => page.innerText || "")
    .join(" ")
    .trim();

  const words = allText
    ? allText.split(/\s+/).filter(Boolean).length
    : 0;

  const chars = allText.replace(/\s/g, "").length;

  if (els.bottomPageInfo) {
    els.bottomPageInfo.innerHTML = `
      Sahifa ${activePageNumber} / ${pages.length || 1}
      <i class="ri-arrow-down-s-line"></i>
    `;
  }

  if (els.bottomStats && els.bottomStats.length >= 2) {
    els.bottomStats[0].innerHTML = `So‘zlar: <b>${words}</b>`;
    els.bottomStats[1].innerHTML = `Belgilar: <b>${chars}</b>`;
  }
}

/* =========================================================
   SEND TO LEADER
========================================================= */

function bindWorkspaceSendLeader() {
  const els = getProjectWorkspaceEls();

  if (!els.sendLeaderBtn || els.sendLeaderBtn.dataset.bound === "1") return;

  els.sendLeaderBtn.dataset.bound = "1";

  els.sendLeaderBtn.onclick = () => {
    const leaderName = els.leaderInput
      ? els.leaderInput.value.trim()
      : "";

    if (!leaderName) {
      alert("Rahbar F.I.Sh. kiriting");
      return;
    }

    alert(`Hujjat imzolash uchun yuborildi: ${leaderName}`);
  };
}

/* =========================================================
   EVENTS INIT
========================================================= */

function bindProjectWorkspaceEvents() {
  const els = getProjectWorkspaceEls();

  if (els.backBtn && els.backBtn.dataset.bound !== "1") {
    els.backBtn.dataset.bound = "1";
    els.backBtn.onclick = closeProjectWorkspace;
  }

  if (els.saveBtn && els.saveBtn.dataset.bound !== "1") {
    els.saveBtn.dataset.bound = "1";
    els.saveBtn.onclick = saveWorkspaceContent;
  }

  if (els.saveBottomBtn && els.saveBottomBtn.dataset.bound !== "1") {
    els.saveBottomBtn.dataset.bound = "1";
    els.saveBottomBtn.onclick = saveWorkspaceContent;
  }

  if (els.clearBtn && els.clearBtn.dataset.bound !== "1") {
    els.clearBtn.dataset.bound = "1";
    els.clearBtn.onclick = clearWorkspaceContent;
  }

  bindWorkspaceVariantEvents();

  bindWorkspaceToolbar();
  bindWorkspacePages();
  bindWordImportEvents();
  bindWorkspaceTableButton();
  bindWorkspaceOrientation();
  bindWorkspaceZoom();
  bindWorkspaceRulerIndent();
  bindWorkspaceVerticalRulerIndent();
  bindWorkspaceTrackChanges();
  bindWorkspaceSendLeader();

  updateWorkspaceBottomStats();
}

function initProjectWorkspace() {
  bindProjectWorkspaceEvents();
}

/* =========================================================
   AUTO INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initProjectWorkspace();
});

/* =========================================================
   GLOBAL
========================================================= */

window.openProjectWorkspace = openProjectWorkspace;
window.closeProjectWorkspace = closeProjectWorkspace;
window.initProjectWorkspace = initProjectWorkspace;
window.openWorkspaceEditorSide = openWorkspaceEditorSide;
window.closeWorkspaceEditorSide = closeWorkspaceEditorSide;
window.selectWorkspaceVariant = selectWorkspaceVariant;