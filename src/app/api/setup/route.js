import bcrypt from 'bcryptjs';
import { getPool } from '@/lib/db';

export async function POST() {
  let connection;

  try {
    const pool = getPool();
    connection = await pool.getConnection();

    // Create tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(100) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        division VARCHAR(20) NOT NULL DEFAULT 'nutraceuticals',
        icon VARCHAR(50) DEFAULT NULL,
        color_from VARCHAR(50) DEFAULT NULL,
        color_to VARCHAR(50) DEFAULT NULL,
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Migrate databases created before categories supported divisions.
    const [divisionColumn] = await connection.query("SHOW COLUMNS FROM categories LIKE 'division'");
    if (divisionColumn.length === 0) {
      await connection.query("ALTER TABLE categories ADD COLUMN division VARCHAR(20) NOT NULL DEFAULT 'nutraceuticals' AFTER description");
    }

    // Ensure categories support a hosted image URL (used across admin and public pages).
    const [categoryImageColumn] = await connection.query("SHOW COLUMNS FROM categories LIKE 'image'");
    if (categoryImageColumn.length === 0) {
      await connection.query('ALTER TABLE categories ADD COLUMN image VARCHAR(2048) DEFAULT NULL AFTER description');
    }

    await connection.query(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category_id INT NOT NULL,
        subcategory_id INT DEFAULT NULL,
        name VARCHAR(255) NOT NULL,
        image_url VARCHAR(2048) DEFAULT NULL,
        slug VARCHAR(255) NOT NULL,
        brand_line VARCHAR(100) DEFAULT NULL,
        key_actives TEXT,
        primary_benefit TEXT,
        secondary_benefits TEXT,
        manufacturing_formats TEXT,
        dds_delivery_tech TEXT,
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Migrate databases created before products supported image URLs.
    const [imageColumn] = await connection.query("SHOW COLUMNS FROM products LIKE 'image_url'");
    if (imageColumn.length === 0) {
      await connection.query('ALTER TABLE products ADD COLUMN image_url VARCHAR(2048) DEFAULT NULL AFTER name');
    }

    await connection.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) DEFAULT 'Admin',
        role ENUM('admin', 'editor') DEFAULT 'admin',
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // CMS content overrides — one row per `group.section`, value stored as JSON.
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        content_key VARCHAR(191) NOT NULL PRIMARY KEY,
        value JSON NOT NULL,
        updated_by VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Contact form submissions.
    await connection.query(`
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
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create default admin user
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'ZeovusAdmin@2024', 12);
    await connection.query(`
      INSERT IGNORE INTO admin_users (email, password_hash, name, role)
      VALUES (?, ?, 'Super Admin', 'admin')
    `, [process.env.ADMIN_EMAIL || 'admin@zeovuslife.com', hashedPassword]);

    return Response.json({ success: true, message: 'Database setup and product image migration complete' });
  } catch (error) {
    console.error('Setup error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  } finally {
    connection?.release();
  }
}
