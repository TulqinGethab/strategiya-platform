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

let workspaceActiveDocumentType = "task";

const WORKSPACE_ZOOM_LEVELS = [50, 75, 90, 100, 110, 125, 150, 175, 200];


const WORKFLOW_STAGES = [
  {
    key: 1,
    title: "Birinchi ijro bo‘yicha hujjat yuklash",
    desc: "Ijrochi hujjatni tizimga yuklaydi va birlamchi ijro jarayonini boshlaydi."
  },
  {
    key: 2,
    title: "Kelishishga yuborildi",
    desc: "Topshiriq tegishli mas’ullar va bo‘limlar bilan kelishish bosqichida turibdi."
  },
  {
    key: 3,
    title: "Kotibiyatga yuborildi",
    desc: "Kelishilgan hujjat kotibiyatga yuborilgan va rasmiy ko‘rib chiqishga tayyor."
  },
  {
    key: 4,
    title: "Rahbariyat ko‘rib chiqmoqda",
    desc: "Hujjat rahbariyat tomonidan ko‘rib chiqilmoqda va yakuniy qaror kutilmoqda."
  },
  {
    key: 5,
    title: "Tasdiqlandi",
    desc: "Topshiriq bo‘yicha hujjat tasdiqlangan va jarayon muvaffaqiyatli yakunlangan."
  }
];

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
    taskStatus: document.getElementById("workspaceTaskStatus"),
    currentStageText: document.getElementById("workspaceCurrentStageText"),
    workflowSteps: document.getElementById("workspaceWorkflowSteps"),

    workflowExecutionModal: document.getElementById("workflowExecutionModal"),
    workflowExecutionModalClose: document.getElementById("workflowExecutionModalClose"),
    workflowExecutionModalCancel: document.getElementById("workflowExecutionModalCancel"),
    workflowExecutionModalSave: document.getElementById("workflowExecutionModalSave"),
    workflowSaveType: document.getElementById("workflowSaveType"),
    workflowExecutionFile: document.getElementById("workflowExecutionFile"),
    workflowResponsible: document.getElementById("workflowResponsible"),
    workflowExecutionNote: document.getElementById("workflowExecutionNote"),

    workflowAgreementModal: document.getElementById("workflowAgreementModal"),
    workflowAgreementModalClose: document.getElementById("workflowAgreementModalClose"),
    workflowAgreementModalCancel: document.getElementById("workflowAgreementModalCancel"),
    workflowAgreementModalSend: document.getElementById("workflowAgreementModalSend"),
    workflowAgreementEmployees: document.getElementById("workflowAgreementEmployees"),
    workflowAgreementNote: document.getElementById("workflowAgreementNote"),

    workflowSecretariatModal: document.getElementById("workflowSecretariatModal"),
    workflowSecretariatModalClose: document.getElementById("workflowSecretariatModalClose"),
    workflowSecretariatModalCancel: document.getElementById("workflowSecretariatModalCancel"),
    workflowSecretariatModalSend: document.getElementById("workflowSecretariatModalSend"),
    workflowSecretariatEmployees: document.getElementById("workflowSecretariatEmployees"),
    workflowSecretariatNote: document.getElementById("workflowSecretariatNote"),

    taskCardBtn: document.getElementById("workspaceTaskCardBtn"),
    taskCardModal: document.getElementById("workspaceTaskCardModal"),
    taskCardModalClose: document.getElementById("workspaceTaskCardModalClose"),
    taskCardModalCancel: document.getElementById("workspaceTaskCardModalCancel"),
    taskCardModalTaskText: document.getElementById("taskCardModalTaskText"),
    taskCardModalSender: document.getElementById("taskCardModalSender"),
    taskCardModalLeadership: document.getElementById("taskCardModalLeadership"),
    taskCardModalStage: document.getElementById("taskCardModalStage"),
    taskCardModalFileStatus: document.getElementById("taskCardModalFileStatus"),
    taskCardModalSummary: document.getElementById("taskCardModalSummary"),
    taskCardModalFileIcon: document.getElementById("taskCardModalFileIcon"),
    taskCardModalFileName: document.getElementById("taskCardModalFileName"),
    taskCardModalFileMeta: document.getElementById("taskCardModalFileMeta"),

    taskDocBtn: document.getElementById("workspaceTaskDocBtn"),
    executionDocBtn: document.getElementById("workspaceExecutionDocBtn"),
    sender: document.getElementById("workspaceSender"),
    leadershipTask: document.getElementById("workspaceLeadershipTask"),
    taskSummary: document.getElementById("workspaceTaskSummary"),
    taskFileCard: document.getElementById("workspaceTaskFileCard"),
    taskFileIcon: document.getElementById("workspaceTaskFileIcon"),
    taskFileName: document.getElementById("workspaceTaskFileName"),
    taskFileMeta: document.getElementById("workspaceTaskFileMeta"),
    taskFileActions: document.getElementById("workspaceTaskFileActions"),
    taskFileViewBtn: document.getElementById("workspaceTaskFileViewBtn"),
    taskFileDownloadBtn: document.getElementById("workspaceTaskFileDownloadBtn"),
    taskEmptyNote: document.getElementById("workspaceTaskEmptyNote"),

    pdfTitle: document.getElementById("workspacePdfTitle"),
    pdfAddress: document.getElementById("workspacePdfAddress"),
    pdfActions: document.getElementById("workspacePdfActions"),
    pdfOpenBtn: document.getElementById("workspacePdfOpenBtn"),
    pdfDownloadBtn: document.getElementById("workspacePdfDownloadBtn"),
    pdfRefreshBtn: document.getElementById("workspacePdfRefreshBtn"),
    pdfFrame: document.getElementById("workspacePdfFrame"),
    imagePreview: document.getElementById("workspaceImagePreview"),
    pdfEmpty: document.getElementById("workspacePdfEmpty"),
    pdfDesk: document.getElementById("workspacePdfDesk"),

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


