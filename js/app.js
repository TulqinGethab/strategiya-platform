/* =========================================================
   APP.JS — MENU / EVENTS / INIT
   Safe version for separated HTML files
========================================================= */

/* ================= DOM ELEMENTS ================= */

function getAppEls() {
  return {
    /* Sidebar */
    sidebar: document.getElementById("sidebar"),
    sidebarToggle: document.getElementById("sidebarToggle"),

    /* Menu */
    menuDashboard: document.getElementById("menuDashboard"),
    menuProjects: document.getElementById("menuProjects"),
    menuStructure: document.getElementById("menuStructure"),
    menuTadat: document.getElementById("menuTadat"),
    menuReports: document.getElementById("menuReports"),
    menuSettings: document.getElementById("menuSettings"),

    /* Sections */
    dashboardSection: document.getElementById("dashboardSection"),
    projectsSection: document.getElementById("projectsSection"),
    structureSection: document.getElementById("structureSection"),
    tadatSection: document.getElementById("tadatSection"),
    reportsSection: document.getElementById("reportsSection"),
    settingsSection: document.getElementById("settingsSection"),

    /* Header */
    pageTitle: document.querySelector(".page-title"),
    pageBadge: document.getElementById("pageBadge"),

    /* Dashboard */
    timelineEl: document.getElementById("timeline"),
    totalCount: document.getElementById("totalCount"),
    activeCount: document.getElementById("activeCount"),
    completedCount: document.getElementById("completedCount"),
    riskCount: document.getElementById("riskCount"),
    totalTrend: document.getElementById("totalTrend"),
    activeTrend: document.getElementById("activeTrend"),
    completedTrend: document.getElementById("completedTrend"),
    riskTrend: document.getElementById("riskTrend"),
    projectBadge: document.getElementById("projectBadge"),

    /* Projects */
    openModal: document.getElementById("openModal"),
    searchInput: document.getElementById("searchInput"),
    statusFilter: document.getElementById("statusFilter"),

    /* Project modal */
    modal: document.getElementById("modal"),
    modalTitle: document.getElementById("modalTitle"),

    kirimNumber: document.getElementById("kirimNumber"),
    kirimDate: document.getElementById("kirimDate"),
    chiqimNumber: document.getElementById("chiqimNumber"),
    chiqimDate: document.getElementById("chiqimDate"),
    author: document.getElementById("author"),

    eventName: document.getElementById("eventName"),
    mechanism: document.getElementById("mechanism"),
    form: document.getElementById("form"),
    deadline: document.getElementById("deadline"),
    executorInput: document.getElementById("executorInput"),
    executorList: document.getElementById("executorList"),
    status: document.getElementById("status"),

    projectsEl: document.getElementById("projects"),

    /* Pagination */
    projectPageSize: document.getElementById("projectPageSize"),
    projectPageSelect: document.getElementById("projectPageSelect"),
    projectPageInfo: document.getElementById("projectPageInfo"),
    projectPrevPage: document.getElementById("projectPrevPage"),
    projectNextPage: document.getElementById("projectNextPage")
  };
}

function refreshAppEls() {
  const freshEls = getAppEls();

  if (typeof AppEls !== "undefined") {
    Object.assign(AppEls, freshEls);
    return AppEls;
  }

  window.AppEls = freshEls;
  return window.AppEls;
}

/* ================= HELPERS ================= */

function hideElement(el) {
  if (el) {
    el.style.display = "none";
  }
}

function showElement(el, displayType = "block") {
  if (el) {
    el.style.display = displayType;
  }
}

function setPageTitle(title, badgeText = "") {
  const els = refreshAppEls();

  if (els.pageTitle) {
    els.pageTitle.textContent = title;
  }

  if (els.pageBadge) {
    if (badgeText) {
      els.pageBadge.textContent = badgeText;
      els.pageBadge.style.display = "inline-flex";
    } else {
      els.pageBadge.textContent = "";
      els.pageBadge.style.display = "none";
    }
  }
}

/* ================= MENU SYSTEM ================= */

function hideAllSections() {
  const els = refreshAppEls();

  hideElement(els.dashboardSection);
  hideElement(els.projectsSection);
  hideElement(els.structureSection);
  hideElement(els.tadatSection);
  hideElement(els.reportsSection);
  hideElement(els.settingsSection);
}

function setActiveMenu(activeMenu) {
  const els = refreshAppEls();

  [
    els.menuDashboard,
    els.menuProjects,
    els.menuStructure,
    els.menuTadat,
    els.menuReports,
    els.menuSettings
  ].forEach(menu => {
    if (menu) {
      menu.classList.remove("active");
    }
  });

  if (activeMenu) {
    activeMenu.classList.add("active");
  }
}

function updateCalendarSize() {
  if (typeof AppState !== "undefined" && AppState.calendar) {
    setTimeout(() => {
      AppState.calendar.updateSize();
    }, 100);
  }
}

