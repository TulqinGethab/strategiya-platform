const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { pool } = require('../config/db');
const { getColumns } = require('../utils/schema');

const router = express.Router();

const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads', 'projects');
fs.mkdirSync(uploadDir, { recursive: true });

const allowedExtensions = new Set([
  '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.txt', '.zip', '.rar', '.7z'
]);


function decodeFilename(name) {
  const raw = String(name || '');
  if (!raw) return '';

  try {
    const decoded = Buffer.from(raw, 'latin1').toString('utf8');
    if (decoded && decoded.includes('�') === false) {
      return decoded;
    }
  } catch {}

  return raw;
}


const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const decodedOriginalName = decodeFilename(file.originalname || 'file');
    const ext = path.extname(decodedOriginalName).toLowerCase();
    const safeBase = path.basename(decodedOriginalName || 'file', ext)
      .replace(/[^a-zA-Z0-9_-]+/g, '-')
      .slice(0, 80);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeBase}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: Number(process.env.MAX_FILE_MB || 50) * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const decodedOriginalName = decodeFilename(file.originalname || 'file');
    const ext = path.extname(decodedOriginalName).toLowerCase();
    if (!allowedExtensions.has(ext)) {
      return cb(new Error('Bu fayl turi ruxsat etilmagan'));
    }
    cb(null, true);
  }
});

function getBaseUrl(req) {
  return `${req.protocol}://${req.get('host')}`;
}

function normalizeTaskFile(req, fileRow) {
  if (!fileRow) return null;

  return {
    id: fileRow.id,
    name: fileRow.original_name,
    originalName: fileRow.original_name,
    type: fileRow.file_type || 'application/octet-stream',
    size: Number(fileRow.file_size || 0),
    data: `${getBaseUrl(req)}/${fileRow.file_path.replace(/\\/g, '/')}`,
    url: `${getBaseUrl(req)}/${fileRow.file_path.replace(/\\/g, '/')}`,
    uploadedAt: fileRow.uploaded_at
  };
}

function normalizeProject(req, row, fileRow = null) {
  const taskSender = row.task_sender || row.author || row.doc_name || '';
  const leadershipTask = row.leadership_task || row.mechanism || '';
  const taskSummary = row.task_summary || row.event_name || row.doc_name || 'Nomsiz topshiriq';
  const taskFile = normalizeTaskFile(req, fileRow);

  return {
    id: row.id,

    kirimNumber: row.kirim_number || row.incoming_number || row.doc_number || '',
    kirimDate: row.kirim_date || row.incoming_date || row.doc_date || '',

    chiqimNumber: row.chiqim_number || row.outgoing_number || '',
    chiqimDate: row.chiqim_date || row.outgoing_date || '',

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
    form: row.implementation_form || '',
    implementationForm: row.implementation_form || '',
    implementation_form: row.implementation_form || '',

    docNumber: row.doc_number || row.kirim_number || '',
    doc_number: row.doc_number || row.kirim_number || '',
    docName: row.doc_name || taskSender || '',
    doc_name: row.doc_name || taskSender || '',
    docDate: row.doc_date || row.kirim_date || '',
    doc_date: row.doc_date || row.kirim_date || '',

    deadline: row.deadline || '',
    executors: row.executors || '',
    status: row.status || 'active',

    createdAt: row.created_at || '',
    updatedAt: row.updated_at || '',
    created_at: row.created_at || '',
    updated_at: row.updated_at || ''
  };
}

async function getFilesByProjectIds(req, ids) {
  if (!ids.length) return new Map();

  const placeholders = ids.map(() => '?').join(',');
  const [rows] = await pool.query(
    `SELECT * FROM project_files WHERE project_id IN (${placeholders}) ORDER BY id DESC`,
    ids
  );

  const map = new Map();
  rows.forEach(row => {
    if (!map.has(Number(row.project_id))) {
      map.set(Number(row.project_id), row);
    }
  });

  return map;
}

function pickBodyValue(body, ...keys) {
  for (const key of keys) {
    if (body[key] !== undefined && body[key] !== null && body[key] !== '') {
      return body[key];
    }
  }
  return '';
}

