/**
 * Zeovus Life - Database Seed Script (Category Tables with Subcategories)
 * Parses sections 1-14 from the markdown with full subcategory hierarchy
 */

import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import bcrypt from 'bcryptjs';

const DB_CONFIG = {
  host: 'srv745.hstgr.io',
  port: 3306,
  user: 'u222341186_life',
  password: '8tQoK;Il+',
  database: 'u222341186_zeovuslife',
  connectTimeout: 30000,
};

const CATEGORIES = [
  { slug: 'healthy-ageing', name: 'Healthy Ageing & Cellular Health', description: 'Advanced formulations designed to support healthy ageing, cellular vitality and antioxidant protection at the molecular level.', icon: 'dna', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868213/nura-1.png', color_from: '#9CCD62', color_to: '#15A859', sort_order: 1 },
  { slug: 'multivitamins', name: 'Daily Multivitamins & Foundational Nutrition', description: 'Comprehensive daily multivitamins engineered for complete nutritional coverage across demographics.', icon: 'pill', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868214/nura-2.png', color_from: '#15A859', color_to: '#1A475C', sort_order: 2 },
  { slug: 'gut-health', name: 'Gut Health & Digestive Wellness', description: 'Probiotics, prebiotics and digestive enzymes formulated for optimal gut microbiome balance.', icon: 'gut', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868213/nura-3.png', color_from: '#1A475C', color_to: '#15A859', sort_order: 3 },
  { slug: 'womens-health', name: "Women's Health", description: "Specialized formulations addressing women's unique nutritional needs across every life stage.", icon: 'heart', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868216/nura-4.png', color_from: '#E879A8', color_to: '#9CCD62', sort_order: 4 },
  { slug: 'mens-health', name: "Men's Health", description: "Targeted solutions for men's vitality, prostate health, testosterone support and performance optimization.", icon: 'shield', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868212/nura-5.png', color_from: '#1A475C', color_to: '#1F4015', sort_order: 5 },
  { slug: 'brain-stress-sleep', name: 'Brain, Stress & Sleep', description: 'Nootropic, adaptogenic and sleep-support formulations backed by neuroscience for mental wellness.', icon: 'brain', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868231/nura-6.png', color_from: '#7C3AED', color_to: '#1A475C', sort_order: 6 },
  { slug: 'immunity', name: 'Immunity & Respiratory', description: 'Immune-fortifying formulations combining vitamins, minerals, and clinically studied herbal extracts.', icon: 'shield-plus', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868212/nura-7.png', color_from: '#DC2626', color_to: '#F97316', sort_order: 7 },
  { slug: 'joint-bone', name: 'Joint & Bone Health', description: 'Comprehensive bone mineralization and joint lubrication support with clinically validated ingredients.', icon: 'bone', image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868229/nura-8.png', color_from: '#0891B2', color_to: '#1A475C', sort_order: 8 },
  { slug: 'heart-health', name: 'Heart Health', description: 'Cardiovascular support formulations with omega-3s, antioxidants and heart-protective nutrients.', icon: 'heart-pulse', color_from: '#E11D48', color_to: '#9CCD62', sort_order: 9 },
  { slug: 'energy-sports', name: 'Energy, Sports & Recovery', description: 'Performance-grade formulations for athletes and active lifestyles.', icon: 'zap', color_from: '#F59E0B', color_to: '#15A859', sort_order: 10 },
  { slug: 'weight-management', name: 'Weight Management', description: 'Science-backed thermogenic, appetite-modulating and metabolic formulations for healthy weight management.', icon: 'scale', color_from: '#84CC16', color_to: '#15A859', sort_order: 11 },
  { slug: 'beauty', name: 'Beauty from Within', description: 'Nutri-cosmetics combining collagen, hyaluronic acid and antioxidants for radiant skin, hair and nails.', icon: 'sparkles', color_from: '#EC4899', color_to: '#A855F7', sort_order: 12 },
  { slug: 'children', name: "Children's Nutrition", description: 'Kid-friendly formulations for growing bodies and developing minds with age-appropriate dosing.', icon: 'baby', color_from: '#06B6D4', color_to: '#3B82F6', sort_order: 13 },
  { slug: 'specialty', name: 'Specialty Care', description: 'Specialized Ayurvedic, botanical and condition-specific formulations for targeted health outcomes.', icon: 'leaf', color_from: '#059669', color_to: '#1F4015', sort_order: 14 },
];

// Map section number (from ### N.) to category index
const NUM_TO_INDEX = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7, '9': 8, '10': 9, '11': 10, '12': 11, '13': 12, '14': 13 };

function parseCategoryTables(content) {
  // Extract only the category tables section (between "## 2. Category Tables" and "## 3. Master Mapping")
  const startMarker = '## 2. Category Tables';
  const endMarker = '## 3. Master Mapping';
  
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  
  if (startIdx === -1) {
    console.error('Could not find "## 2. Category Tables"');
    return { subcategories: [], products: [] };
  }
  
  const section = endIdx !== -1 ? content.substring(startIdx, endIdx) : content.substring(startIdx);
  const lines = section.split('\n');
  
  let currentCatIndex = null;
  let currentSubcategory = null;
  let currentSubcategorySkuCount = 0;
  let inTable = false;
  let headerSeen = false;
  
  const subcategories = []; // { catIndex, name, expectedSkus }
  const products = [];      // { catIndex, subcatName, name, brand_line, key_actives, ... }
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Detect category section: ### N. ...
    const sectionMatch = trimmed.match(/^###\s+(\d+)\./);
    if (sectionMatch) {
      const num = sectionMatch[1];
      if (NUM_TO_INDEX[num] !== undefined) {
        currentCatIndex = NUM_TO_INDEX[num];
        currentSubcategory = null;
        inTable = false;
        headerSeen = false;
      }
      continue;
    }
    
    // Detect subcategory: **Name  (X SKUs)**
    const subMatch = trimmed.match(/^\*\*(.+?)\s*\((\d+)\s*SKUs?\)\*\*$/);
    if (subMatch && currentCatIndex !== null) {
      currentSubcategory = subMatch[1].trim();
      currentSubcategorySkuCount = parseInt(subMatch[2]);
      inTable = false;
      headerSeen = false;
      
      // Add subcategory
      const exists = subcategories.find(s => s.catIndex === currentCatIndex && s.name === currentSubcategory);
      if (!exists) {
        subcategories.push({
          catIndex: currentCatIndex,
          name: currentSubcategory,
          expectedSkus: currentSubcategorySkuCount,
        });
      }
      continue;
    }
    
    // Detect table header row (contains "Product" and "Brand Line")
    if (trimmed.startsWith('|') && trimmed.includes('Product') && trimmed.includes('Brand Line')) {
      headerSeen = true;
      inTable = false;
      continue;
    }
    
    // Detect separator row (| --- | --- | ...) — start table after this
    if (headerSeen && trimmed.startsWith('|') && /\|\s*-{2,}/.test(trimmed)) {
      inTable = true;
      headerSeen = false;
      continue;
    }
    
    // If header was seen but next row is NOT a separator, it's a data row directly (no separator table)
    if (headerSeen && trimmed.startsWith('|') && !/\|\s*-{2,}/.test(trimmed)) {
      inTable = true;
      headerSeen = false;
      // Don't continue — fall through to parse this line as a product row
    }
    
    // Parse product data rows
    if (inTable && trimmed.startsWith('|') && currentCatIndex !== null) {
      // Split by unescaped pipe: we need to handle \| inside cells
      // Replace escaped pipes with a placeholder, then split
      const placeholder = '<<<PIPE>>>';
      const cleaned = trimmed.replace(/\\\|/g, placeholder);
      const cells = cleaned.split('|').map(c => c.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '|').trim()).filter(c => c !== '');
      
      if (cells.length >= 6) {
        const name = cells[0];
        const brandLine = cells.length >= 2 ? cells[1] : '';
        const keyActives = cells.length >= 3 ? cells[2] : '';
        const primaryBenefit = cells.length >= 4 ? cells[3] : '';
        const secondaryBenefits = cells.length >= 5 ? cells[4] : '';
        const mfgFormats = cells.length >= 6 ? cells[5] : '';
        const dds = cells.length >= 7 ? cells[6] : '';
        const status = cells.length >= 8 ? cells[7] : 'Verified';
        
        // Skip if it looks like a header row that slipped through
        if (name === 'Product' || name === '---' || name.startsWith('---')) continue;
        
        products.push({
          catIndex: currentCatIndex,
          subcatName: currentSubcategory,
          name: name.trim(),
          brand_line: (brandLine === '—' || !brandLine) ? null : brandLine.trim(),
          key_actives: keyActives.trim(),
          primary_benefit: primaryBenefit.trim(),
          secondary_benefits: (secondaryBenefits === '—' || !secondaryBenefits) ? null : secondaryBenefits.trim(),
          manufacturing_formats: mfgFormats.trim(),
          dds_delivery_tech: dds.trim(),
          status: status.trim() === 'CORRECTED' ? 'Corrected' : 'Verified',
        });
      }
    }
    
    // If we're in a table and hit a non-table non-empty line, end the table
    if (inTable && !trimmed.startsWith('|') && trimmed !== '') {
      inTable = false;
      headerSeen = false;
    }
  }
  
  return { subcategories, products };
}

async function main() {
  console.log('🚀 Zeovus Life - Full Seed Script (Category Tables + Subcategories)');
  console.log('====================================================================\n');

  let connection;
  try {
    console.log('📡 Connecting to database...');
    connection = await mysql.createConnection(DB_CONFIG);
    console.log('✅ Connected\n');

    // Drop and recreate
    console.log('📋 Recreating tables...');
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('DROP TABLE IF EXISTS products');
    await connection.query('DROP TABLE IF EXISTS subcategories');
    await connection.query('DROP TABLE IF EXISTS categories');
    await connection.query('DROP TABLE IF EXISTS admin_users');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    await connection.query(`CREATE TABLE categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(100) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      icon VARCHAR(50) DEFAULT NULL,
      image VARCHAR(2048) DEFAULT NULL,
      color_from VARCHAR(50) DEFAULT NULL,
      color_to VARCHAR(50) DEFAULT NULL,
      sort_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

    await connection.query(`CREATE TABLE subcategories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(150) NOT NULL,
      description TEXT,
      expected_sku_count INT DEFAULT 0,
      sort_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
      UNIQUE KEY unique_subcat (category_id, slug)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

    await connection.query(`CREATE TABLE products (
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

    await connection.query(`CREATE TABLE admin_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      name VARCHAR(100) DEFAULT 'Admin',
      role ENUM('admin', 'editor') DEFAULT 'admin',
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
    console.log('✅ Tables created\n');

    // Admin user
    const hashedPassword = await bcrypt.hash('ZeovusAdmin@2024', 12);
    await connection.query(
      `INSERT INTO admin_users (email, password_hash, name, role) VALUES (?, ?, 'Super Admin', 'admin')`,
      ['admin@zeovuslife.com', hashedPassword]
    );
    console.log('👤 Admin user created\n');

    // Insert categories
    console.log('📂 Inserting categories...');
    const categoryIds = [];
    for (const cat of CATEGORIES) {
      const [result] = await connection.query(
        `INSERT INTO categories (slug, name, description, icon, image, color_from, color_to, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [cat.slug, cat.name, cat.description, cat.icon, cat.image || null, cat.color_from, cat.color_to, cat.sort_order]
      );
      categoryIds.push(result.insertId);
    }
    console.log(`✅ ${categoryIds.length} categories inserted\n`);

    // Parse markdown
    console.log('📖 Parsing markdown Category Tables...');
    const mdPath = resolve(process.cwd(), 'Zeovus_Life_Category_Tables_GENERIC_DEVELOPER.md');
    const mdContent = readFileSync(mdPath, 'utf-8');
    const { subcategories, products } = parseCategoryTables(mdContent);
    console.log(`   Found ${subcategories.length} subcategories`);
    console.log(`   Found ${products.length} product rows\n`);

    // Insert subcategories
    console.log('📁 Inserting subcategories...');
    const subcatIdMap = {}; // key: "catIndex|subcatName" -> id
    let subOrder = 0;
    for (const sub of subcategories) {
      const catId = categoryIds[sub.catIndex];
      const slug = sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 145);
      subOrder++;
      
      try {
        const [result] = await connection.query(
          `INSERT INTO subcategories (category_id, name, slug, expected_sku_count, sort_order) VALUES (?, ?, ?, ?, ?)`,
          [catId, sub.name, slug, sub.expectedSkus, subOrder]
        );
        subcatIdMap[`${sub.catIndex}|${sub.name}`] = result.insertId;
      } catch (err) {
        // Handle duplicate slug within same category
        const altSlug = slug + '-' + subOrder;
        const [result] = await connection.query(
          `INSERT INTO subcategories (category_id, name, slug, expected_sku_count, sort_order) VALUES (?, ?, ?, ?, ?)`,
          [catId, sub.name, altSlug, sub.expectedSkus, subOrder]
        );
        subcatIdMap[`${sub.catIndex}|${sub.name}`] = result.insertId;
      }
    }
    console.log(`✅ ${Object.keys(subcatIdMap).length} subcategories inserted\n`);

    // Insert products
    console.log('📦 Inserting products...');
    let inserted = 0;
    let errors = 0;
    let order = 0;

    for (const product of products) {
      try {
        order++;
        const catId = categoryIds[product.catIndex];
        const subcatId = subcatIdMap[`${product.catIndex}|${product.subcatName}`] || null;
        const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 250);

        await connection.query(
          `INSERT INTO products (category_id, subcategory_id, name, slug, brand_line, key_actives, primary_benefit, secondary_benefits, manufacturing_formats, dds_delivery_tech, status, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [catId, subcatId, product.name, slug, product.brand_line, product.key_actives, product.primary_benefit, product.secondary_benefits, product.manufacturing_formats, product.dds_delivery_tech, product.status, order]
        );
        inserted++;
        if (inserted % 100 === 0) console.log(`  ... ${inserted} inserted`);
      } catch (err) {
        errors++;
        if (errors <= 5) console.warn(`  ⚠️ Error: "${product.name}" -> ${err.message}`);
      }
    }
    console.log(`\n✅ ${inserted} products inserted (${errors} errors)\n`);

    // Verification
    console.log('====================================================================');
    console.log('📊 VERIFICATION');
    console.log('====================================================================\n');
    
    const [catRows] = await connection.query(`
      SELECT c.name, c.slug, 
        (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) as product_count,
        (SELECT COUNT(*) FROM subcategories s WHERE s.category_id = c.id) as subcat_count
      FROM categories c ORDER BY c.sort_order
    `);
    
    let totalProducts = 0;
    for (const row of catRows) {
      totalProducts += row.product_count;
      console.log(`  [${row.product_count.toString().padStart(3)}] ${row.name} (${row.subcat_count} subcategories)`);
    }
    console.log(`\n  TOTAL PRODUCTS: ${totalProducts}`);
    
    // Subcategory detail
    console.log('\n📊 SUBCATEGORY BREAKDOWN:\n');
    const [subRows] = await connection.query(`
      SELECT s.name as subcat_name, c.name as cat_name, s.expected_sku_count,
        (SELECT COUNT(*) FROM products p WHERE p.subcategory_id = s.id) as actual_count
      FROM subcategories s
      JOIN categories c ON s.category_id = c.id
      ORDER BY c.sort_order, s.sort_order
    `);
    
    let lastCat = '';
    let allMatch = true;
    for (const row of subRows) {
      if (row.cat_name !== lastCat) {
        console.log(`\n  ${row.cat_name}:`);
        lastCat = row.cat_name;
      }
      const match = row.actual_count === row.expected_sku_count ? '✅' : '❌';
      if (row.actual_count !== row.expected_sku_count) allMatch = false;
      console.log(`    ${match} ${row.subcat_name}: ${row.actual_count}/${row.expected_sku_count}`);
    }
    
    console.log('\n====================================================================');
    if (allMatch) {
      console.log('🎉 ALL SUBCATEGORY COUNTS MATCH! Data is complete and verified.');
    } else {
      console.log('⚠️  Some subcategory counts don\'t match. Check parsing.');
    }
    console.log('====================================================================\n');
    console.log('Admin login: admin@zeovuslife.com / ZeovusAdmin@2024');

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

main();
