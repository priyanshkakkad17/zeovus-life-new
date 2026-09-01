'use client';

/** Editor for a simple list of strings (bullet lists, paragraphs, chips). */
export default function StringListEditor({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const multiline = !!field.multiline;

  function update(index, next) {
    const copy = [...items];
    copy[index] = next;
    onChange(copy);
  }

  function move(index, delta) {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const copy = [...items];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium text-neutral-700">{field.label}</label>
        <span className="text-xs text-neutral-400">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="mt-2.5 w-5 flex-shrink-0 text-right text-xs tabular-nums text-neutral-400">
              {index + 1}
            </span>
            {multiline ? (
              <textarea
                rows={3}
                value={item ?? ''}
                onChange={(e) => update(index, e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm leading-relaxed focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
              />
            ) : (
              <input
                type="text"
                value={item ?? ''}
                onChange={(e) => update(index, e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
              />
            )}
            <div className="flex flex-shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                title="Move up"
                className="rounded-md border border-neutral-200 p-1.5 text-neutral-400 transition-colors hover:text-neutral-700 disabled:opacity-30"
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
                className="rounded-md border border-neutral-200 p-1.5 text-neutral-400 transition-colors hover:text-neutral-700 disabled:opacity-30"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                title="Remove"
                className="rounded-md border border-neutral-200 p-1.5 text-neutral-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-dashed border-neutral-300 px-3 py-2 text-xs font-medium text-neutral-600 transition-colors hover:border-primary-light hover:text-primary-light"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
        Add {field.itemLabel || 'item'}
      </button>

      {field.help && <p className="mt-1.5 text-xs text-neutral-400">{field.help}</p>}
    </div>
  );
}
