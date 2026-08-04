const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./config/db');
const { ensureSchema } = require('./utils/schema');
const apiRouter = require('./routes');

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', apiRouter);

app.get('/health', async (req, res) => {
  try {
    await testConnection();
    res.json({ ok: true, db: 'connected', time: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

// Frontendni ham shu serverdan ochish uchun
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((error, req, res, next) => {
  console.error('SERVER ERROR:', error);

  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'Fayl hajmi juda katta' });
  }

  res.status(error.status || 500).json({
    message: error.message || 'Server xatoligi'
  });
});

async function start() {
  try {
    await testConnection();
    await ensureSchema();

    app.listen(PORT, () => {
      console.log(`Strategiya Platformasi server ishga tushdi: http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Server ishga tushmadi:', error.message);
    console.error('MySQL parol va .env faylini tekshiring.');
    process.exit(1);
  }
}

start();
