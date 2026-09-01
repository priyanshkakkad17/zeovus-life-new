import { cloneDefault } from './schema';

/**
 * Coerce and merge a stored value against a field definition.
 * Anything missing or of the wrong shape falls back to the field default, so a
 * partially-saved or hand-edited row can never break a page render.
 */
export function mergeField(field, value) {
  const fallback = cloneDefault(field.default);

  switch (field.type) {
    case 'boolean':
      if (typeof value === 'boolean') return value;
      if (value === 'true' || value === 1 || value === '1') return true;
      if (value === 'false' || value === 0 || value === '0') return false;
      return typeof fallback === 'boolean' ? fallback : false;

    case 'number': {
      if (value === '' || value === null || value === undefined) return fallback ?? '';
      const num = Number(value);
      return Number.isFinite(num) ? num : fallback ?? '';
    }

    case 'stringList': {
      if (!Array.isArray(value)) return fallback;
      return value.map((entry) => (entry == null ? '' : String(entry)));
    }

    case 'list': {
      if (!Array.isArray(value)) return fallback;
      return value.map((entry) => {
        const row = {};
        for (const sub of field.fields || []) {
          row[sub.id] = mergeField(sub, entry?.[sub.id]);
        }
        return row;
      });
    }

    case 'select': {
      const options = field.options || [];
      if (typeof value === 'string' && options.includes(value)) return value;
      return fallback;
    }

    default: {
      // text, textarea, richtext, url, image, color
      if (value === null || value === undefined) return fallback;
      if (typeof value === 'string') return value;
      return String(value);
    }
  }
}

/** Merge a whole section's stored value against its schema. */
export function mergeSection(section, value) {
  const out = {};
  for (const field of section.fields) {
    out[field.id] = mergeField(field, value?.[field.id]);
  }
  return out;
}
