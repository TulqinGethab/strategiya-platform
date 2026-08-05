/* =========================================================
   API.JS
   Node.js + MySQL backend bilan ishlash
========================================================= */

const API_ORIGIN =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "http://77.83.206.247/strategy-api";

const PROJECTS_API_URL = `${API_ORIGIN}/api/projects`;

function dataUrlToBlob(dataUrl) {
  if (!dataUrl || !String(dataUrl).startsWith('data:')) return null;

  const [meta, content] = String(dataUrl).split(',');
  const mimeMatch = meta.match(/data:(.*?);base64/);
  const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  const binary = atob(content || '');
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return new Blob([bytes], { type: mime });
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message = data?.message || data?.error || `Server xatolik berdi: ${response.status}`;
    throw new Error(message);
  }

  return data;
}

function buildProjectFormData(project = {}) {
  const formData = new FormData();

  const taskSender = project.taskSender || project.task_sender || project.author || project.docName || '';
  const leadershipTask = project.leadershipTask || project.leadership_task || project.manager || project.mechanism || '';
  const taskSummary = project.taskSummary || project.task_summary || project.name || project.eventName || '';

  formData.append('task_sender', taskSender);
  formData.append('leadership_task', leadershipTask);
  formData.append('task_summary', taskSummary);

  formData.append('author', taskSender);
  formData.append('doc_name', taskSender);
  formData.append('event_name', taskSummary);
  formData.append('mechanism', leadershipTask);
  formData.append('status', project.status || 'active');

  const taskFile = project.taskFile || project.task_file || null;

  // Faqat yangi tanlangan local fayl dataURL bo‘lsa serverga yuboriladi.
  // Eski server URL bo‘lsa, qayta upload qilinmaydi.
  if (taskFile && taskFile.data && String(taskFile.data).startsWith('data:')) {
    const blob = dataUrlToBlob(taskFile.data);
    if (blob) {
      formData.append('taskFile', blob, taskFile.name || 'topshiriq-fayli');
    }
  }

  return formData;
}

function mapApiProject(project = {}) {
  const taskSender = project.taskSender || project.task_sender || project.author || project.docName || project.doc_name || '';
  const leadershipTask = project.leadershipTask || project.leadership_task || project.manager || project.mechanism || '';
  const taskSummary = project.taskSummary || project.task_summary || project.name || project.eventName || project.event_name || '';
  const taskFile = project.taskFile || project.task_file || null;

  return {
    ...project,

    id: project.id,

    taskSender,
    task_sender: taskSender,
    leadershipTask,
    leadership_task: leadershipTask,
    taskSummary,
    task_summary: taskSummary,
    taskFile,
    task_file: taskFile,

    author: taskSender,
    name: taskSummary,
    eventName: taskSummary,
    event_name: taskSummary,
    manager: leadershipTask,
    mechanism: leadershipTask,

    incomingNumber: project.incomingNumber || project.incoming_number || project.kirimNumber || project.kirim_number || project.docNumber || project.doc_number || '',
    incomingDate: project.incomingDate || project.incoming_date || project.kirimDate || project.kirim_date || project.docDate || project.doc_date || '',

    outgoingNumber: project.outgoingNumber || project.outgoing_number || project.chiqimNumber || project.chiqim_number || '',
    outgoingDate: project.outgoingDate || project.outgoing_date || project.chiqimDate || project.chiqim_date || '',

    docName: project.docName || project.doc_name || taskSender,
    doc_name: project.docName || project.doc_name || taskSender,
    docNumber: project.docNumber || project.doc_number || project.kirimNumber || project.kirim_number || '',
    doc_number: project.docNumber || project.doc_number || project.kirimNumber || project.kirim_number || '',
    docDate: project.docDate || project.doc_date || project.kirimDate || project.kirim_date || '',
    doc_date: project.docDate || project.doc_date || project.kirimDate || project.kirim_date || '',

    status: project.status || 'active',
    createdAt: project.createdAt || project.created_at || '',
    updatedAt: project.updatedAt || project.updated_at || ''
  };
}

async function loadProjects() {
  const data = await requestJson(PROJECTS_API_URL);
  AppState.projects = (Array.isArray(data) ? data : []).map(mapApiProject);
  return AppState.projects;
}

async function createProject(data) {
  const created = await requestJson(PROJECTS_API_URL, {
    method: 'POST',
    body: buildProjectFormData(data)
  });

  return mapApiProject(created);
}

async function updateProject(id, data) {
  const updated = await requestJson(`${PROJECTS_API_URL}/${id}`, {
    method: 'PUT',
    body: buildProjectFormData(data)
  });

  return mapApiProject(updated);
}

async function removeProject(id) {
  await requestJson(`${PROJECTS_API_URL}/${id}`, {
    method: 'DELETE'
  });

  return true;
}

// Eski localStorage reset tugmalari ishlamasligi uchun bo‘sh funksiya qoldirildi
function resetStaticProjects() {
  console.warn('MySQL rejimida resetStaticProjects ishlatilmaydi.');
}
