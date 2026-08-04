const express = require('express');
const { pool } = require('../config/db');
const { getColumns } = require('../utils/schema');

function createCrudRouter(tableName, options = {}) {
  const router = express.Router();
  const orderBy = options.orderBy || 'id DESC';

  async function filterPayload(body = {}) {
    const columns = await getColumns(tableName);
    const data = {};

    Object.entries(body || {}).forEach(([key, value]) => {
      if (columns.includes(key) && key !== 'id') {
        data[key] = value === '' ? null : value;
      }
    });

    return data;
  }

  router.get('/', async (req, res, next) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM \`${tableName}\` ORDER BY ${orderBy}`);
      res.json(rows);
    } catch (error) {
      next(error);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      const [rows] = await pool.query(`SELECT * FROM \`${tableName}\` WHERE id = ?`, [req.params.id]);
      if (!rows.length) return res.status(404).json({ message: 'Ma’lumot topilmadi' });
      res.json(rows[0]);
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const data = await filterPayload(req.body);
      const keys = Object.keys(data);

      if (!keys.length) return res.status(400).json({ message: 'Saqlash uchun ma’lumot yo‘q' });

      const placeholders = keys.map(() => '?').join(',');
      const [result] = await pool.query(
        `INSERT INTO \`${tableName}\` (${keys.map(key => `\`${key}\``).join(',')}) VALUES (${placeholders})`,
        keys.map(key => data[key])
      );

      const [rows] = await pool.query(`SELECT * FROM \`${tableName}\` WHERE id = ?`, [result.insertId]);
      res.status(201).json(rows[0]);
    } catch (error) {
      next(error);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const data = await filterPayload(req.body);
      const keys = Object.keys(data);

      if (keys.length) {
        await pool.query(
          `UPDATE \`${tableName}\` SET ${keys.map(key => `\`${key}\` = ?`).join(', ')} WHERE id = ?`,
          [...keys.map(key => data[key]), req.params.id]
        );
      }

      const [rows] = await pool.query(`SELECT * FROM \`${tableName}\` WHERE id = ?`, [req.params.id]);
      if (!rows.length) return res.status(404).json({ message: 'Ma’lumot topilmadi' });
      res.json(rows[0]);
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      await pool.query(`DELETE FROM \`${tableName}\` WHERE id = ?`, [req.params.id]);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  });

  return router;
}

module.exports = createCrudRouter;
