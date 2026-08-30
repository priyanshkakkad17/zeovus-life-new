'use client';

import { useRef, useState } from 'react';

/**
 * Admin image field supporting both a hosted URL and a direct file upload.
 * Uploaded files are stored under /public/uploads and the field value becomes
 * the returned path (e.g. /uploads/pic.png).
 *
 * Props:
 *  - value: current image URL/path
 *  - onChange: (url: string) => void
 *  - label, placeholder, help: optional text
 */
export default function ImageField({ value, onChange, label = 'Image', placeholder = 'https://... or upload below', help }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed.');
      onChange(data.url);
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-neutral-700">{label}</label>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-all hover:border-primary-light hover:text-primary-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="rounded-lg border border-neutral-200 px-3 py-2.5 text-sm text-neutral-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              title="Clear image"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
      {help && !error && <p className="mt-1.5 text-xs text-neutral-400">{help}</p>}

      {value && (
        <div className="mt-3 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
          <img src={value} alt="Preview" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-32 w-full object-cover" />
        </div>
      )}
    </div>
  );
}
