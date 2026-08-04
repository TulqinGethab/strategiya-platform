CREATE DATABASE IF NOT EXISTS strategy_platform
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE strategy_platform;

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
