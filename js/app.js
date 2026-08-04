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
    projectsSubmenu: document.getElementById("projectsSubmenu"),
    menuProjectNewTask: document.getElementById("menuProjectNewTask"),
    menuProjectReceived: document.getElementById("menuProjectReceived"),
    menuProjectSent: document.getElementById("menuProjectSent"),
    menuStructure: document.getElementById("menuStructure"),
    structureSubmenu: document.getElementById("structureSubmenu"),
    menuStructureCommittee: document.getElementById("menuStructureCommittee"),
    menuStructureYsti: document.getElementById("menuStructureYsti"),
    menuStructureDepartments: document.getElementById("menuStructureDepartments"),
    menuStructureInspections: document.getElementById("menuStructureInspections"),
    menuTadat: document.getElementById("menuTadat"),
    tadatSubmenu: document.getElementById("tadatSubmenu"),
    menuTadatMain: document.getElementById("menuTadatMain"),
    menuBReady: document.getElementById("menuBReady"),
    menuIndexlar: document.getElementById("menuIndexlar"),
    indexlarSubmenu: document.getElementById("indexlarSubmenu"),
    menuIndexRegister: document.getElementById("menuIndexRegister"),
    menuIndexWorkflow: document.getElementById("menuIndexWorkflow"),
    menuIndexReports: document.getElementById("menuIndexReports"),
    menuIndicators: document.getElementById("menuIndicators"),
    menuSettings: document.getElementById("menuSettings"),

    /* Sections */
    dashboardSection: document.getElementById("dashboardSection"),
    projectsSection: document.getElementById("projectsSection"),
    structureSection: document.getElementById("structureSection"),
    tadatSection: document.getElementById("tadatSection"),
    breadySection: document.getElementById("breadySection"),
    indexlarSection: document.getElementById("indexlarSection"),
    indicatorsSection: document.getElementById("indicatorsSection"),
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

    /* New task modal */
    taskSender: document.getElementById("taskSender"),
    leadershipTask: document.getElementById("leadershipTask"),
    taskSummary: document.getElementById("taskSummary"),
    taskFileInput: document.getElementById("taskFileInput"),
    taskFileName: document.getElementById("taskFileName"),
    taskFileSize: document.getElementById("taskFileSize"),
    clearTaskFileBtn: document.getElementById("clearTaskFileBtn"),

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
  hideElement(els.breadySection);
  hideElement(els.indexlarSection);
  hideElement(els.indicatorsSection);
  hideElement(els.settingsSection);
}




function setProjectsSubmenuOpen(isOpen) {
  const els = refreshAppEls();

  if (els.projectsSubmenu) {
    els.projectsSubmenu.classList.toggle("open", Boolean(isOpen));
    els.projectsSubmenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
  }

  if (els.menuProjects) {
    els.menuProjects.classList.toggle("submenu-open", Boolean(isOpen));
    els.menuProjects.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }
}

function setActiveProjectsSubmenu(activeItem) {
  const els = refreshAppEls();

  [
    els.menuProjectNewTask,
    els.menuProjectReceived,
    els.menuProjectSent
  ].forEach(item => {
    if (item) item.classList.remove("active");
  });

  if (activeItem) {
    activeItem.classList.add("active");
  }
}

function getProjectMenuByTarget(target) {
  const els = refreshAppEls();

  const map = {
    newTask: els.menuProjectNewTask,
    received: els.menuProjectReceived,
    sent: els.menuProjectSent
  };

  return map[target] || els.menuProjectReceived || els.menuProjects;
}

function getProjectTitleByTarget(target) {
  const map = {
    newTask: "Yangi topshiriq",
    received: "Qabul qilingan hujjatlar",
    sent: "Yuborilgan hujjatlar"
  };

  return map[target] || "Qabul qilingan hujjatlar";
}

function setStructureSubmenuOpen(isOpen) {
  const els = refreshAppEls();

  if (els.structureSubmenu) {
    els.structureSubmenu.classList.toggle("open", Boolean(isOpen));
    els.structureSubmenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
  }

  if (els.menuStructure) {
    els.menuStructure.classList.toggle("submenu-open", Boolean(isOpen));
    els.menuStructure.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }
}

