'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ImageField from '@/components/admin/ImageField';
import { CONTENT_SCHEMA } from '@/lib/content-schema';

const PAGES = Object.entries(CONTENT_SCHEMA).map(([key, def]) => ({ key, label: def.label, fields: def.fields }));

function AdminContentInner() {
  const searchParams = useSearchParams();
  const requestedPage = searchParams.get('page');
  const initialPage = CONTENT_SCHEMA[requestedPage] ? requestedPage : (PAGES[0]?.key || 'home');
  const [activePage, setActivePage] = useState(initialPage);
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const activeSchema = useMemo(() => CONTENT_SCHEMA[activePage], [activePage]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setStatus('');
    setError('');
    fetch(`/api/content?page=${activePage}`)
      .then((res) => res.json())
      .then((data) => { if (!cancelled) setValues(data.content || {}); })
      .catch(() => { if (!cancelled) setError('Could not load content.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [activePage]);

  function setField(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setStatus('');
  }

  async function handleSave() {
    setSaving(true);
    setStatus('');
    setError('');
    try {
      const fields = activeSchema.fields.map((f) => ({ key: f.key, type: f.type, value: values[f.key] ?? '' }));
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: activePage, fields }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save content.');
      setStatus('Saved. Changes are live on the site.');
    } catch (err) {
      setError(err.message || 'Could not save content.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-neutral-900">Page Content</h1>
        <p className="text-neutral-500 text-sm mt-1">Edit the text and images used across your public pages.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Page selector */}
        <nav className="flex flex-row flex-wrap gap-2 lg:flex-col">
          {PAGES.map((p) => (
            <button
              key={p.key}
              onClick={() => setActivePage(p.key)}
              className={`rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all ${
                activePage === p.key ? 'bg-primary-dark text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:border-primary-light hover:text-primary-light'
              }`}
            >
              {p.label}
            </button>
          ))}
        </nav>

        {/* Editor */}
        <div className="rounded-xl border border-neutral-200/60 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display font-semibold text-neutral-900">{activeSchema?.label} content</h2>
            <a href={`/${activePage === 'home' ? '' : activePage}`} target="_blank" rel="noreferrer" className="text-xs font-medium text-primary-light hover:text-primary-dark">
              View page →
            </a>
          </div>

          {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          {status && <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{status}</div>}

          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => <div key={i} className="h-14 animate-pulse rounded-lg bg-neutral-100" />)}
            </div>
          ) : (
            <div className="space-y-6">
              {activeSchema?.fields.map((field) => (
                <div key={field.key}>
                  {field.type === 'image' ? (
                    <ImageField
                      label={field.label}
                      value={values[field.key] || ''}
                      onChange={(url) => setField(field.key, url)}
                    />
                  ) : (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-neutral-700">{field.label}</label>
                      {(values[field.key] || '').length > 80 ? (
                        <textarea
                          rows={3}
                          value={values[field.key] || ''}
                          onChange={(e) => setField(field.key, e.target.value)}
                          className="w-full resize-none rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                        />
                      ) : (
                        <input
                          type="text"
                          value={values[field.key] || ''}
                          onChange={(e) => setField(field.key, e.target.value)}
                          className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex gap-3 border-t border-neutral-100 pt-5">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg bg-primary-light px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminContent() {
  return (
    <Suspense fallback={<div className="h-40 animate-pulse rounded-xl bg-neutral-100" />}>
      <AdminContentInner />
    </Suspense>
  );
}
