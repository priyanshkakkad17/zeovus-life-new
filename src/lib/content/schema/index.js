import site from './site';
import home from './home';
import ourCompany from './ourCompany';
import capabilities from './capabilities';
import { nutraceuticals, cosmetics } from './catalog';
import contact from './contact';

/**
 * The content schema is the single source of truth for the CMS.
 *
 * Every group -> section -> field declared here automatically:
 *  - renders an editor control in /admin/content
 *  - gets a default value used until an admin saves an override
 *  - is readable on the public site via getContent() / useContent()
 *
 * Field types: text, textarea, richtext, url, image, boolean, number,
 *              color, select, icon, stringList, list
 */
export const contentSchema = [site, home, ourCompany, capabilities, nutraceuticals, cosmetics, contact];

export const schemaByGroup = Object.fromEntries(contentSchema.map((group) => [group.id, group]));

/** Flat list of `group.section` keys, used for saving and validation. */
export function listContentKeys() {
  const keys = [];
  for (const group of contentSchema) {
    for (const section of group.sections) {
      keys.push(`${group.id}.${section.id}`);
    }
  }
  return keys;
}

export function getSectionSchema(groupId, sectionId) {
  return schemaByGroup[groupId]?.sections.find((section) => section.id === sectionId) || null;
}

/** Build the default value object for one section. */
export function sectionDefaults(section) {
  const values = {};
  for (const field of section.fields) {
    values[field.id] = cloneDefault(field.default);
  }
  return values;
}

/** Build defaults for an entire group, keyed by section id. */
export function groupDefaults(group) {
  const values = {};
  for (const section of group.sections) {
    values[section.id] = sectionDefaults(section);
  }
  return values;
}

/** Build defaults for the whole site, keyed by group id. */
export function allDefaults() {
  const values = {};
  for (const group of contentSchema) {
    values[group.id] = groupDefaults(group);
  }
  return values;
}

function cloneDefault(value) {
  if (Array.isArray(value)) return value.map(cloneDefault);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, cloneDefault(v)]));
  }
  return value === undefined ? '' : value;
}

export { cloneDefault };
