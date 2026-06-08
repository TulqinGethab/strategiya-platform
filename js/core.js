const $ = id => document.getElementById(id);

const AppState = {
  projects: [],
  editIndex: null,
  editId: null,
  executors: [],
  calendar: null
};

const AppEls = {
  menuDashboard: $("menuDashboard"),
  menuProjects: $("menuProjects"),
  menuStructure: $("menuStructure"),
  menuTadat: $("menuTadat"),
  menuReports: $("menuReports"),
  menuSettings: $("menuSettings"),

  dashboardSection: $("dashboardSection"),
  projectsSection: $("projectsSection"),
  structureSection: $("structureSection"),
  tadatSection: $("tadatSection"),
  reportsSection: $("reportsSection"),
  settingsSection: $("settingsSection"),

  pageTitle: document.querySelector(".page-title"),
  pageBadge: $("pageBadge"),

  projectsEl: $("projects"),
  timelineEl: $("timeline"),
  searchInput: $("searchInput"),
  statusFilter: $("statusFilter"),

  totalCount: $("totalCount"),
  activeCount: $("activeCount"),
  completedCount: $("completedCount"),
  riskCount: $("riskCount"),
  projectBadge: $("projectBadge"),

  totalTrend: $("totalTrend"),
  activeTrend: $("activeTrend"),
  completedTrend: $("completedTrend"),
  riskTrend: $("riskTrend"),

  modal: $("modal"),
  modalTitle: $("modalTitle"),
  openModal: $("openModal"),

  // NEW PROJECT FORM FIELDS
  kirimNumber: $("kirimNumber"),
  kirimDate: $("kirimDate"),
  chiqimNumber: $("chiqimNumber"),
  chiqimDate: $("chiqimDate"),
  author: $("author"),

  eventName: $("eventName"),
  mechanism: $("mechanism"),
  form: $("form"),
  deadline: $("deadline"),
  status: $("status"),
  executorInput: $("executorInput"),
  executorList: $("executorList")
};

/* ================= HELPERS ================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showError(message) {
  alert(message || "Xatolik yuz berdi");
}

function setPageTitle(title, badgeText = "") {
  if (AppEls.pageTitle) {
    AppEls.pageTitle.innerText = title;
  }

  if (AppEls.pageBadge) {
    if (badgeText) {
      AppEls.pageBadge.innerText = badgeText;
      AppEls.pageBadge.style.display = "inline-flex";
    } else {
      AppEls.pageBadge.innerText = "";
      AppEls.pageBadge.style.display = "none";
    }
  }
}

function overdue(dateValue) {
  if (!dateValue) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const d = new Date(dateValue);
  d.setHours(0, 0, 0, 0);

  return d < today;
}

function getDeadlineText(dateValue) {
  if (!dateValue) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const d = new Date(dateValue);
  d.setHours(0, 0, 0, 0);

  const diff = Math.ceil((d - today) / 86400000);

  if (diff > 0) return `⏳ ${diff} kun qoldi`;
  if (diff === 0) return "⏳ Bugun";

  return `⛔ Kechikdi (${Math.abs(diff)} kun)`;
}

function getProgressByStatus(projectStatus) {
  if (projectStatus === "completed") return 100;
  if (projectStatus === "risk") return 30;
  return 50;
}