function setActiveStructureSubmenu(activeItem) {
  const els = refreshAppEls();

  [
    els.menuStructureCommittee,
    els.menuStructureYsti,
    els.menuStructureDepartments,
    els.menuStructureInspections
  ].forEach(item => {
    if (item) item.classList.remove("active");
  });

  if (activeItem) {
    activeItem.classList.add("active");
  }
}

function getStructureMenuByTarget(target) {
  const els = refreshAppEls();

  const map = {
    committee: els.menuStructureCommittee,
    ysti: els.menuStructureYsti,
    departments: els.menuStructureDepartments,
    inspections: els.menuStructureInspections
  };

  return map[target] || els.menuStructureCommittee || els.menuStructure;
}

function getStructureTitleByTarget(target) {
  const map = {
    committee: "Soliq qo‘mitasi strukturasi",
    ysti: "YSTI strukturasi",
    departments: "Soliq boshqarmalari strukturasi",
    inspections: "Soliq inspeksiyalari strukturasi"
  };

  return map[target] || "Soliq qo‘mitasi strukturasi";
}

function setTadatSubmenuOpen(isOpen) {
  const els = refreshAppEls();

  if (els.tadatSubmenu) {
    els.tadatSubmenu.classList.toggle("open", Boolean(isOpen));
    els.tadatSubmenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
  }

  if (els.menuTadat) {
    els.menuTadat.classList.toggle("submenu-open", Boolean(isOpen));
    els.menuTadat.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }
}

function setActiveTadatSubmenu(activeItem) {
  const els = refreshAppEls();

  [els.menuTadatMain, els.menuBReady].forEach(item => {
    if (item) item.classList.remove("active");
  });

  if (activeItem) activeItem.classList.add("active");
}

function setIndexlarSubmenuOpen(isOpen) {
  const els = refreshAppEls();

  if (els.indexlarSubmenu) {
    els.indexlarSubmenu.classList.toggle("open", Boolean(isOpen));
    els.indexlarSubmenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
  }

  if (els.menuIndexlar) {
    els.menuIndexlar.classList.toggle("submenu-open", Boolean(isOpen));
    els.menuIndexlar.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }
}

function setActiveIndexlarSubmenu(activeItem) {
  const els = refreshAppEls();

  [
    els.menuIndexRegister,
    els.menuIndexWorkflow,
    els.menuIndexReports
  ].forEach(item => {
    if (item) item.classList.remove("active");
  });

  if (activeItem) {
    activeItem.classList.add("active");
  }
}

