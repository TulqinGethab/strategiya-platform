let projectCurrentPage = 1;
let projectPageSize = 10;
let projectFilteredCount = 0;

/* =========================================================
   PROJECTS SECTION — TABLE MODE + WORKSPACE OPEN
========================================================= */
/* =========================================================
   PROJECTS TOP STATS
========================================================= */

function setProjectsKpiText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function getProjectsKpiPercent(count, total) {
  if (!total) return 0;
  return Math.round((count / total) * 100);
}

function isProjectCompletedStatus(status) {
  const value = String(status || "").toLowerCase();
  return value === "completed" || value === "done" || value === "bajarilgan";
}

function isProjectRiskStatus(status) {
  const value = String(status || "").toLowerCase();
  return value === "risk" || value === "late" || value === "kechikkan" || value === "xavf";
}

function isProjectActiveStatus(status) {
  const value = String(status || "").toLowerCase();
  return value === "active" || value === "process" || value === "jarayonda" || (!isProjectCompletedStatus(value) && !isProjectRiskStatus(value));
}

function isProjectDeadlineOverdue(project) {
  if (!project || !project.deadline || isProjectCompletedStatus(project.status)) return false;

  const deadline = new Date(project.deadline);
  if (Number.isNaN(deadline.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  return deadline < today;
}

function renderProjectsTopStats() {
  const projects = Array.isArray(AppState?.projects)
    ? AppState.projects.map(normalizeProject)
    : [];

  const total = projects.length;
  const completed = projects.filter(project => isProjectCompletedStatus(project.status)).length;
  const risk = projects.filter(project => isProjectRiskStatus(project.status) || isProjectDeadlineOverdue(project)).length;
  const active = projects.filter(project => isProjectActiveStatus(project.status) && !isProjectDeadlineOverdue(project)).length;

  setProjectsKpiText("projectsTotalKpi", total);
  setProjectsKpiText("projectsActiveKpi", active);
  setProjectsKpiText("projectsCompletedKpi", completed);
  setProjectsKpiText("projectsRiskKpi", risk);

  setProjectsKpiText("projectsTotalTrend", `↗ ${total ? 100 : 0}%`);
  setProjectsKpiText("projectsActiveTrend", `↗ ${getProjectsKpiPercent(active, total)}%`);
  setProjectsKpiText("projectsCompletedTrend", `↗ ${getProjectsKpiPercent(completed, total)}%`);
  setProjectsKpiText("projectsRiskTrend", `↗ ${getProjectsKpiPercent(risk, total)}%`);
}



function getStatusLabel(status) {
  if (status === "completed") return "Completed";
  if (status === "risk") return "Risk";
  return "Active";
}

function getProjectIcon(status) {
  if (status === "completed") return "ri-checkbox-circle-line";
  if (status === "risk") return "ri-error-warning-line";
  return "ri-folder-3-line";
}

function getProjectIconClass(status) {
  if (status === "completed") return "completed";
  if (status === "risk") return "risk";
  return "active";
}

function normalizeProject(project = {}) {
  const taskSender =
    project.taskSender ||
    project.task_sender ||
    project.author ||
    project.muallif ||
    project.docName ||
    project.doc_name ||
    "";

  const leadershipTask =
    project.leadershipTask ||
    project.leadership_task ||
    project.manager ||
    project.mechanism ||
    "";

  const taskSummary =
    project.taskSummary ||
    project.task_summary ||
    project.name ||
    project.eventName ||
    project.event_name ||
    "";

  return {
    id: project.id,

    kirimNumber: project.kirimNumber || project.kirim_number || project.docNumber || project.doc_number || "",
    kirimDate: project.kirimDate || project.kirim_date || project.docDate || project.doc_date || "",

    chiqimNumber: project.chiqimNumber || project.chiqim_number || project.outNumber || project.out_number || "",
    chiqimDate: project.chiqimDate || project.chiqim_date || project.outDate || project.out_date || "",

    author: taskSender,

    name: taskSummary,
    manager: leadershipTask,
    form: project.form || project.implementation_form || "",

    taskSender: taskSender,
    leadershipTask: leadershipTask,
    taskSummary: taskSummary,
    taskFile: project.taskFile || project.task_file || null,

    deadline: project.deadline || "",

    executors: Array.isArray(project.executors)
      ? project.executors
      : parseExecutors(project.executors),

    status: project.status || "active"
  };
}

function parseExecutors(value) {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return String(value)
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);
  }
}

