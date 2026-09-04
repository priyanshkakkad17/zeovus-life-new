-- Zeovus Life Nutraceuticals Database Schema

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(50) DEFAULT NULL,
  color_from VARCHAR(50) DEFAULT NULL,
  color_to VARCHAR(50) DEFAULT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subcategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE KEY unique_subcat (category_id, slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  subcategory_id INT DEFAULT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  brand_line VARCHAR(100) DEFAULT NULL,
  key_actives TEXT,
  primary_benefit TEXT,
  secondary_benefits TEXT,
  manufacturing_formats TEXT,
  dds_delivery_tech TEXT,
  -- Cosmetics (QUES skincare) fields, nullable for nutraceutical products.
  description TEXT,
  skin_hair_type VARCHAR(255) DEFAULT NULL,
  concerns_addressed VARCHAR(512) DEFAULT NULL,
  suitable_for VARCHAR(255) DEFAULT NULL,
  what_makes_potent TEXT,
  status ENUM('Verified', 'Corrected', 'Draft') DEFAULT 'Verified',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL,
  INDEX idx_category (category_id),
  INDEX idx_subcategory (subcategory_id),
  INDEX idx_brand (brand_line),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) DEFAULT 'Admin',
  role ENUM('admin', 'editor') DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- NOTE: /api/setup is the source of truth and applies these idempotently,
-- including the following columns added after the initial release:
--   categories.division  VARCHAR(20) NOT NULL DEFAULT 'nutraceuticals'
--   categories.image     VARCHAR(2048)
--   products.image_url   VARCHAR(2048)

-- CMS content: one row per `group.section` key, value stored as JSON.
-- Sections with no row here fall back to the defaults in src/lib/content/schema.
CREATE TABLE IF NOT EXISTS site_content (
  content_key VARCHAR(191) NOT NULL PRIMARY KEY,
  value JSON NOT NULL,
  updated_by VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact form submissions, shown in Admin → Enquiries.
CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(120) NOT NULL,
  last_name VARCHAR(120) NOT NULL,
  company VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(60) DEFAULT NULL,
  interest VARCHAR(120) DEFAULT NULL,
  message TEXT,
  status ENUM('new', 'read', 'archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
