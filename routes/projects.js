const express = require("express");
const router = express.Router();
const db = require("../config/db");

/* ================= HELPERS ================= */

function normalizeStatus(status) {
  const value = String(status || "").trim().toLowerCase();

  if (["active", "completed", "risk"].includes(value)) {
    return value;
  }

  return "active";
}

function emptyToNull(value) {
  const v = String(value || "").trim();
  return v === "" ? null : v;
}

function parseExecutors(value) {
  if (!value) return [];

  if (Array.isArray(value)) return value;

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

function mapProject(row) {
  return {
    id: row.id,

    /* Yangi kirim-chiqim maydonlari */
    kirimNumber: row.kirim_number || row.doc_number || "",
    kirimDate: row.kirim_date || row.doc_date || null,

    chiqimNumber: row.chiqim_number || "",
    chiqimDate: row.chiqim_date || null,

    author: row.author || "",

    /* Asosiy loyiha maydonlari */
    name: row.event_name || "",
    manager: row.mechanism || "",
    form: row.implementation_form || "",

    deadline: row.deadline || null,
    executors: parseExecutors(row.executors),
    status: row.status || "active",

    /* Eski frontend bilan moslik uchun */
    docNumber: row.doc_number || row.kirim_number || "",
    docName: row.doc_name || row.event_name || "",
    docDate: row.doc_date || row.kirim_date || null,

    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function validateProject(body) {
  const errors = [];

  if (!String(body.kirimNumber || body.docNumber || "").trim()) {
    errors.push("Kirim raqami kiritilmagan");
  }

  if (!String(body.name || "").trim()) {
    errors.push("Tadbir nomi kiritilmagan");
  }

  if (!String(body.deadline || "").trim()) {
    errors.push("Muddat tanlanmagan");
  }

  return errors;
}

/* ================= GET ALL ================= */

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT
        id,

        kirim_number,
        DATE_FORMAT(kirim_date, '%Y-%m-%d') AS kirim_date,

        chiqim_number,
        DATE_FORMAT(chiqim_date, '%Y-%m-%d') AS chiqim_date,

        author,

        doc_number,
        doc_name,
        DATE_FORMAT(doc_date, '%Y-%m-%d') AS doc_date,

        event_name,
        mechanism,
        implementation_form,

        DATE_FORMAT(deadline, '%Y-%m-%d') AS deadline,

        executors,
        status,
        created_at,
        updated_at
      FROM projects
      ORDER BY deadline ASC, id DESC
    `);

    res.json(rows.map(mapProject));
  } catch (err) {
    console.error("GET PROJECTS ERROR:", err);

    res.status(500).json({
      error: "Projects olishda server xatolik berdi",
      details: err.message
    });
  }
});

/* ================= CREATE ================= */

router.post("/", async (req, res) => {
  try {
    const errors = validateProject(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        error: "Validation error",
        details: errors
      });
    }

    const {
      kirimNumber,
      kirimDate,
      chiqimNumber,
      chiqimDate,
      author,

      name,
      manager,
      form,

      deadline,
      executors,
      status
    } = req.body;

    const safeExecutors = Array.isArray(executors) ? executors : [];

    /*
      Eski ustunlar bilan moslik:
      doc_number = kirimNumber
      doc_name   = name
      doc_date   = kirimDate
    */
    const [result] = await db.execute(
      `
      INSERT INTO projects (
        kirim_number,
        kirim_date,
        chiqim_number,
        chiqim_date,
        author,

        doc_number,
        doc_name,
        doc_date,

        event_name,
        mechanism,
        implementation_form,
        deadline,
        executors,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        String(kirimNumber || "").trim(),
        emptyToNull(kirimDate),

        emptyToNull(chiqimNumber),
        emptyToNull(chiqimDate),

        emptyToNull(author),

        String(kirimNumber || "").trim(),
        String(name || "").trim(),
        emptyToNull(kirimDate),

        String(name || "").trim(),
        emptyToNull(manager),
        emptyToNull(form),
        String(deadline).trim(),
        JSON.stringify(safeExecutors),
        normalizeStatus(status)
      ]
    );

    res.status(201).json({
      success: true,
      id: result.insertId,
      message: "Project yaratildi"
    });
  } catch (err) {
    console.error("CREATE PROJECT ERROR:", err);

    res.status(500).json({
      error: "Project yaratishda server xatolik berdi",
      details: err.message
    });
  }
});

/* ================= UPDATE ================= */

router.put("/:id", async (req, res) => {
  try {
    const projectId = Number(req.params.id);

    if (!projectId) {
      return res.status(400).json({
        error: "Project ID noto‘g‘ri"
      });
    }

    const errors = validateProject(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        error: "Validation error",
        details: errors
      });
    }

    const {
      kirimNumber,
      kirimDate,
      chiqimNumber,
      chiqimDate,
      author,

      name,
      manager,
      form,

      deadline,
      executors,
      status
    } = req.body;

    const safeExecutors = Array.isArray(executors) ? executors : [];

    const [result] = await db.execute(
      `
      UPDATE projects
      SET
        kirim_number = ?,
        kirim_date = ?,
        chiqim_number = ?,
        chiqim_date = ?,
        author = ?,

        doc_number = ?,
        doc_name = ?,
        doc_date = ?,

        event_name = ?,
        mechanism = ?,
        implementation_form = ?,
        deadline = ?,
        executors = ?,
        status = ?
      WHERE id = ?
      `,
      [
        String(kirimNumber || "").trim(),
        emptyToNull(kirimDate),

        emptyToNull(chiqimNumber),
        emptyToNull(chiqimDate),

        emptyToNull(author),

        String(kirimNumber || "").trim(),
        String(name || "").trim(),
        emptyToNull(kirimDate),

        String(name || "").trim(),
        emptyToNull(manager),
        emptyToNull(form),
        String(deadline).trim(),
        JSON.stringify(safeExecutors),
        normalizeStatus(status),
        projectId
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Project topilmadi"
      });
    }

    res.json({
      success: true,
      message: "Project yangilandi"
    });
  } catch (err) {
    console.error("UPDATE PROJECT ERROR:", err);

    res.status(500).json({
      error: "Project yangilashda server xatolik berdi",
      details: err.message
    });
  }
});

/* ================= DELETE ================= */

router.delete("/:id", async (req, res) => {
  try {
    const projectId = Number(req.params.id);

    if (!projectId) {
      return res.status(400).json({
        error: "Project ID noto‘g‘ri"
      });
    }

    const [result] = await db.execute(
      `DELETE FROM projects WHERE id = ?`,
      [projectId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Project topilmadi"
      });
    }

    res.json({
      success: true,
      message: "Project o‘chirildi"
    });
  } catch (err) {
    console.error("DELETE PROJECT ERROR:", err);

    res.status(500).json({
      error: "Project o‘chirishda server xatolik berdi",
      details: err.message
    });
  }
});

module.exports = router;