const { pool } = require('../config/db');

async function getColumns(tableName) {
  const [rows] = await pool.query(`SHOW COLUMNS FROM \`${tableName}\``);
  return rows.map(row => row.Field);
}

async function hasColumn(tableName, columnName) {
  const columns = await getColumns(tableName);
  return columns.includes(columnName);
}

async function addColumnIfMissing(tableName, columnName, definition) {
  const exists = await hasColumn(tableName, columnName);
  if (!exists) {
    await pool.query(`ALTER TABLE \`${tableName}\` ADD COLUMN ${definition}`);
    console.log(`Added column ${tableName}.${columnName}`);
  }
}

async function createCoreTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      kirim_number VARCHAR(100),
      kirim_date DATE,
      chiqim_number VARCHAR(100),
      chiqim_date DATE,
      author VARCHAR(255),
      doc_number VARCHAR(100),
      doc_name VARCHAR(500),
      doc_date DATE,
      event_name TEXT,
      mechanism TEXT,
      implementation_form VARCHAR(255),
      task_sender VARCHAR(255),
      leadership_task VARCHAR(255),
      task_summary TEXT,
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS project_files (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      project_id BIGINT UNSIGNED NOT NULL,
      original_name VARCHAR(255) NOT NULL,
      stored_name VARCHAR(255) NOT NULL,
      file_path VARCHAR(500) NOT NULL,
      file_type VARCHAR(100),
      file_size BIGINT UNSIGNED DEFAULT 0,
      uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_project_files_project_id (project_id),
      CONSTRAINT fk_project_files_project
        FOREIGN KEY (project_id) REFERENCES projects(id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
}

async function ensureProjectsColumns() {
  const definitions = [
    ['kirim_number', '`kirim_number` VARCHAR(100) NULL'],
    ['kirim_date', '`kirim_date` DATE NULL'],
    ['chiqim_number', '`chiqim_number` VARCHAR(100) NULL'],
    ['chiqim_date', '`chiqim_date` DATE NULL'],
    ['author', '`author` VARCHAR(255) NULL'],
    ['doc_number', '`doc_number` VARCHAR(100) NULL'],
    ['doc_name', '`doc_name` VARCHAR(500) NULL'],
    ['doc_date', '`doc_date` DATE NULL'],
    ['event_name', '`event_name` TEXT NULL'],
    ['mechanism', '`mechanism` TEXT NULL'],
    ['implementation_form', '`implementation_form` VARCHAR(255) NULL'],
    ['task_sender', '`task_sender` VARCHAR(255) NULL COMMENT "Topshiriqni yuborgan vazirlik, idora yoki tashkilot"'],
    ['leadership_task', '`leadership_task` VARCHAR(255) NULL COMMENT "Rahbariyat tomonidan berilgan topshiriq"'],
    ['task_summary', '`task_summary` TEXT NULL COMMENT "Topshiriqning qisqacha mazmuni"'],
    ['status', '`status` VARCHAR(50) DEFAULT "active"'],
    ['created_at', '`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP'],
    ['updated_at', '`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP']
  ];

  for (const [name, ddl] of definitions) {
    await addColumnIfMissing('projects', name, ddl);
  }
}

async function createOtherTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      username VARCHAR(100) UNIQUE,
      email VARCHAR(255) UNIQUE,
      password_hash VARCHAR(255),
      role VARCHAR(50) DEFAULT 'viewer',
      department VARCHAR(255),
      position VARCHAR(255),
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS structures (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      structure_type VARCHAR(100) NOT NULL,
      title VARCHAR(255) NOT NULL,
      paper_format VARCHAR(20) DEFAULT 'a4',
      orientation VARCHAR(20) DEFAULT 'landscape',
      content LONGTEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_structures_type (structure_type)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS indicators (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(500) NOT NULL,
      direction VARCHAR(255),
      current_value DECIMAL(14,2) DEFAULT 0,
      target_value DECIMAL(14,2) DEFAULT 0,
      unit VARCHAR(50),
      status VARCHAR(50) DEFAULT 'process',
      deadline DATE,
      note TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_indicators_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tadat_poa (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      poa_code VARCHAR(50) NOT NULL UNIQUE,
      title_uz VARCHAR(500) NOT NULL,
      title_en VARCHAR(500),
      indicator_range VARCHAR(100),
      indicator_count INT DEFAULT 0,
      status VARCHAR(50) DEFAULT 'complete',
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tadat_indicators (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      poa_id BIGINT UNSIGNED NOT NULL,
      indicator_code VARCHAR(50) NOT NULL UNIQUE,
      name_uz TEXT NOT NULL,
      name_en TEXT,
      dimension_uz TEXT,
      dimension_en TEXT,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_tadat_indicators_poa
        FOREIGN KEY (poa_id) REFERENCES tadat_poa(id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS tadat_criteria (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      indicator_id BIGINT UNSIGNED NOT NULL,
      criteria_text_uz TEXT NOT NULL,
      criteria_text_en TEXT,
      status VARCHAR(50) DEFAULT 'jarayonda',
      note TEXT,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_tadat_criteria_indicator
        FOREIGN KEY (indicator_id) REFERENCES tadat_indicators(id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bready_sections (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      section_code VARCHAR(50),
      title_uz VARCHAR(500) NOT NULL,
      title_en VARCHAR(500),
      description TEXT,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bready_indicators (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      section_id BIGINT UNSIGNED NOT NULL,
      indicator_code VARCHAR(50),
      name_uz TEXT NOT NULL,
      name_en TEXT,
      criteria TEXT,
      status VARCHAR(50) DEFAULT 'jarayonda',
      note TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_bready_indicators_section
        FOREIGN KEY (section_id) REFERENCES bready_sections(id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS index_components (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      code VARCHAR(20) NOT NULL UNIQUE,
      name_uz VARCHAR(255) NOT NULL,
      name_en VARCHAR(255),
      max_score DECIMAL(10,2) DEFAULT 0,
      color VARCHAR(50),
      sort_order INT DEFAULT 0
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS index_indicators (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      component_id BIGINT UNSIGNED NOT NULL,
      indicator_name VARCHAR(500) NOT NULL,
      calculation_method TEXT,
      fact_value DECIMAL(14,2) DEFAULT 0,
      unit VARCHAR(50),
      max_score DECIMAL(10,2) DEFAULT 0,
      score DECIMAL(10,2) DEFAULT 0,
      data_source VARCHAR(255),
      responsible_department VARCHAR(255),
      report_period VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_index_indicators_component
        FOREIGN KEY (component_id) REFERENCES index_components(id)
        ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS index_workflow_steps (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      step_no INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      deadline VARCHAR(100),
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS index_report_forms (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      form_name VARCHAR(255) NOT NULL,
      description TEXT,
      file_path VARCHAR(500),
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS settings (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      setting_key VARCHAR(100) NOT NULL UNIQUE,
      setting_value TEXT,
      setting_type VARCHAR(50) DEFAULT 'text',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS activity_logs (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_id BIGINT UNSIGNED NULL,
      module_name VARCHAR(100) NOT NULL,
      action_name VARCHAR(100) NOT NULL,
      record_id BIGINT UNSIGNED NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_activity_module (module_name),
      INDEX idx_activity_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
}

async function ensureSchema() {
  await createCoreTables();
  await ensureProjectsColumns();
  await createOtherTables();
  console.log('MySQL schema checked successfully');
}

module.exports = {
  ensureSchema,
  getColumns
};