async function buildProjectPayload(body) {
  const columns = await getColumns('projects');
  const data = {};

  const taskSender = pickBodyValue(body, 'task_sender', 'taskSender', 'author', 'docName', 'doc_name');
  const leadershipTask = pickBodyValue(body, 'leadership_task', 'leadershipTask', 'mechanism', 'manager');
  const taskSummary = pickBodyValue(body, 'task_summary', 'taskSummary', 'eventName', 'event_name', 'name');

  const candidates = {
    task_sender: taskSender,
    leadership_task: leadershipTask,
    task_summary: taskSummary,
    author: taskSender,
    doc_name: taskSender,
    event_name: taskSummary,
    mechanism: leadershipTask,
    implementation_form: pickBodyValue(body, 'implementation_form', 'implementationForm', 'form'),
    kirim_number: pickBodyValue(body, 'kirim_number', 'kirimNumber', 'incomingNumber', 'incoming_number', 'docNumber', 'doc_number'),
    kirim_date: pickBodyValue(body, 'kirim_date', 'kirimDate', 'incomingDate', 'incoming_date', 'docDate', 'doc_date') || null,
    chiqim_number: pickBodyValue(body, 'chiqim_number', 'chiqimNumber', 'outgoingNumber', 'outgoing_number'),
    chiqim_date: pickBodyValue(body, 'chiqim_date', 'chiqimDate', 'outgoingDate', 'outgoing_date') || null,
    doc_number: pickBodyValue(body, 'doc_number', 'docNumber', 'kirimNumber', 'kirim_number'),
    doc_date: pickBodyValue(body, 'doc_date', 'docDate', 'kirimDate', 'kirim_date') || null,
    deadline: pickBodyValue(body, 'deadline') || null,
    executors: pickBodyValue(body, 'executors'),
    status: pickBodyValue(body, 'status') || 'active'
  };

  Object.entries(candidates).forEach(([key, value]) => {
    if (columns.includes(key)) {
      data[key] = value === '' ? null : value;
    }
  });

  return data;
}

async function insertProject(data) {
  const keys = Object.keys(data);
  const placeholders = keys.map(() => '?').join(',');
  const sql = `INSERT INTO projects (${keys.map(key => `\`${key}\``).join(',')}) VALUES (${placeholders})`;
  const [result] = await pool.query(sql, keys.map(key => data[key]));
  return result.insertId;
}

async function updateProjectRow(id, data) {
  const keys = Object.keys(data);
  if (!keys.length) return;

  const assignments = keys.map(key => `\`${key}\` = ?`).join(', ');
  await pool.query(
    `UPDATE projects SET ${assignments} WHERE id = ?`,
    [...keys.map(key => data[key]), id]
  );
}

async function saveUploadedFile(projectId, file) {
  if (!file) return;

  await pool.query(
    `INSERT INTO project_files
      (project_id, original_name, stored_name, file_path, file_type, file_size)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      projectId,
      decodeFilename(file.originalname),
      file.filename,
      `uploads/projects/${file.filename}`,
      file.mimetype || 'application/octet-stream',
      file.size || 0
    ]
  );
}

async function removeProjectFiles(projectId) {
  const [rows] = await pool.query('SELECT * FROM project_files WHERE project_id = ?', [projectId]);

  for (const file of rows) {
    const abs = path.join(process.cwd(), file.file_path || '');
    if (fs.existsSync(abs)) {
      try { fs.unlinkSync(abs); } catch {}
    }
  }

  await pool.query('DELETE FROM project_files WHERE project_id = ?', [projectId]);
}

router.get('/', async (req, res, next) => {
  try {
    const [projects] = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    const ids = projects.map(row => Number(row.id));
    const fileMap = await getFilesByProjectIds(req, ids);

    res.json(projects.map(row => normalizeProject(req, row, fileMap.get(Number(row.id)))));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Project topilmadi' });

    const fileMap = await getFilesByProjectIds(req, [Number(req.params.id)]);
    res.json(normalizeProject(req, rows[0], fileMap.get(Number(req.params.id))));
  } catch (error) {
    next(error);
  }
});

router.post('/', upload.single('taskFile'), async (req, res, next) => {
  try {
    const data = await buildProjectPayload(req.body || {});
    const id = await insertProject(data);

    if (req.file) {
      await saveUploadedFile(id, req.file);
    }

    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    const fileMap = await getFilesByProjectIds(req, [Number(id)]);

    res.status(201).json(normalizeProject(req, rows[0], fileMap.get(Number(id))));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', upload.single('taskFile'), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = await buildProjectPayload(req.body || {});

    await updateProjectRow(id, data);

    if (req.file) {
      await removeProjectFiles(id);
      await saveUploadedFile(id, req.file);
    }

    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ message: 'Project topilmadi' });

    const fileMap = await getFilesByProjectIds(req, [id]);
    res.json(normalizeProject(req, rows[0], fileMap.get(id)));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await removeProjectFiles(id);
    await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
