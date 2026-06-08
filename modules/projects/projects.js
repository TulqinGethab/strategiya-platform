let projectCurrentPage = 1;
let projectPageSize = 10;
let projectFilteredCount = 0;

/* =========================================================
   PROJECTS SECTION — TABLE MODE + WORKSPACE OPEN
========================================================= */

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
  return {
    id: project.id,

    kirimNumber: project.kirimNumber || project.kirim_number || project.docNumber || project.doc_number || "",
    kirimDate: project.kirimDate || project.kirim_date || project.docDate || project.doc_date || "",

    chiqimNumber: project.chiqimNumber || project.chiqim_number || project.outNumber || project.out_number || "",
    chiqimDate: project.chiqimDate || project.chiqim_date || project.outDate || project.out_date || "",

    author: project.author || project.muallif || project.docName || project.doc_name || "",

    name: project.name || project.eventName || project.event_name || "",
    manager: project.manager || project.mechanism || "",
    form: project.form || project.implementation_form || "",

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

function openProjectModal() {
  AppState.editIndex = null;
  AppState.editId = null;
  AppState.executors = [];

  renderExecutors();

  AppEls.modalTitle.innerText = "New Project";

  [
    AppEls.kirimNumber,
    AppEls.kirimDate,
    AppEls.chiqimNumber,
    AppEls.chiqimDate,
    AppEls.author,
    AppEls.eventName,
    AppEls.mechanism,
    AppEls.form,
    AppEls.deadline
  ].forEach(input => {
    if (input) input.value = "";
  });

  if (AppEls.status) {
    AppEls.status.value = "active";
  }

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
   EXECUTORS
========================================================= */

function addExecutor() {
  const value = AppEls.executorInput.value.trim();

  if (!value) return;

  AppState.executors.push(value);
  AppEls.executorInput.value = "";

  renderExecutors();
}

function removeExecutor(index) {
  AppState.executors.splice(index, 1);
  renderExecutors();
}

function renderExecutors() {
  if (!AppEls.executorList) return;

  AppEls.executorList.innerHTML = AppState.executors.map((executor, index) => `
    <div class="executor">
      <span>• ${escapeHTML(executor)}</span>
      <button type="button" onclick="removeExecutor(${index})">❌</button>
    </div>
  `).join("");
}

/* =========================================================
   SAVE PROJECT
========================================================= */

async function saveProject() {
  try {
    if (!AppEls.kirimNumber.value.trim()) {
      alert("Kirim raqamini kiriting");
      AppEls.kirimNumber.focus();
      return;
    }

    if (!AppEls.kirimDate.value) {
      alert("Kirim sanasini tanlang");
      AppEls.kirimDate.focus();
      return;
    }

    if (!AppEls.author.value.trim()) {
      alert("Muallifni kiriting");
      AppEls.author.focus();
      return;
    }

    if (!AppEls.eventName.value.trim()) {
      alert("Tadbir nomini kiriting");
      AppEls.eventName.focus();
      return;
    }

    if (!AppEls.deadline.value) {
      alert("Muddat sanasini tanlang");
      AppEls.deadline.focus();
      return;
    }

    const data = {
      kirimNumber: AppEls.kirimNumber.value.trim(),
      kirimDate: AppEls.kirimDate.value || null,

      chiqimNumber: AppEls.chiqimNumber.value.trim(),
      chiqimDate: AppEls.chiqimDate.value || null,

      author: AppEls.author.value.trim(),

      name: AppEls.eventName.value.trim(),
      manager: AppEls.mechanism.value.trim(),
      form: AppEls.form.value.trim(),

      deadline: AppEls.deadline.value,
      executors: [...AppState.executors],
      status: AppEls.status.value,

      /*
        Eski backend bilan vaqtincha moslik uchun.
        Backend yangilangandan keyin bularni olib tashlash mumkin.
      */
      docNumber: AppEls.kirimNumber.value.trim(),
      docDate: AppEls.kirimDate.value || null,
      docName: AppEls.author.value.trim()
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
        ${project.kirimNumber || ""}
        ${project.kirimDate || ""}
        ${project.chiqimNumber || ""}
        ${project.chiqimDate || ""}
        ${project.author || ""}
        ${project.name || ""}
        ${project.manager || ""}
        ${project.form || ""}
        ${(project.executors || []).join(" ")}
        ${project.deadline || ""}
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
        <td colspan="12">
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
    const isOverdue = overdue(project.deadline);
    const deadlineText = getDeadlineText(project.deadline);

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
          <div class="doc-info">
            <span class="doc-number">${escapeHTML(project.kirimNumber || "-")}</span>
            <span class="doc-date">${escapeHTML(project.kirimDate || "-")}</span>
          </div>
        </td>

        <td>
          <div class="doc-info">
            <span class="doc-number">${escapeHTML(project.chiqimNumber || "-")}</span>
            <span class="doc-date">${escapeHTML(project.chiqimDate || "-")}</span>
          </div>
        </td>

        <td>
          <div class="table-text">
            ${escapeHTML(project.author || "-")}
          </div>
        </td>

        <td>
          <div class="table-title">
            ${escapeHTML(project.name || "-")}
          </div>
        </td>

        <td>
          <div class="table-text">
            ${escapeHTML(project.manager || "-")}
          </div>
        </td>

        <td>
          <div class="table-text">
            ${escapeHTML(project.form || "-")}
          </div>
        </td>

        <td>
          <div class="executor-chips">
            ${
              project.executors && project.executors.length
                ? project.executors.map(executor => `
                    <span class="executor-chip">${escapeHTML(executor)}</span>
                  `).join("")
                : `<span class="executor-chip empty">Kiritilmagan</span>`
            }
          </div>
        </td>

        <td>
          <span class="deadline-cell ${isOverdue ? "overdue" : ""}">
            <i class="ri-time-line"></i>
            ${escapeHTML(deadlineText || "-")}
          </span>
        </td>

        <td>
          <span class="status-badge status-${escapeHTML(project.status)}">
            ${getStatusLabel(project.status)}
          </span>
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

  AppEls.modalTitle.innerText = "Edit Project";

  AppEls.kirimNumber.value = project.kirimNumber || "";
  AppEls.kirimDate.value = project.kirimDate || "";

  AppEls.chiqimNumber.value = project.chiqimNumber || "";
  AppEls.chiqimDate.value = project.chiqimDate || "";

  AppEls.author.value = project.author || "";

  AppEls.eventName.value = project.name || "";
  AppEls.mechanism.value = project.manager || "";
  AppEls.form.value = project.form || "";

  AppEls.deadline.value = project.deadline || "";
  AppEls.status.value = project.status || "active";

  AppState.executors = [...(project.executors || [])];

  renderExecutors();

  AppEls.modal.classList.add("show");
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