/* =========================================================
   MODAL
========================================================= */

function getEmptyProjectFileText() {
  return "PDF, Word, Excel, JPG, JPEG, PNG va boshqa fayllar";
}

function formatProjectFileSize(bytes) {
  const size = Number(bytes) || 0;

  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function updateProjectFileUI(file = null) {
  if (AppEls.taskFileName) {
    AppEls.taskFileName.textContent = file?.name || "Fayl tanlanmagan";
  }

  if (AppEls.taskFileSize) {
    AppEls.taskFileSize.textContent = file
      ? `${formatProjectFileSize(file.size)} • ${file.type || "file"}`
      : getEmptyProjectFileText();
  }

  if (AppEls.clearTaskFileBtn) {
    AppEls.clearTaskFileBtn.style.display = file ? "inline-flex" : "none";
  }
}

function clearProjectFile() {
  AppState.projectUploadedFile = null;

  if (AppEls.taskFileInput) {
    AppEls.taskFileInput.value = "";
  }

  updateProjectFileUI(null);
}

function handleProjectFileUpload(event) {
  const file = event?.target?.files?.[0];

  if (!file) {
    clearProjectFile();
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    AppState.projectUploadedFile = {
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      data: reader.result,
      uploadedAt: new Date().toISOString()
    };

    updateProjectFileUI(AppState.projectUploadedFile);
  };

  reader.onerror = () => {
    alert("Faylni o‘qishda xatolik yuz berdi");
    clearProjectFile();
  };

  reader.readAsDataURL(file);
}

function downloadProjectFile(file) {
  if (!file || !file.data) {
    alert("Fayl biriktirilmagan");
    return;
  }

  const link = document.createElement("a");
  link.href = file.data;
  link.download = file.name || "topshiriq-fayli";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadProjectFileById(id) {
  const project = (AppState.projects || [])
    .map(normalizeProject)
    .find(item => String(item.id) === String(id));

  downloadProjectFile(project?.taskFile || null);
}

function openProjectModal() {
  AppState.editIndex = null;
  AppState.editId = null;
  AppState.executors = [];
  AppState.projectUploadedFile = null;

  if (AppEls.modalTitle) {
    AppEls.modalTitle.innerText = "Yangi topshiriq";
  }

  [
    AppEls.taskSender,
    AppEls.leadershipTask,
    AppEls.taskSummary
  ].forEach(input => {
    if (input) input.value = "";
  });

  if (AppEls.taskFileInput) {
    AppEls.taskFileInput.value = "";
  }

  updateProjectFileUI(null);

  if (AppEls.modal) {
    AppEls.modal.classList.add("show");
  }
}

function closeModal() {
  if (AppEls.modal) {
    AppEls.modal.classList.remove("show");
  }
}

/* =========================================================
   SAVE PROJECT
========================================================= */

async function saveProject() {
  try {
    const taskSender = AppEls.taskSender?.value?.trim() || "";
    const leadershipTask = AppEls.leadershipTask?.value?.trim() || "";
    const taskSummary = AppEls.taskSummary?.value?.trim() || "";

    if (!taskSender) {
      alert("Topshiriqni yuborgan vazirlik, idora yoki tashkilotni tanlang");
      AppEls.taskSender?.focus();
      return;
    }

    if (!leadershipTask) {
      alert("Rahbariyat tomonidan berilgan topshiriq turini tanlang");
      AppEls.leadershipTask?.focus();
      return;
    }

    if (!taskSummary) {
      alert("Topshiriqning qisqacha mazmunini kiriting");
      AppEls.taskSummary?.focus();
      return;
    }

    const data = {
      taskSender,
      task_sender: taskSender,
      leadershipTask,
      leadership_task: leadershipTask,
      taskSummary,
      task_summary: taskSummary,
      taskFile: AppState.projectUploadedFile || null,
      task_file: AppState.projectUploadedFile || null,

      /* Eski kodlar bilan moslik */
      author: taskSender,
      name: taskSummary,
      eventName: taskSummary,
      manager: leadershipTask,
      mechanism: leadershipTask,
      form: "",
      implementationForm: "",
      deadline: null,
      executors: [],
      status: "active",
      docName: taskSender
    };

    if (AppState.editId === null) {
      await createProject(data);
    } else {
      await updateProject(AppState.editId, data);
    }

    closeModal();

    await init();

    showSection("projects");

  } catch (err) {
    console.error("SAVE PROJECT ERROR:", err);
    showError(err.message);
  }
}

/* =========================================================
   RENDER TABLE
========================================================= */

function renderProjectsSection() {
  if (!AppEls.projectsEl) return;

  renderProjectsTopStats();

  const searchText = AppEls.searchInput
    ? AppEls.searchInput.value.toLowerCase()
    : "";

  const selectedStatus = AppEls.statusFilter
    ? AppEls.statusFilter.value
    : "all";

  AppEls.projectsEl.innerHTML = "";

  const filteredProjects = AppState.projects
    .map((rawProject, realIndex) => ({
      ...normalizeProject(rawProject),
      realIndex
    }))
    .filter(project => {
      const text = `
        ${project.id || ""}
        ${project.taskSender || ""}
        ${project.leadershipTask || ""}
        ${project.taskSummary || ""}
        ${project.taskFile?.name || ""}
        ${project.status || ""}
      `.toLowerCase();

      return text.includes(searchText) &&
        (selectedStatus === "all" || project.status === selectedStatus);
    });

  projectFilteredCount = filteredProjects.length;

  const totalPages = Math.max(1, Math.ceil(projectFilteredCount / projectPageSize));

  if (projectCurrentPage > totalPages) {
    projectCurrentPage = totalPages;
  }

  const startIndex = (projectCurrentPage - 1) * projectPageSize;
  const endIndex = startIndex + projectPageSize;
  const pageProjects = filteredProjects.slice(startIndex, endIndex);

  updateProjectsPagination(totalPages);

  if (pageProjects.length === 0) {
    AppEls.projectsEl.innerHTML = `
      <tr class="projects-empty-row">
        <td colspan="7">
          <div class="projects-empty">
            <i class="ri-folder-open-line"></i>
            <strong>Project topilmadi</strong>
            <span>Yangi project qo‘shing yoki filterlarni o‘zgartiring.</span>
          </div>
        </td>
      </tr>
    `;

    if (typeof initProjectWorkspace === "function") {
      initProjectWorkspace();
    }

    return;
  }

  pageProjects.forEach(project => {
    AppEls.projectsEl.innerHTML += `
      <tr class="project-table-row" onclick="openProjectWorkspace(${project.id})">
        <td>
          <span class="project-icon ${getProjectIconClass(project.status)}">
            <i class="${getProjectIcon(project.status)}"></i>
          </span>
        </td>

        <td>
          #${escapeHTML(project.id || "-")}
        </td>

        <td>
          <div class="table-text">
            ${escapeHTML(project.taskSender || "-")}
          </div>
        </td>

        <td>
          <div class="table-text">
            ${escapeHTML(project.leadershipTask || "-")}
          </div>
        </td>

        <td>
          <div class="table-title">
            ${escapeHTML(project.taskSummary || "-")}
          </div>
        </td>

        <td>
          ${project.taskFile && project.taskFile.data ? `
            <button
              type="button"
              class="project-file-download"
              onclick="event.stopPropagation(); downloadProjectFileById(${project.id})"
              title="Faylni yuklab olish"
            >
              <i class="ri-download-2-line"></i>
            </button>
          ` : `<span class="executor-chip empty">Fayl yo‘q</span>`}
        </td>

        <td>
          <div class="table-actions">

            <button
              type="button"
              class="edit"
              onclick="event.stopPropagation(); editProject(${project.realIndex})"
              title="Edit"
            >
              <i class="ri-edit-line"></i>
            </button>

            <button
              type="button"
              class="delete"
              onclick="event.stopPropagation(); deleteProject(${project.realIndex})"
              title="Delete"
            >
              <i class="ri-delete-bin-6-line"></i>
            </button>

          </div>
        </td>
      </tr>
    `;
  });

  if (typeof initProjectWorkspace === "function") {
    initProjectWorkspace();
  }
}

/* =========================================================
   PAGINATION
========================================================= */

function updateProjectsPagination(totalPages) {
  const pageSizeEl = document.getElementById("projectPageSize");
  const pageSelectEl = document.getElementById("projectPageSelect");
  const pageInfoEl = document.getElementById("projectPageInfo");
  const prevBtn = document.getElementById("projectPrevPage");
  const nextBtn = document.getElementById("projectNextPage");

  if (!pageSizeEl || !pageSelectEl || !pageInfoEl || !prevBtn || !nextBtn) return;

  pageSizeEl.value = String(projectPageSize);

  pageSelectEl.innerHTML = "";

  const limitedPages = Math.min(totalPages, 100);

  for (let i = 1; i <= limitedPages; i++) {
    pageSelectEl.innerHTML += `
      <option value="${i}" ${i === projectCurrentPage ? "selected" : ""}>
        ${i}
      </option>
    `;
  }

  pageInfoEl.innerText = `/ ${totalPages}`;

  prevBtn.disabled = projectCurrentPage <= 1;
  nextBtn.disabled = projectCurrentPage >= totalPages;
}

function bindProjectsPaginationEvents() {
  const pageSizeEl = document.getElementById("projectPageSize");
  const pageSelectEl = document.getElementById("projectPageSelect");
  const prevBtn = document.getElementById("projectPrevPage");
  const nextBtn = document.getElementById("projectNextPage");

  if (!pageSizeEl || !pageSelectEl || !prevBtn || !nextBtn) return;

  pageSizeEl.onchange = () => {
    projectPageSize = Number(pageSizeEl.value || 10);
    projectCurrentPage = 1;
    renderProjectsSection();
  };

  pageSelectEl.onchange = () => {
    projectCurrentPage = Number(pageSelectEl.value || 1);
    renderProjectsSection();
  };

  prevBtn.onclick = () => {
    if (projectCurrentPage > 1) {
      projectCurrentPage--;
      renderProjectsSection();
    }
  };

  nextBtn.onclick = () => {
    const totalPages = Math.max(1, Math.ceil(projectFilteredCount / projectPageSize));

    if (projectCurrentPage < totalPages) {
      projectCurrentPage++;
      renderProjectsSection();
    }
  };
}

/* =========================================================
   EDIT / DELETE
========================================================= */

function editProject(index) {
  const rawProject = AppState.projects[index];

  if (!rawProject) {
    alert("Project topilmadi");
    return;
  }

  const project = normalizeProject(rawProject);

  AppState.editIndex = index;
  AppState.editId = project.id;

  if (AppEls.modalTitle) {
    AppEls.modalTitle.innerText = "Edit Project";
  }

  if (AppEls.taskSender) AppEls.taskSender.value = project.taskSender || "";
  if (AppEls.leadershipTask) AppEls.leadershipTask.value = project.leadershipTask || "";
  if (AppEls.taskSummary) AppEls.taskSummary.value = project.taskSummary || "";

  AppState.projectUploadedFile = project.taskFile || null;

  if (AppEls.taskFileInput) {
    AppEls.taskFileInput.value = "";
  }

  updateProjectFileUI(AppState.projectUploadedFile);

  if (AppEls.modal) {
    AppEls.modal.classList.add("show");
  }
}

async function deleteProject(index) {
  try {
    const project = AppState.projects[index];

    if (!project) {
      alert("Project topilmadi");
      return;
    }

    if (!confirm("Project o‘chirilsinmi?")) return;

    await removeProject(project.id);

    await init();

    showSection("projects");

  } catch (err) {
    console.error("DELETE PROJECT ERROR:", err);
    showError(err.message);
  }
}