function showSection(sectionName) {
  const els = refreshAppEls();

  hideAllSections();

  if (sectionName === "dashboard") {
    setActiveMenu(els.menuDashboard);
    setPageTitle("Dashboard");

    showElement(els.dashboardSection, "flex");

    if (typeof renderDashboardSection === "function") {
      renderDashboardSection();
    }

    updateCalendarSize();
    return;
  }

  if (sectionName === "projects") {
    setActiveMenu(els.menuProjects);
    setPageTitle("Projects", "Kirim-chiqim hujjatlari va tadbirlar");

    showElement(els.projectsSection, "flex");

    if (typeof renderProjectsSection === "function") {
      renderProjectsSection();
    }

    return;
  }

  if (sectionName === "structure") {
    setActiveMenu(els.menuStructure);
    setPageTitle("Struktura");

    showElement(els.structureSection, "block");

    if (typeof renderStructureSection === "function") {
      renderStructureSection();
    }

    return;
  }

  if (sectionName === "tadat") {
    setActiveMenu(els.menuTadat);
    setPageTitle("Tadat");

    showElement(els.tadatSection, "block");

    if (typeof renderTadatSection === "function") {
      renderTadatSection();
    }

    return;
  }

  if (sectionName === "reports") {
    setActiveMenu(els.menuReports);
    setPageTitle("Reports");

    showElement(els.reportsSection, "block");

    if (typeof renderReportsSection === "function") {
      renderReportsSection();
    }

    return;
  }

  if (sectionName === "settings") {
    setActiveMenu(els.menuSettings);
    setPageTitle("Settings");

    showElement(els.settingsSection, "block");

    if (typeof renderSettingsSection === "function") {
      renderSettingsSection();
    }
  }
}

/* ================= SIDEBAR COLLAPSE ================= */

function updateSidebarToggleIcon() {
  const els = refreshAppEls();

  if (!els.sidebarToggle) return;

  const icon = els.sidebarToggle.querySelector("i");

  if (!icon) return;

  const isCollapsed = document.body.classList.contains("sidebar-collapsed");

  icon.className = isCollapsed
    ? "ri-menu-unfold-line"
    : "ri-menu-fold-line";
}

function initSidebarCollapse() {
  const els = refreshAppEls();

  if (!els.sidebarToggle || els.sidebarToggle.dataset.bound === "1") return;

  els.sidebarToggle.dataset.bound = "1";

  const savedState = localStorage.getItem("sidebar_collapsed");

  if (savedState === "1") {
    document.body.classList.add("sidebar-collapsed");
  } else {
    document.body.classList.remove("sidebar-collapsed");
  }

  updateSidebarToggleIcon();

  els.sidebarToggle.onclick = () => {
    document.body.classList.toggle("sidebar-collapsed");

    const isCollapsed = document.body.classList.contains("sidebar-collapsed");

    localStorage.setItem("sidebar_collapsed", isCollapsed ? "1" : "0");

    updateSidebarToggleIcon();

    setTimeout(() => {
      updateCalendarSize();
    }, 260);
  };
}

/* ================= EVENTS ================= */

function bindMenuEvents() {
  const els = refreshAppEls();

  if (els.menuDashboard) {
    els.menuDashboard.onclick = () => showSection("dashboard");
  }

  if (els.menuProjects) {
    els.menuProjects.onclick = () => showSection("projects");
  }

  if (els.menuStructure) {
    els.menuStructure.onclick = () => showSection("structure");
  }

  if (els.menuTadat) {
    els.menuTadat.onclick = () => showSection("tadat");
  }

  if (els.menuReports) {
    els.menuReports.onclick = () => showSection("reports");
  }

  if (els.menuSettings) {
    els.menuSettings.onclick = () => showSection("settings");
  }
}

function bindProjectEvents() {
  const els = refreshAppEls();

  if (els.openModal && typeof openProjectModal === "function") {
    els.openModal.onclick = openProjectModal;
  }

  if (els.searchInput && typeof renderProjectsSection === "function") {
    els.searchInput.oninput = renderProjectsSection;
  }

  if (els.statusFilter && typeof renderProjectsSection === "function") {
    els.statusFilter.onchange = renderProjectsSection;
  }
}

function bindGlobalFunctions() {
  if (typeof addExecutor === "function") {
    window.addExecutor = addExecutor;
  }

  if (typeof removeExecutor === "function") {
    window.removeExecutor = removeExecutor;
  }

  if (typeof closeModal === "function") {
    window.closeModal = closeModal;
  }

  if (typeof saveProject === "function") {
    window.saveProject = saveProject;
  }

  if (typeof editProject === "function") {
    window.editProject = editProject;
  }

  if (typeof deleteProject === "function") {
    window.deleteProject = deleteProject;
  }

  window.showSection = showSection;
}

/* ================= INIT ================= */

async function init() {
  try {
    refreshAppEls();

    initSidebarCollapse();

    bindMenuEvents();
    bindProjectEvents();
    bindGlobalFunctions();

    if (typeof loadProjects === "function") {
      await loadProjects();
    }

    if (typeof bindProjectsPaginationEvents === "function") {
      bindProjectsPaginationEvents();
    }

    showSection("dashboard");

  } catch (err) {
    console.error("INIT ERROR:", err);

    if (typeof showError === "function") {
      showError("Serverdan projectlarni olishda xatolik: " + err.message);
    } else {
      alert("Serverdan projectlarni olishda xatolik: " + err.message);
    }
  }
}

/* ================= START ================= */

init();