function scrollIndexlarTo(targetId) {
  if (!targetId) return;

  setTimeout(() => {
    const target = document.getElementById(targetId);
    const section = document.getElementById("indexlarSection");

    if (!target || !section) return;

    const top = Math.max(0, target.offsetTop - 18);

    if (typeof section.scrollTo === "function") {
      section.scrollTo({ top, behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 120);
}

function setIndexlarContentView(targetId = null) {
  const section = document.getElementById("indexlarSection");
  if (!section) return;

  const filterCard = section.querySelector(".indexlar-filter-card");
  const mainGrid = section.querySelector(".indexlar-main-grid");
  const bottomGrid = section.querySelector(".indexlar-bottom-grid");

  const panels = {
    indexlarRegisterPanel: document.getElementById("indexlarRegisterPanel"),
    indexlarWorkflowPanel: document.getElementById("indexlarWorkflowPanel"),
    indexlarReportFormsPanel: document.getElementById("indexlarReportFormsPanel")
  };

  const validTarget = targetId && panels[targetId] ? targetId : null;

  section.classList.toggle("indexlar-single-view", Boolean(validTarget));
  section.dataset.indexlarView = validTarget || "all";

  if (!validTarget) {
    // INDEXLAR asosiy menyusi bosilganda faqat komponentlar va formula ko‘rinadi.
    if (filterCard) filterCard.style.display = "none";
    if (mainGrid) mainGrid.style.display = "";
    if (bottomGrid) bottomGrid.style.display = "none";

    Object.values(panels).forEach(panel => {
      if (panel) panel.style.display = "none";
    });

    if (typeof section.scrollTo === "function") {
      section.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      section.scrollTop = 0;
    }

    return;
  }

  // Register bo‘limida filter panel Ko‘rsatkichlar reestri tepasida ko‘rinadi.
  // Sxema va hisobot shakllarida esa faqat o‘sha blokning o‘zi chiqadi.
  if (filterCard) {
    filterCard.style.display = validTarget === "indexlarRegisterPanel" ? "" : "none";
  }

  if (mainGrid) mainGrid.style.display = "none";

  Object.entries(panels).forEach(([id, panel]) => {
    if (!panel) return;
    panel.style.display = id === validTarget ? "block" : "none";
  });

  if (bottomGrid) {
    bottomGrid.style.display = validTarget === "indexlarRegisterPanel" ? "none" : "block";
  }

  if (typeof section.scrollTo === "function") {
    section.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    section.scrollTop = 0;
  }
}

function setActiveMenu(activeMenu) {
  const els = refreshAppEls();

  [
    els.menuDashboard,
    els.menuProjects,
    els.menuProjectNewTask,
    els.menuProjectReceived,
    els.menuProjectSent,
    els.menuStructure,
    els.menuStructureCommittee,
    els.menuStructureYsti,
    els.menuStructureDepartments,
    els.menuStructureInspections,
    els.menuTadat,
    els.menuTadatMain,
    els.menuBReady,
    els.menuIndexlar,
    els.menuIndexRegister,
    els.menuIndexWorkflow,
    els.menuIndexReports,
    els.menuIndicators,
    els.menuSettings
  ].forEach(menu => {
    if (menu) {
      menu.classList.remove("active");
    }
  });

  if (activeMenu) {
    activeMenu.classList.add("active");
  }

  const isProjectsContext = activeMenu === els.menuProjects
    || activeMenu === els.menuProjectNewTask
    || activeMenu === els.menuProjectReceived
    || activeMenu === els.menuProjectSent;

  if (isProjectsContext && activeMenu !== els.menuProjects && els.menuProjects) {
    els.menuProjects.classList.add("active");
  }

  const isStructureContext = activeMenu === els.menuStructure
    || activeMenu === els.menuStructureCommittee
    || activeMenu === els.menuStructureYsti
    || activeMenu === els.menuStructureDepartments
    || activeMenu === els.menuStructureInspections;

  if (isStructureContext && activeMenu !== els.menuStructure && els.menuStructure) {
    els.menuStructure.classList.add("active");
  }

  const isTadatContext = activeMenu === els.menuTadat
    || activeMenu === els.menuTadatMain
    || activeMenu === els.menuBReady;

  if (isTadatContext && activeMenu !== els.menuTadat && els.menuTadat) {
    els.menuTadat.classList.add("active");
  }

  const isIndexlarContext = activeMenu === els.menuIndexlar
    || activeMenu === els.menuIndexRegister
    || activeMenu === els.menuIndexWorkflow
    || activeMenu === els.menuIndexReports;

  if (isIndexlarContext && activeMenu !== els.menuIndexlar && els.menuIndexlar) {
    els.menuIndexlar.classList.add("active");
  }

  setProjectsSubmenuOpen(isProjectsContext);
  setStructureSubmenuOpen(isStructureContext);
  setTadatSubmenuOpen(isTadatContext);
  setIndexlarSubmenuOpen(isIndexlarContext);
}

function updateCalendarSize() {
  if (typeof AppState !== "undefined" && AppState.calendar) {
    setTimeout(() => {
      AppState.calendar.updateSize();
    }, 100);
  }
}

function showSection(sectionName, options = {}) {
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
    const target = options.target || "received";
    const activeProjectMenu = getProjectMenuByTarget(target);
    const projectTitle = getProjectTitleByTarget(target);

    setActiveMenu(activeProjectMenu);
    setActiveProjectsSubmenu(activeProjectMenu);
    setPageTitle("Projects", projectTitle);

    showElement(els.projectsSection, "flex");

    if (typeof renderProjectsSection === "function") {
      renderProjectsSection();
    }

    if (target === "newTask" && typeof openProjectModal === "function") {
      setTimeout(() => openProjectModal(), 80);
    }

    return;
  }

  if (sectionName === "structure") {
    const target = options.target || "committee";
    const activeStructureMenu = getStructureMenuByTarget(target);
    const structureTitle = getStructureTitleByTarget(target);

    setActiveMenu(activeStructureMenu);
    setActiveStructureSubmenu(activeStructureMenu);
    setPageTitle("Struktura", structureTitle);

    showElement(els.structureSection, "block");

    if (typeof renderStructureSection === "function") {
      renderStructureSection(target);
    }

    return;
  }

  if (sectionName === "tadat") {
    const target = options.target || "tadatMain";

    if (target === "bready") {
      setActiveMenu(els.menuBReady || els.menuTadat);
      setActiveTadatSubmenu(els.menuBReady);
      setPageTitle("B-READY", "Business Ready baholash moduli");

      showElement(els.breadySection, "block");

      if (typeof renderBReadySection === "function") {
        renderBReadySection();
      }

      return;
    }

    setActiveMenu(els.menuTadatMain || els.menuTadat);
    setActiveTadatSubmenu(els.menuTadatMain);
    setPageTitle("BAHOLASH", "TADAT — 35 ta indikator va A bahosi mezonlari");

    showElement(els.tadatSection, "block");

    if (typeof renderTadatSection === "function") {
      renderTadatSection();
    }

    return;
  }

  if (sectionName === "indexlar") {
    const targetMap = {
      indexlarRegisterPanel: els.menuIndexRegister,
      indexlarWorkflowPanel: els.menuIndexWorkflow,
      indexlarReportFormsPanel: els.menuIndexReports
    };

    setActiveMenu(options.targetId ? targetMap[options.targetId] || els.menuIndexlar : els.menuIndexlar);
    setIndexlarSubmenuOpen(true);
    setPageTitle("Indexlar", "Mijozga yo‘naltirilganlik indeksi va hisob-kitob");

    showElement(els.indexlarSection, "block");

    if (typeof renderIndexlarSection === "function") {
      renderIndexlarSection();
    }

    setIndexlarContentView(options.targetId || null);

    return;
  }

  if (sectionName === "indicators") {
    setActiveMenu(els.menuIndicators);
    setPageTitle("Indikatorlar", "Strategik ko‘rsatkichlar va monitoring");

    showElement(els.indicatorsSection, "block");

    if (typeof renderIndicatorsSection === "function") {
      renderIndicatorsSection();
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

const SIDEBAR_ANIMATION_MS = 340;
let sidebarToggleLocked = false;
let sidebarToggleTimer = null;

function updateSidebarToggleIcon() {
  const els = refreshAppEls();

  if (!els.sidebarToggle) return;

  const isCollapsed = document.body.classList.contains("sidebar-collapsed");

  els.sidebarToggle.classList.toggle("is-collapsed", isCollapsed);

  els.sidebarToggle.setAttribute(
    "aria-label",
    isCollapsed ? "Sidebarni kengaytirish" : "Sidebarni qisqartirish"
  );

  els.sidebarToggle.setAttribute("aria-expanded", isCollapsed ? "false" : "true");

  els.sidebarToggle.title = isCollapsed
    ? "Sidebarni kengaytirish"
    : "Sidebarni qisqartirish";
}

function setSidebarCollapsed(isCollapsed, withAnimation = true) {
  document.body.classList.toggle("sidebar-collapsed", Boolean(isCollapsed));
  localStorage.setItem("sidebar_collapsed", isCollapsed ? "1" : "0");

  if (withAnimation) {
    document.body.classList.add("sidebar-animating");

    clearTimeout(sidebarToggleTimer);

    sidebarToggleTimer = setTimeout(() => {
      document.body.classList.remove("sidebar-animating");
      sidebarToggleLocked = false;
      updateCalendarSize();
    }, SIDEBAR_ANIMATION_MS + 60);
  }

  updateSidebarToggleIcon();
}

function initSidebarCollapse() {
  const els = refreshAppEls();

  if (!els.sidebarToggle || els.sidebarToggle.dataset.bound === "1") return;

  els.sidebarToggle.dataset.bound = "1";

  document.body.classList.add("sidebar-no-animate");

  const savedState = localStorage.getItem("sidebar_collapsed");
  setSidebarCollapsed(savedState === "1", false);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove("sidebar-no-animate");
    });
  });

  els.sidebarToggle.addEventListener("click", () => {
    if (sidebarToggleLocked) return;

    sidebarToggleLocked = true;

    const isCollapsed = document.body.classList.contains("sidebar-collapsed");

    setSidebarCollapsed(!isCollapsed, true);
  });
}

/* ================= EVENTS ================= */

function bindMenuEvents() {
  const els = refreshAppEls();

  if (els.menuDashboard) {
    els.menuDashboard.onclick = () => showSection("dashboard");
  }

  if (els.menuProjects) {
    els.menuProjects.onclick = () => {
      const isOpen = els.projectsSubmenu?.classList.contains("open");

      if (isOpen) {
        setProjectsSubmenuOpen(false);
        setActiveProjectsSubmenu(null);
        return;
      }

      showSection("projects", { target: "received" });
    };
  }

  [
    els.menuProjectNewTask,
    els.menuProjectReceived,
    els.menuProjectSent
  ].forEach(item => {
    if (!item) return;

    item.onclick = event => {
      event.stopPropagation();
      showSection("projects", { target: item.dataset.projectTarget });
    };
  });

  if (els.menuStructure) {
    els.menuStructure.onclick = () => {
      const isOpen = els.structureSubmenu?.classList.contains("open");

      if (isOpen) {
        setStructureSubmenuOpen(false);
        setActiveStructureSubmenu(null);
        return;
      }

      showSection("structure", { target: "committee" });
    };
  }

  [
    els.menuStructureCommittee,
    els.menuStructureYsti,
    els.menuStructureDepartments,
    els.menuStructureInspections
  ].forEach(item => {
    if (!item) return;

    item.onclick = event => {
      event.stopPropagation();
      showSection("structure", { target: item.dataset.structureTarget });
    };
  });

  if (els.menuTadat) {
    els.menuTadat.onclick = () => {
      const isOpen = els.tadatSubmenu?.classList.contains("open");

      if (isOpen) {
        setTadatSubmenuOpen(false);
        setActiveTadatSubmenu(null);
        return;
      }

      showSection("tadat", { target: "tadatMain" });
    };
  }

  if (els.menuTadatMain) {
    els.menuTadatMain.onclick = event => {
      event.stopPropagation();
      showSection("tadat", { target: "tadatMain" });
    };
  }

  if (els.menuBReady) {
    els.menuBReady.onclick = event => {
      event.stopPropagation();
      showSection("tadat", { target: "bready" });
    };
  }

  if (els.menuIndexlar) {
    els.menuIndexlar.onclick = () => {
      const isOpen = els.indexlarSubmenu?.classList.contains("open");

      if (isOpen) {
        setIndexlarSubmenuOpen(false);
        setActiveIndexlarSubmenu(null);
        return;
      }

      showSection("indexlar");
    };
  }

  [
    els.menuIndexRegister,
    els.menuIndexWorkflow,
    els.menuIndexReports
  ].forEach(item => {
    if (!item) return;

    item.onclick = event => {
      event.stopPropagation();
      showSection("indexlar", { targetId: item.dataset.indexTarget });
    };
  });

  if (els.menuIndicators) {
    els.menuIndicators.onclick = () => showSection("indicators");
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