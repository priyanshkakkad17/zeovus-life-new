import 'server-only';

import { query } from '@/lib/db';
import { allDefaults, contentSchema, groupDefaults, sectionDefaults, getSectionSchema } from './schema';
import { mergeSection } from './merge';

/**
 * Content is stored one row per `group.section` with the value as JSON.
 * Anything not present in the table falls back to the schema default, so the
 * site renders correctly on a database that has never been edited.
 */

const TABLE = 'site_content';

let ensured = false;

export async function ensureContentTable() {
  if (ensured) return;
  await query(`
    CREATE TABLE IF NOT EXISTS ${TABLE} (
      content_key VARCHAR(191) NOT NULL PRIMARY KEY,
      value JSON NOT NULL,
      updated_by VARCHAR(255) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  ensured = true;
}

function parseValue(raw) {
  if (raw == null) return null;
  if (typeof raw === 'object') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Read stored overrides as a nested object: { group: { section: {...} } }.
 * Returns an empty object if the table is missing or the DB is unreachable —
 * the site then renders entirely from schema defaults.
 */
async function readOverrides(groupId) {
  try {
    await ensureContentTable();
    const rows = groupId
      ? await query(`SELECT content_key, value FROM ${TABLE} WHERE content_key LIKE ?`, [`${groupId}.%`])
      : await query(`SELECT content_key, value FROM ${TABLE}`);

    const out = {};
    for (const row of rows) {
      const [group, section] = String(row.content_key).split('.');
      if (!group || !section) continue;
      const value = parseValue(row.value);
      if (!value || typeof value !== 'object') continue;
      out[group] = out[group] || {};
      out[group][section] = value;
    }
    return out;
  } catch (error) {
    console.error('[content] falling back to defaults:', error.message);
    return {};
  }
}

/** Full site content (defaults deep-merged with stored overrides). */
export async function getAllContent() {
  const overrides = await readOverrides();
  const result = allDefaults();
  for (const group of contentSchema) {
    for (const section of group.sections) {
      result[group.id][section.id] = mergeSection(section, overrides[group.id]?.[section.id]);
    }
  }
  return result;
}

/** One group of content, e.g. getContentGroup('home'). */
export async function getContentGroup(groupId) {
  const group = contentSchema.find((g) => g.id === groupId);
  if (!group) return {};
  const overrides = await readOverrides(groupId);
  const result = groupDefaults(group);
  for (const section of group.sections) {
    result[section.id] = mergeSection(section, overrides[groupId]?.[section.id]);
  }
  return result;
}

/**
 * Convenience reader used by public pages: returns { site, <groupId> } so a
 * page always has the global chrome content alongside its own.
 */
export async function getPageContent(groupId) {
  const [site, page] = await Promise.all([getContentGroup('site'), getContentGroup(groupId)]);
  return { site, page };
}

/** Persist a single section. Values are validated against the section schema. */
export async function saveContentSection(groupId, sectionId, value, updatedBy = null) {
  const section = getSectionSchema(groupId, sectionId);
  if (!section) throw new Error(`Unknown content section: ${groupId}.${sectionId}`);

  const clean = mergeSection(section, value);
  await ensureContentTable();
  await query(
    `INSERT INTO ${TABLE} (content_key, value, updated_by) VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE value = VALUES(value), updated_by = VALUES(updated_by)`,
    [`${groupId}.${sectionId}`, JSON.stringify(clean), updatedBy]
  );
  return clean;
}

/** Reset a section back to its schema default by deleting the override row. */
export async function resetContentSection(groupId, sectionId) {
  const section = getSectionSchema(groupId, sectionId);
  if (!section) throw new Error(`Unknown content section: ${groupId}.${sectionId}`);
  await ensureContentTable();
  await query(`DELETE FROM ${TABLE} WHERE content_key = ?`, [`${groupId}.${sectionId}`]);
  return sectionDefaults(section);
}

/** Which sections currently have saved overrides — used to badge the admin UI. */
export async function getCustomisedKeys() {
  try {
    await ensureContentTable();
    const rows = await query(`SELECT content_key, updated_at FROM ${TABLE}`);
    return rows.map((row) => ({ key: row.content_key, updatedAt: row.updated_at }));
  } catch {
    return [];
  }
}
