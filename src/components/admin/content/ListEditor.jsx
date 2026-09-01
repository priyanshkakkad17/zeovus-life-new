'use client';

import { useState } from 'react';
import FieldControl from './FieldControl';

function blankRow(field) {
  const row = {};
  for (const sub of field.fields || []) {
    row[sub.id] = Array.isArray(sub.default) ? [] : sub.default ?? '';
  }
  return row;
}

/** Editor for a repeatable list of objects (cards, links, steps, stats…). */
export default function ListEditor({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const [openIndex, setOpenIndex] = useState(items.length === 1 ? 0 : null);

  function updateRow(index, key, next) {
    const copy = items.map((row, i) => (i === index ? { ...row, [key]: next } : row));
    onChange(copy);
  }

  function move(index, delta) {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const copy = [...items];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
    setOpenIndex(target);
  }

  function remove(index) {
    onChange(items.filter((_, i) => i !== index));
    setOpenIndex(null);
  }

  function add() {
    onChange([...items, blankRow(field)]);
    setOpenIndex(items.length);
  }

  const titleKey = field.titleField || field.fields?.[0]?.id;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium text-neutral-700">{field.label}</label>
        <span className="text-xs text-neutral-400">
          {items.length} {items.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      <div className="space-y-2">
        {items.map((row, index) => {
          const isOpen = openIndex === index;
          const title = (row?.[titleKey] || '').toString().trim();
          return (
            <div key={index} className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
              <div className="flex items-center gap-2 bg-neutral-50/80 px-3 py-2">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                >
                  <svg
                    className={`h-4 w-4 flex-shrink-0 text-neutral-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-xs tabular-nums text-neutral-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="truncate text-sm font-medium text-neutral-700">
                    {title || `${field.itemLabel || 'Entry'} ${index + 1}`}
                  </span>
                </button>

                <div className="flex flex-shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    title="Move up"
                    className="rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-white hover:text-neutral-700 disabled:opacity-30"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    title="Move down"
                    className="rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-white hover:text-neutral-700 disabled:opacity-30"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    title="Remove"
                    className="rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="space-y-4 border-t border-neutral-100 p-4">
                  {(field.fields || []).map((sub) => (
                    <FieldControl
                      key={sub.id}
                      field={sub}
                      value={row?.[sub.id]}
                      onChange={(next) => updateRow(index, sub.id, next)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-neutral-300 px-3 py-2 text-xs font-medium text-neutral-600 transition-colors hover:border-primary-light hover:text-primary-light"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
        Add {field.itemLabel || 'entry'}
      </button>

      {field.help && <p className="mt-1.5 text-xs text-neutral-400">{field.help}</p>}
    </div>
  );
}
