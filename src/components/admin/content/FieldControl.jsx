'use client';

import ImageField from '@/components/admin/ImageField';
import { ContentIcon, iconKeys } from '@/lib/content/icons';
import StringListEditor from './StringListEditor';
import ListEditor from './ListEditor';

const inputClass =
  'w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm text-neutral-800 transition-colors focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20';

function Label({ field }) {
  return (
    <label className="mb-1 block text-sm font-medium text-neutral-700">
      {field.label}
    </label>
  );
}

function Help({ field }) {
  if (!field.help) return null;
  return <p className="mt-1.5 text-xs text-neutral-400">{field.help}</p>;
}

/** Renders the correct editor control for a single schema field. */
export default function FieldControl({ field, value, onChange }) {
  switch (field.type) {
    case 'boolean':
      return (
        <div className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-neutral-50/60 px-3.5 py-3">
          <button
            type="button"
            role="switch"
            aria-checked={!!value}
            onClick={() => onChange(!value)}
            className={`relative mt-0.5 h-5 w-9 flex-shrink-0 rounded-full transition-colors ${
              value ? 'bg-primary-light' : 'bg-neutral-300'
            }`}
          >
            <span
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                value ? 'translate-x-[18px]' : 'translate-x-0.5'
              }`}
            />
          </button>
          <div className="min-w-0">
            <span className="block text-sm font-medium text-neutral-700">{field.label}</span>
            <Help field={field} />
          </div>
        </div>
      );

    case 'textarea':
    case 'richtext':
      return (
        <div>
          <Label field={field} />
          <textarea
            rows={field.type === 'richtext' ? 8 : 3}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputClass} resize-y leading-relaxed`}
          />
          <Help field={field} />
        </div>
      );

    case 'number':
      return (
        <div>
          <Label field={field} />
          <input
            type="number"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
            className={inputClass}
          />
          <Help field={field} />
        </div>
      );

    case 'image':
      return (
        <ImageField
          label={field.label}
          value={value}
          onChange={onChange}
          help={field.help}
          placeholder="https://… or /uploads/… or upload below"
        />
      );

    case 'color':
      return (
        <div>
          <Label field={field} />
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={/^#[0-9a-fA-F]{6}$/.test(value || '') ? value : '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded-lg border border-neutral-200 bg-white p-1"
            />
            <input
              type="text"
              value={value ?? ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#1F4015"
              className={inputClass}
            />
          </div>
          <Help field={field} />
        </div>
      );

    case 'select':
      return (
        <div>
          <Label field={field} />
          <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={inputClass}>
            {(field.options || []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <Help field={field} />
        </div>
      );

    case 'icon':
      return (
        <div>
          <Label field={field} />
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-primary-light">
              <ContentIcon name={value} className="h-5 w-5" />
            </span>
            <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={inputClass}>
              {iconKeys.map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <Help field={field} />
        </div>
      );

    case 'stringList':
      return <StringListEditor field={field} value={value} onChange={onChange} />;

    case 'list':
      return <ListEditor field={field} value={value} onChange={onChange} />;

    default:
      return (
        <div>
          <Label field={field} />
          <input
            type="text"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
          <Help field={field} />
        </div>
      );
  }
}