function getProjectTaskSender(project) {
  return (
    project?.taskSender ||
    project?.task_sender ||
    project?.author ||
    "Tanlanmagan"
  );
}

function getProjectLeadershipTask(project) {
  return (
    project?.leadershipTask ||
    project?.leadership_task ||
    project?.manager ||
    project?.mechanism ||
    "Tanlanmagan"
  );
}

function getProjectTaskSummary(project) {
  return (
    project?.taskSummary ||
    project?.task_summary ||
    project?.name ||
    project?.eventName ||
    project?.event_name ||
    "Mazmun kiritilmagan"
  );
}

function getProjectTaskFile(project) {
  return project?.taskFile || project?.task_file || null;
}

function formatWorkspaceFileSize(bytes) {
  const size = Number(bytes) || 0;

  if (!size) return "";

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getWorkspaceFileIconClass(file = null) {
  const name = String(file?.name || "").toLowerCase();
  const type = String(file?.type || "").toLowerCase();

  if (type.includes("pdf") || name.endsWith(".pdf")) return "ri-file-pdf-2-line";
  if (type.includes("word") || name.endsWith(".doc") || name.endsWith(".docx")) return "ri-file-word-2-line";
  if (type.includes("excel") || type.includes("spreadsheet") || name.endsWith(".xls") || name.endsWith(".xlsx")) return "ri-file-excel-2-line";
  if (type.includes("image") || /\.(jpg|jpeg|png|gif|webp)$/i.test(name)) return "ri-image-line";
  if (name.endsWith(".zip") || name.endsWith(".rar") || name.endsWith(".7z")) return "ri-file-zip-line";

  return "ri-file-3-line";
}

function downloadWorkspaceTaskFile(file = null) {
  const taskFile = file || getProjectTaskFile(selectedProjectForWorkspace);

  if (!taskFile || !taskFile.data) {
    alert("Yuklangan fayl topilmadi");
    return;
  }

  const link = document.createElement("a");
  link.href = taskFile.data;
  link.download = taskFile.name || "topshiriq-fayli";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function viewWorkspaceTaskFile(file = null) {
  const taskFile = file || getProjectTaskFile(selectedProjectForWorkspace);

  if (!taskFile || !taskFile.data) {
    alert("Yuklangan fayl topilmadi");
    return;
  }

  const win = window.open("", "_blank");

  if (!win) {
    downloadWorkspaceTaskFile(taskFile);
    return;
  }

  win.document.write(`
    <!DOCTYPE html>
    <html lang="uz">
    <head>
      <meta charset="UTF-8">
      <title>${escapeHTML(taskFile.name || "Topshiriq fayli")}</title>
      <style>
        html,body{margin:0;width:100%;height:100%;background:#0f172a;font-family:Arial,sans-serif;}
        .top{height:54px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;background:#fff;color:#0f172a;font-weight:800;}
        .top a{padding:10px 14px;border-radius:12px;background:#2563eb;color:#fff;text-decoration:none;}
        iframe{width:100%;height:calc(100% - 54px);border:0;background:#fff;}
      </style>
    </head>
    <body>
      <div class="top">
        <span>${escapeHTML(taskFile.name || "Topshiriq fayli")}</span>
        <a href="${taskFile.data}" download="${escapeHTML(taskFile.name || "topshiriq-fayli")}">Yuklab olish</a>
      </div>
      <iframe src="${taskFile.data}"></iframe>
    </body>
    </html>
  `);
  win.document.close();
}


function isWorkspacePdfFile(file = null) {
  const name = String(file?.name || file?.originalName || "").toLowerCase();
  const type = String(file?.type || "").toLowerCase();

  return type.includes("pdf") || name.endsWith(".pdf");
}

function isWorkspaceImageFile(file = null) {
  const name = String(file?.name || file?.originalName || "").toLowerCase();
  const type = String(file?.type || "").toLowerCase();

  return type.includes("image") || /\.(jpg|jpeg|png|gif|webp)$/i.test(name);
}

function getWorkspaceFileUrl(file = null) {
  return file?.url || file?.data || file?.fileUrl || file?.file_url || "";
}

function getWorkspacePdfEmbedUrl(url = "") {
  const cleanUrl = String(url || "").trim();

  if (!cleanUrl || cleanUrl.startsWith("data:")) {
    return cleanUrl;
  }

  return cleanUrl.includes("#")
    ? cleanUrl
    : `${cleanUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`;
}



function getSavedWorkflowExecutionDocument(project) {
  if (typeof getSavedWorkflowExecution === "function") {
    return getSavedWorkflowExecution(project);
  }

  try {
    const raw = localStorage.getItem(`strategiya_workflow_step1_${project?.id || "new"}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function normalizeWorkspaceExecutionFile(project) {
  const saved = getSavedWorkflowExecutionDocument(project);

  if (!saved || !saved.fileData) {
    return null;
  }

  return {
    name: saved.fileName || "Ijro hujjati",
    originalName: saved.fileName || "Ijro hujjati",
    type: saved.fileType || "application/pdf",
    size: Number(saved.fileSize || 0),
    data: saved.fileData,
    url: saved.fileData,
    uploadedAt: saved.savedAt || ""
  };
}

function getWorkspaceVisibleFile(project) {
  if (workspaceActiveDocumentType === "execution") {
    return normalizeWorkspaceExecutionFile(project);
  }

  return getProjectTaskFile(project);
}

function updateWorkspaceDocumentButtons(project) {
  const els = getProjectWorkspaceEls();
  const executionFile = normalizeWorkspaceExecutionFile(project);

  if (els.taskDocBtn) {
    els.taskDocBtn.classList.toggle("is-active", workspaceActiveDocumentType === "task");
    els.taskDocBtn.disabled = false;

    if (els.taskDocBtn.dataset.bound !== "1") {
      els.taskDocBtn.dataset.bound = "1";
      els.taskDocBtn.onclick = () => {
        workspaceActiveDocumentType = "task";
        renderWorkspacePdfPreview(selectedProjectForWorkspace);
      };
    }
  }

  if (els.executionDocBtn) {
    els.executionDocBtn.classList.toggle("is-active", workspaceActiveDocumentType === "execution");
    els.executionDocBtn.classList.toggle("is-disabled", !executionFile);
    els.executionDocBtn.disabled = !executionFile;

    if (els.executionDocBtn.dataset.bound !== "1") {
      els.executionDocBtn.dataset.bound = "1";
      els.executionDocBtn.onclick = () => {
        workspaceActiveDocumentType = "execution";
        renderWorkspacePdfPreview(selectedProjectForWorkspace);
      };
    }
  }
}

function clearWorkspacePdfPreview(message = "PDF fayl biriktirilmagan") {
  const els = getProjectWorkspaceEls();

  if (els.pdfTitle) els.pdfTitle.textContent = message;
  if (els.pdfAddress) els.pdfAddress.textContent = "localhost:3000 / topshiriq fayli";
  if (els.pdfFrame) {
    els.pdfFrame.style.display = "none";
    els.pdfFrame.removeAttribute("src");
  }
  if (els.imagePreview) {
    els.imagePreview.style.display = "none";
    els.imagePreview.removeAttribute("src");
  }
  if (els.pdfEmpty) els.pdfEmpty.style.display = "flex";
  if (els.pdfActions) els.pdfActions.style.display = "none";
  if (els.pdfDesk) els.pdfDesk.classList.add("is-empty");
}

function renderWorkspacePdfPreview(project) {
  const els = getProjectWorkspaceEls();
  bindWorkspaceTaskCardModalEvents();
  updateWorkspaceDocumentButtons(project);
  const file = getWorkspaceVisibleFile(project);
  const url = getWorkspaceFileUrl(file);

  if (!els.pdfFrame && !els.imagePreview && !els.pdfEmpty) return;

  if (!file || !url) {
    clearWorkspacePdfPreview(workspaceActiveDocumentType === "execution" ? "Ijro hujjati yuklanmagan" : "PDF fayl biriktirilmagan");
    return;
  }

  const fileName = file.name || file.originalName || "Topshiriq fayli";

  if (els.pdfTitle) els.pdfTitle.textContent = fileName;
  if (els.pdfAddress) els.pdfAddress.textContent = url.replace(/^https?:\/\//, "");
  if (els.pdfActions) els.pdfActions.style.display = "flex";
  if (els.pdfEmpty) els.pdfEmpty.style.display = "none";
  if (els.pdfDesk) els.pdfDesk.classList.remove("is-empty");

  if (isWorkspacePdfFile(file)) {
    if (els.imagePreview) {
      els.imagePreview.style.display = "none";
      els.imagePreview.removeAttribute("src");
    }
    if (els.pdfFrame) {
      els.pdfFrame.style.display = "block";
      els.pdfFrame.src = getWorkspacePdfEmbedUrl(url);
    }
  } else if (isWorkspaceImageFile(file)) {
    if (els.pdfFrame) {
      els.pdfFrame.style.display = "none";
      els.pdfFrame.removeAttribute("src");
    }
    if (els.imagePreview) {
      els.imagePreview.style.display = "block";
      els.imagePreview.src = url;
    }
  } else {
    if (els.pdfFrame) {
      els.pdfFrame.style.display = "none";
      els.pdfFrame.removeAttribute("src");
    }
    if (els.imagePreview) {
      els.imagePreview.style.display = "none";
      els.imagePreview.removeAttribute("src");
    }
    if (els.pdfEmpty) {
      els.pdfEmpty.style.display = "flex";
      els.pdfEmpty.innerHTML = `
        <div class="pdf-empty-icon"><i class="${getWorkspaceFileIconClass(file)}"></i></div>
        <h3>Bu fayl brauzerda PDF sifatida ochilmaydi</h3>
        <p>${escapeHTML(fileName)} faylini ko‘rish uchun “Yangi oynada” yoki “Yuklab olish” tugmasidan foydalaning.</p>
      `;
    }
  }

  if (els.pdfOpenBtn && els.pdfOpenBtn.dataset.bound !== "1") {
    els.pdfOpenBtn.dataset.bound = "1";
    els.pdfOpenBtn.onclick = () => viewWorkspaceTaskFile();
  }

  if (els.pdfDownloadBtn && els.pdfDownloadBtn.dataset.bound !== "1") {
    els.pdfDownloadBtn.dataset.bound = "1";
    els.pdfDownloadBtn.onclick = () => downloadWorkspaceTaskFile();
  }

  if (els.pdfRefreshBtn && els.pdfRefreshBtn.dataset.bound !== "1") {
    els.pdfRefreshBtn.dataset.bound = "1";
    els.pdfRefreshBtn.onclick = () => renderWorkspacePdfPreview(selectedProjectForWorkspace);
  }
}

function setWorkspacePdfViewMode() {
  const els = getProjectWorkspaceEls();

  if (!els.workspaceView) return;

  els.workspaceView.classList.remove("panel-center");
  els.workspaceView.classList.add("editor-open");
  els.workspaceView.classList.add("pdf-preview-open");

  if (els.workspaceBody) {
    els.workspaceBody.classList.remove("editor-full-mode");
  }
}


function getProjectWorkflowStage(project) {
  const savedSecretariatForStage = typeof getSavedWorkflowSecretariat === "function" ? getSavedWorkflowSecretariat(project) : null;
  if (savedSecretariatForStage?.sentAt) return 4;

  const savedAgreementForStage = typeof getSavedWorkflowAgreement === "function" ? getSavedWorkflowAgreement(project) : null;
  if (savedAgreementForStage?.sentAt) return 3;

  const savedExecutionForStage = typeof getSavedWorkflowExecution === "function" ? getSavedWorkflowExecution(project) : null;
  if (savedExecutionForStage?.fileName) return 2;

  const raw = String(
    project?.workflowStage ||
    project?.workflow_stage ||
    project?.currentStage ||
    project?.current_stage ||
    project?.status ||
    ""
  ).trim().toLowerCase();

  const numeric = Number(raw);
  if (Number.isFinite(numeric) && numeric >= 1 && numeric <= 5) {
    return numeric;
  }

  if (!raw) return 1;
  if (raw.includes("tasdiq") || raw.includes("approved") || raw.includes("completed")) return 5;
  if (raw.includes("rahbar") || raw.includes("ko‘rib") || raw.includes("korib") || raw.includes("review")) return 4;
  if (raw.includes("kotib")) return 3;
  if (raw.includes("kelish")) return 2;
  if (raw.includes("ijro") || raw.includes("upload") || raw.includes("active")) return 1;
  return 1;
}


function getWorkflowExecutionStorageKey(project) {
  return `strategiya_workflow_step1_${project?.id || "new"}`;
}

function getSavedWorkflowExecution(project) {
  try {
    const raw = localStorage.getItem(getWorkflowExecutionStorageKey(project));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function openWorkflowExecutionModal() {
  const els = getProjectWorkspaceEls();
  if (!els.workflowExecutionModal) return;

  const saved = getSavedWorkflowExecution(selectedProjectForWorkspace);

  if (els.workflowSaveType) els.workflowSaveType.value = saved?.saveType || "ijro_hujjati";
  if (els.workflowResponsible) els.workflowResponsible.value = saved?.responsible || "";
  if (els.workflowExecutionNote) els.workflowExecutionNote.value = saved?.note || "";
  if (els.workflowExecutionFile) els.workflowExecutionFile.value = "";

  els.workflowExecutionModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeWorkflowExecutionModal() {
  const els = getProjectWorkspaceEls();

  if (els.workflowExecutionModal) {
    els.workflowExecutionModal.style.display = "none";
  }

  document.body.style.overflow = "";
}


function readWorkflowFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Fayl o‘qilmadi"));
    reader.readAsDataURL(file);
  });
}

async function saveWorkflowExecutionModal() {
  const els = getProjectWorkspaceEls();
  const file = els.workflowExecutionFile?.files?.[0] || null;

  const fileData = file ? await readWorkflowFileAsDataUrl(file) : "";

  const payload = {
    projectId: selectedProjectForWorkspace?.id || null,
    saveType: els.workflowSaveType?.value || "ijro_hujjati",
    fileName: file?.name || "",
    fileSize: file?.size || 0,
    fileType: file?.type || "",
    fileData,
    responsible: els.workflowResponsible?.value || "",
    note: els.workflowExecutionNote?.value || "",
    savedAt: new Date().toISOString()
  };

  if (!payload.responsible) {
    alert("Bajaruvchi mas’ulni tanlang");
    return;
  }

  if (!payload.fileName) {
    alert("Ijro faylini tanlang");
    return;
  }

  try {
    localStorage.setItem(
      getWorkflowExecutionStorageKey(selectedProjectForWorkspace),
      JSON.stringify(payload)
    );
  } catch {}

  if (selectedProjectForWorkspace) {
    selectedProjectForWorkspace.workflowStage = 2;
    selectedProjectForWorkspace.currentStage = 2;
  }

  workspaceActiveDocumentType = "execution";
  renderWorkspaceWorkflow(selectedProjectForWorkspace);
  renderWorkspacePdfPreview(selectedProjectForWorkspace);
  closeWorkflowExecutionModal();
}

function bindWorkflowExecutionModalEvents() {
  const els = getProjectWorkspaceEls();

  if (els.workflowExecutionModalClose && els.workflowExecutionModalClose.dataset.bound !== "1") {
    els.workflowExecutionModalClose.dataset.bound = "1";
    els.workflowExecutionModalClose.onclick = closeWorkflowExecutionModal;
  }

  if (els.workflowExecutionModalCancel && els.workflowExecutionModalCancel.dataset.bound !== "1") {
    els.workflowExecutionModalCancel.dataset.bound = "1";
    els.workflowExecutionModalCancel.onclick = closeWorkflowExecutionModal;
  }

  if (els.workflowExecutionModalSave && els.workflowExecutionModalSave.dataset.bound !== "1") {
    els.workflowExecutionModalSave.dataset.bound = "1";
    els.workflowExecutionModalSave.onclick = saveWorkflowExecutionModal;
  }

  if (els.workflowExecutionModal && els.workflowExecutionModal.dataset.bound !== "1") {
    els.workflowExecutionModal.dataset.bound = "1";
    els.workflowExecutionModal.addEventListener("click", event => {
      if (event.target === els.workflowExecutionModal) {
        closeWorkflowExecutionModal();
      }
    });
  }
}


function getWorkflowAgreementStorageKey(project) {
  return `strategiya_workflow_step2_${project?.id || "new"}`;
}

function getSavedWorkflowAgreement(project) {
  try {
    const raw = localStorage.getItem(getWorkflowAgreementStorageKey(project));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getSelectedAgreementEmployees() {
  const els = getProjectWorkspaceEls();

  if (!els.workflowAgreementEmployees) return [];

  return Array.from(els.workflowAgreementEmployees.querySelectorAll("input[type='checkbox']:checked"))
    .map(input => input.value)
    .filter(Boolean);
}

function setSelectedAgreementEmployees(values = []) {
  const els = getProjectWorkspaceEls();
  const selected = new Set(values);

  if (!els.workflowAgreementEmployees) return;

  els.workflowAgreementEmployees.querySelectorAll("input[type='checkbox']").forEach(input => {
    input.checked = selected.has(input.value);
  });
}

function openWorkflowAgreementModal() {
  const els = getProjectWorkspaceEls();
  if (!els.workflowAgreementModal) return;

  const saved = getSavedWorkflowAgreement(selectedProjectForWorkspace);
  setSelectedAgreementEmployees(saved?.employees || []);

  if (els.workflowAgreementNote) {
    els.workflowAgreementNote.value = saved?.note || "";
  }

  els.workflowAgreementModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeWorkflowAgreementModal() {
  const els = getProjectWorkspaceEls();

  if (els.workflowAgreementModal) {
    els.workflowAgreementModal.style.display = "none";
  }

  document.body.style.overflow = "";
}

function sendWorkflowAgreementModal() {
  const els = getProjectWorkspaceEls();
  const employees = getSelectedAgreementEmployees();

  if (!employees.length) {
    alert("Kelishishga yuboriladigan xodimlarni tanlang");
    return;
  }

  const payload = {
    projectId: selectedProjectForWorkspace?.id || null,
    employees,
    note: els.workflowAgreementNote?.value || "",
    sentAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(
      getWorkflowAgreementStorageKey(selectedProjectForWorkspace),
      JSON.stringify(payload)
    );
  } catch {}

  if (selectedProjectForWorkspace) {
    selectedProjectForWorkspace.workflowStage = 3;
    selectedProjectForWorkspace.currentStage = 3;
  }

  renderWorkspaceWorkflow(selectedProjectForWorkspace);
  closeWorkflowAgreementModal();

  alert("Hujjat tanlangan xodimlarga kelishish uchun yuborildi");
}

function bindWorkflowAgreementModalEvents() {
  const els = getProjectWorkspaceEls();

  if (els.workflowAgreementModalClose && els.workflowAgreementModalClose.dataset.bound !== "1") {
    els.workflowAgreementModalClose.dataset.bound = "1";
    els.workflowAgreementModalClose.onclick = closeWorkflowAgreementModal;
  }

  if (els.workflowAgreementModalCancel && els.workflowAgreementModalCancel.dataset.bound !== "1") {
    els.workflowAgreementModalCancel.dataset.bound = "1";
    els.workflowAgreementModalCancel.onclick = closeWorkflowAgreementModal;
  }

  if (els.workflowAgreementModalSend && els.workflowAgreementModalSend.dataset.bound !== "1") {
    els.workflowAgreementModalSend.dataset.bound = "1";
    els.workflowAgreementModalSend.onclick = sendWorkflowAgreementModal;
  }

  if (els.workflowAgreementModal && els.workflowAgreementModal.dataset.bound !== "1") {
    els.workflowAgreementModal.dataset.bound = "1";
    els.workflowAgreementModal.addEventListener("click", event => {
      if (event.target === els.workflowAgreementModal) {
        closeWorkflowAgreementModal();
      }
    });
  }
}


function getWorkflowSecretariatStorageKey(project) {
  return `strategiya_workflow_step3_${project?.id || "new"}`;
}

function getSavedWorkflowSecretariat(project) {
  try {
    const raw = localStorage.getItem(getWorkflowSecretariatStorageKey(project));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getSelectedSecretariatEmployee() {
  const els = getProjectWorkspaceEls();

  if (!els.workflowSecretariatEmployees) return "";

  const selected = els.workflowSecretariatEmployees.querySelector("input[name='workflowSecretary']:checked");
  return selected?.value || "";
}

function setSelectedSecretariatEmployee(value = "") {
  const els = getProjectWorkspaceEls();

  if (!els.workflowSecretariatEmployees) return;

  els.workflowSecretariatEmployees.querySelectorAll("input[name='workflowSecretary']").forEach(input => {
    input.checked = input.value === value;
  });
}

function openWorkflowSecretariatModal() {
  const els = getProjectWorkspaceEls();
  if (!els.workflowSecretariatModal) return;

  const saved = getSavedWorkflowSecretariat(selectedProjectForWorkspace);

  setSelectedSecretariatEmployee(saved?.secretary || "");

  if (els.workflowSecretariatNote) {
    els.workflowSecretariatNote.value = saved?.note || "";
  }

  els.workflowSecretariatModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeWorkflowSecretariatModal() {
  const els = getProjectWorkspaceEls();

  if (els.workflowSecretariatModal) {
    els.workflowSecretariatModal.style.display = "none";
  }

  document.body.style.overflow = "";
}

function sendWorkflowSecretariatModal() {
  const els = getProjectWorkspaceEls();
  const secretary = getSelectedSecretariatEmployee();

  if (!secretary) {
    alert("Rahbar kotibini tanlang");
    return;
  }

  const payload = {
    projectId: selectedProjectForWorkspace?.id || null,
    secretary,
    note: els.workflowSecretariatNote?.value || "",
    sentAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(
      getWorkflowSecretariatStorageKey(selectedProjectForWorkspace),
      JSON.stringify(payload)
    );
  } catch {}

  if (selectedProjectForWorkspace) {
    selectedProjectForWorkspace.workflowStage = 4;
    selectedProjectForWorkspace.currentStage = 4;
  }

  renderWorkspaceWorkflow(selectedProjectForWorkspace);
  closeWorkflowSecretariatModal();

  alert(`Hujjat ${secretary}ga kotibiyat orqali yuborildi`);
}

function bindWorkflowSecretariatModalEvents() {
  const els = getProjectWorkspaceEls();

  if (els.workflowSecretariatModalClose && els.workflowSecretariatModalClose.dataset.bound !== "1") {
    els.workflowSecretariatModalClose.dataset.bound = "1";
    els.workflowSecretariatModalClose.onclick = closeWorkflowSecretariatModal;
  }

  if (els.workflowSecretariatModalCancel && els.workflowSecretariatModalCancel.dataset.bound !== "1") {
    els.workflowSecretariatModalCancel.dataset.bound = "1";
    els.workflowSecretariatModalCancel.onclick = closeWorkflowSecretariatModal;
  }

  if (els.workflowSecretariatModalSend && els.workflowSecretariatModalSend.dataset.bound !== "1") {
    els.workflowSecretariatModalSend.dataset.bound = "1";
    els.workflowSecretariatModalSend.onclick = sendWorkflowSecretariatModal;
  }

  if (els.workflowSecretariatModal && els.workflowSecretariatModal.dataset.bound !== "1") {
    els.workflowSecretariatModal.dataset.bound = "1";
    els.workflowSecretariatModal.addEventListener("click", event => {
      if (event.target === els.workflowSecretariatModal) {
        closeWorkflowSecretariatModal();
      }
    });
  }
}


function getWorkflowStageTitle(stageNumber) {
  const stage = WORKFLOW_STAGES.find(item => item.key === Number(stageNumber));
  return stage ? stage.title : `${stageNumber || 1}-bosqich`;
}

function renderWorkspaceTaskCardModal(project) {
  const els = getProjectWorkspaceEls();
  const file = getProjectTaskFile(project);
  const stageNumber = getProjectWorkflowStage(project);

  if (els.taskCardModalTaskText) {
    els.taskCardModalTaskText.textContent = getProjectTaskSummary(project);
  }

  if (els.taskCardModalSender) {
    els.taskCardModalSender.textContent = getProjectTaskSender(project);
  }

  if (els.taskCardModalLeadership) {
    els.taskCardModalLeadership.textContent = getProjectLeadershipTask(project);
  }

  if (els.taskCardModalStage) {
    els.taskCardModalStage.textContent = `${stageNumber}-bosqich — ${getWorkflowStageTitle(stageNumber)}`;
  }

  if (els.taskCardModalSummary) {
    els.taskCardModalSummary.textContent = getProjectTaskSummary(project);
  }

  if (file && (file.data || file.url)) {
    if (els.taskCardModalFileStatus) {
      els.taskCardModalFileStatus.textContent = "Hujjat biriktirilgan";
    }

    if (els.taskCardModalFileName) {
      els.taskCardModalFileName.textContent = file.name || file.originalName || "Topshiriq hujjati";
    }

    if (els.taskCardModalFileMeta) {
      els.taskCardModalFileMeta.textContent = [
        formatWorkspaceFileSize(file.size),
        file.type || "file"
      ].filter(Boolean).join(" • ");
    }

    if (els.taskCardModalFileIcon) {
      els.taskCardModalFileIcon.innerHTML = `<i class="${getWorkspaceFileIconClass(file)}"></i>`;
    }
  } else {
    if (els.taskCardModalFileStatus) {
      els.taskCardModalFileStatus.textContent = "Fayl yuklanmagan";
    }

    if (els.taskCardModalFileName) {
      els.taskCardModalFileName.textContent = "Fayl yuklanmagan";
    }

    if (els.taskCardModalFileMeta) {
      els.taskCardModalFileMeta.textContent = "Topshiriqqa asosiy hujjat biriktirilmagan";
    }

    if (els.taskCardModalFileIcon) {
      els.taskCardModalFileIcon.innerHTML = `<i class="ri-file-warning-line"></i>`;
    }
  }
}

function openWorkspaceTaskCardModal() {
  const els = getProjectWorkspaceEls();
  if (!els.taskCardModal) return;

  renderWorkspaceTaskCardModal(selectedProjectForWorkspace);

  els.taskCardModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeWorkspaceTaskCardModal() {
  const els = getProjectWorkspaceEls();

  if (els.taskCardModal) {
    els.taskCardModal.style.display = "none";
  }

  document.body.style.overflow = "";
}

function bindWorkspaceTaskCardModalEvents() {
  const els = getProjectWorkspaceEls();

  if (els.taskCardBtn && els.taskCardBtn.dataset.bound !== "1") {
    els.taskCardBtn.dataset.bound = "1";
    els.taskCardBtn.onclick = openWorkspaceTaskCardModal;
  }

  if (els.taskCardModalClose && els.taskCardModalClose.dataset.bound !== "1") {
    els.taskCardModalClose.dataset.bound = "1";
    els.taskCardModalClose.onclick = closeWorkspaceTaskCardModal;
  }

  if (els.taskCardModalCancel && els.taskCardModalCancel.dataset.bound !== "1") {
    els.taskCardModalCancel.dataset.bound = "1";
    els.taskCardModalCancel.onclick = closeWorkspaceTaskCardModal;
  }

  if (els.taskCardModal && els.taskCardModal.dataset.bound !== "1") {
    els.taskCardModal.dataset.bound = "1";
    els.taskCardModal.addEventListener("click", event => {
      if (event.target === els.taskCardModal) {
        closeWorkspaceTaskCardModal();
      }
    });
  }
}

function renderWorkspaceWorkflow(project) {
  const els = getProjectWorkspaceEls();
  if (!els.workflowSteps) return;

  const activeStage = getProjectWorkflowStage(project);
  const current = WORKFLOW_STAGES.find(stage => stage.key === activeStage) || WORKFLOW_STAGES[0];

  if (els.currentStageText) {
    els.currentStageText.textContent = current.title;
  }

  if (els.taskStatus) {
    els.taskStatus.textContent = `Jarayon ${activeStage}-bosqichda`;
  }

  els.workflowSteps.innerHTML = WORKFLOW_STAGES.map(stage => {
    const stateClass = stage.key < activeStage
      ? "is-completed"
      : stage.key === activeStage
        ? "is-active"
        : "is-upcoming";

    const badgeText = stage.key < activeStage
      ? "Bajarilgan"
      : stage.key === activeStage
        ? "Joriy bosqich"
        : "Kutilmoqda";

    const circleInner = stage.key < activeStage
      ? '<i class="ri-check-line"></i>'
      : String(stage.key);

    return `
      <div class="workflow-step ${stateClass} ${stage.key === 1 || stage.key === 2 || stage.key === 3 ? "is-clickable" : ""}" data-workflow-stage="${stage.key}">
        <div class="workflow-step-marker-wrap">
          <div class="workflow-step-circle">${circleInner}</div>
          <div class="workflow-step-line"></div>
        </div>

        <div class="workflow-step-content">
          <span class="workflow-step-badge">${badgeText}</span>
          <h4 class="workflow-step-title">${stage.title}</h4>
          <p class="workflow-step-desc">${stage.desc}</p>
        </div>
      </div>
    `;
  }).join("");

  bindWorkflowExecutionModalEvents();

  bindWorkflowAgreementModalEvents();

  const firstStep = els.workflowSteps.querySelector('[data-workflow-stage="1"]');
  if (firstStep) {
    firstStep.onclick = openWorkflowExecutionModal;
  }

  const secondStep = els.workflowSteps.querySelector('[data-workflow-stage="2"]');
  if (secondStep) {
    secondStep.onclick = openWorkflowAgreementModal;
  }

  bindWorkflowSecretariatModalEvents();

  const thirdStep = els.workflowSteps.querySelector('[data-workflow-stage="3"]');
  if (thirdStep) {
    thirdStep.onclick = openWorkflowSecretariatModal;
  }
}

function renderWorkspaceTaskFile(project) {
  const els = getProjectWorkspaceEls();
  const file = getProjectTaskFile(project);

  if (!els.taskFileName || !els.taskFileMeta) return;

  if (!file || !file.data) {
    els.taskFileName.textContent = "Fayl yuklanmagan";
    els.taskFileMeta.textContent = "Modal orqali topshiriq faylini yuklang";

    if (els.taskFileActions) els.taskFileActions.style.display = "none";
    if (els.taskEmptyNote) els.taskEmptyNote.style.display = "flex";
    if (els.taskFileIcon) els.taskFileIcon.innerHTML = `<i class="ri-file-warning-line"></i>`;
    if (els.taskFileCard) els.taskFileCard.classList.add("is-empty");

    return;
  }

  els.taskFileName.textContent = file.name || "Topshiriq fayli";
  els.taskFileMeta.textContent = [
    formatWorkspaceFileSize(file.size),
    file.type || "file"
  ].filter(Boolean).join(" • ");

  if (els.taskFileActions) els.taskFileActions.style.display = "flex";
  if (els.taskEmptyNote) els.taskEmptyNote.style.display = "none";
  if (els.taskFileIcon) els.taskFileIcon.innerHTML = `<i class="${getWorkspaceFileIconClass(file)}"></i>`;
  if (els.taskFileCard) els.taskFileCard.classList.remove("is-empty");

  if (els.taskFileViewBtn && els.taskFileViewBtn.dataset.bound !== "1") {
    els.taskFileViewBtn.dataset.bound = "1";
    els.taskFileViewBtn.onclick = () => viewWorkspaceTaskFile();
  }

  if (els.taskFileDownloadBtn && els.taskFileDownloadBtn.dataset.bound !== "1") {
    els.taskFileDownloadBtn.dataset.bound = "1";
    els.taskFileDownloadBtn.onclick = () => downloadWorkspaceTaskFile();
  }
}

function fillProjectWorkspaceInfo(project) {
  const els = getProjectWorkspaceEls();

  if (els.taskText) {
    els.taskText.textContent = getProjectTaskSummary(project);
  }

  if (els.taskStatus) {
    els.taskStatus.textContent = getProjectStatus(project) || "Ko‘rish rejimi";
  }

  if (els.sender) {
    els.sender.textContent = getProjectTaskSender(project);
  }

  if (els.leadershipTask) {
    els.leadershipTask.textContent = getProjectLeadershipTask(project);
  }

  if (els.taskSummary) {
    els.taskSummary.textContent = getProjectTaskSummary(project);
  }

  workspaceActiveDocumentType = "task";
  renderWorkspaceWorkflow(project);
  renderWorkspaceTaskFile(project);
  renderWorkspacePdfPreview(project);
  bindWorkspaceTaskCardModalEvents();
  renderWorkspaceTaskCardModal(project);

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
    <h1>${escapeHTML(getProjectTaskSummary(project))}</h1>

    <p><strong>Topshiriqni yuborgan tashkilot:</strong> ${escapeHTML(getProjectTaskSender(project))}</p>
    <p><strong>Rahbariyat topshirig‘i:</strong> ${escapeHTML(getProjectLeadershipTask(project))}</p>

    <p><strong>Topshiriqning qisqacha mazmuni:</strong></p>
    <p>${escapeHTML(getProjectTaskSummary(project))}</p>
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
  els.workspaceView.classList.remove("pdf-preview-open");

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
  els.workspaceView.classList.remove("pdf-preview-open");

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

  setWorkspacePdfViewMode();
  resetWorkspaceVariantSelection();

  fillProjectWorkspaceInfo(project);
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

window.downloadWorkspaceTaskFile = downloadWorkspaceTaskFile;
window.viewWorkspaceTaskFile = viewWorkspaceTaskFile;
window.openProjectWorkspace = openProjectWorkspace;
window.closeProjectWorkspace = closeProjectWorkspace;
window.initProjectWorkspace = initProjectWorkspace;
window.openWorkspaceEditorSide = openWorkspaceEditorSide;
window.closeWorkspaceEditorSide = closeWorkspaceEditorSide;
window.selectWorkspaceVariant = selectWorkspaceVariant;