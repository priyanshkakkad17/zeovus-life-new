'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ContentIcon } from '@/lib/content/icons';
import FieldControl from './FieldControl';

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function ContentEditor() {
  const [schema, setSchema] = useState([]);
  const [content, setContent] = useState({});
  const [draft, setDraft] = useState({});
  const [customised, setCustomised] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [status, setStatus] = useState({ state: 'loading', message: '' });
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const statusTimer = useRef(null);

  const load = useCallback(async () => {
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await fetch('/api/content?meta=1', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not load content.');
      setSchema(data.schema || []);
      setContent(data.content || {});
      setDraft(structuredClone(data.content || {}));
      setCustomised(data.customised || []);
      setActiveGroup((current) => current || data.schema?.[0]?.id || null);
      setActiveSection((current) => current || data.schema?.[0]?.sections?.[0]?.id || null);
      setStatus({ state: 'idle', message: '' });
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  function flash(state, message) {
    setStatus({ state, message });
    clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus({ state: 'idle', message: '' }), 4000);
  }

  const group = useMemo(() => schema.find((g) => g.id === activeGroup) || null, [schema, activeGroup]);
  const section = useMemo(
    () => group?.sections.find((s) => s.id === activeSection) || group?.sections[0] || null,
    [group, activeSection]
  );

  const draftValue = section ? draft[group.id]?.[section.id] : null;
  const savedValue = section ? content[group.id]?.[section.id] : null;
  const dirty = section ? !deepEqual(draftValue, savedValue) : false;

  const dirtyKeys = useMemo(() => {
    const keys = new Set();
    for (const g of schema) {
      for (const s of g.sections) {
        if (!deepEqual(draft[g.id]?.[s.id], content[g.id]?.[s.id])) keys.add(`${g.id}.${s.id}`);
      }
    }
    return keys;
  }, [schema, draft, content]);

  const customisedKeys = useMemo(() => new Set(customised.map((c) => c.key)), [customised]);

  function setFieldValue(fieldId, next) {
    setDraft((prev) => ({
      ...prev,
      [group.id]: {
        ...prev[group.id],
        [section.id]: { ...prev[group.id]?.[section.id], [fieldId]: next },
      },
    }));
  }

  async function save() {
    if (!section || saving) return;
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group: group.id, section: section.id, value: draftValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save.');

      const savedSection = data.saved?.[`${group.id}.${section.id}`] ?? draftValue;
      setContent((prev) => ({
        ...prev,
        [group.id]: { ...prev[group.id], [section.id]: structuredClone(savedSection) },
      }));
      setDraft((prev) => ({
        ...prev,
        [group.id]: { ...prev[group.id], [section.id]: structuredClone(savedSection) },
      }));
      setCustomised((prev) =>
        prev.some((c) => c.key === `${group.id}.${section.id}`)
          ? prev
          : [...prev, { key: `${group.id}.${section.id}`, updatedAt: new Date().toISOString() }]
      );
      flash('success', 'Saved. Refresh the public page to see it live.');
    } catch (error) {
      flash('error', error.message);
    } finally {
      setSaving(false);
    }
  }

  async function saveAll() {
    if (dirtyKeys.size === 0 || saving) return;
    setSaving(true);
    try {
      const updates = [...dirtyKeys].map((key) => {
        const [g, s] = key.split('.');
        return { group: g, section: s, value: draft[g][s] };
      });
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updates }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save.');
      setContent(structuredClone(draft));
      setCustomised((prev) => {
        const next = new Map(prev.map((c) => [c.key, c]));
        for (const key of dirtyKeys) next.set(key, { key, updatedAt: new Date().toISOString() });
        return [...next.values()];
      });
      flash('success', `Saved ${updates.length} ${updates.length === 1 ? 'section' : 'sections'}.`);
    } catch (error) {
      flash('error', error.message);
    } finally {
      setSaving(false);
    }
  }

  function discard() {
    if (!section) return;
    setDraft((prev) => ({
      ...prev,
      [group.id]: { ...prev[group.id], [section.id]: structuredClone(savedValue) },
    }));
  }

  async function resetToDefault() {
    if (!section || saving) return;
    const label = `${group.label} → ${section.label}`;
    if (!window.confirm(`Reset "${label}" back to the original site content? Your saved changes for this section will be lost.`)) {
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/content/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group: group.id, section: section.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not reset.');
      setContent((prev) => ({
        ...prev,
        [group.id]: { ...prev[group.id], [section.id]: structuredClone(data.value) },
      }));
      setDraft((prev) => ({
        ...prev,
        [group.id]: { ...prev[group.id], [section.id]: structuredClone(data.value) },
      }));
      setCustomised((prev) => prev.filter((c) => c.key !== `${group.id}.${section.id}`));
      flash('success', 'Reset to the original content.');
    } catch (error) {
      flash('error', error.message);
    } finally {
      setSaving(false);
    }
  }

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    function onBeforeUnload(event) {
      if (dirtyKeys.size === 0) return;
      event.preventDefault();
      event.returnValue = '';
    }
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirtyKeys]);

  const visibleFields = useMemo(() => {
    if (!section) return [];
    const term = search.trim().toLowerCase();
    if (!term) return section.fields;
    return section.fields.filter((f) => f.label.toLowerCase().includes(term) || f.id.toLowerCase().includes(term));
  }, [section, search]);

  if (status.state === 'loading' && schema.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-light" />
      </div>
    );
  }

  if (status.state === 'error' && schema.length === 0) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-sm font-semibold text-red-800">Could not load content</h2>
        <p className="mt-1 text-sm text-red-600">{status.message}</p>
        <button
          onClick={load}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Content</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Edit every piece of text, image and link on the public website.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {status.message && (
            <span
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                status.state === 'error' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {status.message}
            </span>
          )}
          {dirtyKeys.size > 1 && (
            <button
              onClick={saveAll}
              disabled={saving}
              className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-primary-light hover:text-primary-light disabled:opacity-60"
            >
              Save all ({dirtyKeys.size})
            </button>
          )}
          {group?.preview && (
            <a
              href={group.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-primary-light hover:text-primary-light"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H19v5.5M19 6l-7 7M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4" />
              </svg>
              View page
            </a>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Group + section navigation */}
        <nav className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {schema.map((g) => {
            const isActiveGroup = g.id === activeGroup;
            const groupDirty = g.sections.some((s) => dirtyKeys.has(`${g.id}.${s.id}`));
            return (
              <div key={g.id} className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                <button
                  type="button"
                  onClick={() => {
                    setActiveGroup(g.id);
                    setActiveSection(g.sections[0]?.id || null);
                    setSearch('');
                  }}
                  className={`flex w-full items-center gap-2.5 px-3.5 py-3 text-left transition-colors ${
                    isActiveGroup ? 'bg-primary-dark text-white' : 'hover:bg-neutral-50'
                  }`}
                >
                  <ContentIcon name={g.icon} className={`h-4 w-4 flex-shrink-0 ${isActiveGroup ? 'text-secondary' : 'text-neutral-400'}`} />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">{g.label}</span>
                  {groupDirty && <span className="h-2 w-2 flex-shrink-0 rounded-full bg-amber-400" />}
                </button>

                {isActiveGroup && (
                  <ul className="border-t border-neutral-100 p-1.5">
                    {g.sections.map((s) => {
                      const key = `${g.id}.${s.id}`;
                      const isActive = s.id === section?.id;
                      return (
                        <li key={s.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveSection(s.id);
                              setSearch('');
                            }}
                            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
                              isActive
                                ? 'bg-primary-light/10 font-medium text-primary-light'
                                : 'text-neutral-600 hover:bg-neutral-50'
                            }`}
                          >
                            <span className="min-w-0 flex-1 truncate">{s.label}</span>
                            {dirtyKeys.has(key) ? (
                              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" title="Unsaved changes" />
                            ) : customisedKeys.has(key) ? (
                              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light/50" title="Customised" />
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        {/* Field editor */}
        {section && (
          <div className="rounded-xl border border-neutral-200 bg-white">
            <div className="flex flex-col gap-3 border-b border-neutral-100 p-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">{group.label}</p>
                <h2 className="mt-0.5 font-display text-lg font-bold text-neutral-900">{section.label}</h2>
                {section.description && <p className="mt-1 text-sm text-neutral-500">{section.description}</p>}
              </div>
              {section.fields.length > 6 && (
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter fields…"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20 sm:w-48"
                />
              )}
            </div>

            <div className="space-y-5 p-5">
              {visibleFields.length === 0 ? (
                <p className="py-8 text-center text-sm text-neutral-400">No fields match “{search}”.</p>
              ) : (
                visibleFields.map((field) => (
                  <FieldControl
                    key={field.id}
                    field={field}
                    value={draftValue?.[field.id]}
                    onChange={(next) => setFieldValue(field.id, next)}
                  />
                ))
              )}
            </div>

            <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-3 rounded-b-xl border-t border-neutral-100 bg-white/95 px-5 py-4 backdrop-blur">
              <button
                type="button"
                onClick={resetToDefault}
                disabled={saving || !customisedKeys.has(`${group.id}.${section.id}`)}
                className="text-xs font-medium text-neutral-400 underline-offset-2 transition-colors hover:text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                Reset to original content
              </button>
              <div className="flex items-center gap-2">
                {dirty && (
                  <button
                    type="button"
                    onClick={discard}
                    disabled={saving}
                    className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 disabled:opacity-60"
                  >
                    Discard
                  </button>
                )}
                <button
                  type="button"
                  onClick={save}
                  disabled={saving || !dirty}
                  className="rounded-lg bg-primary-light px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? 'Saving…' : dirty ? 'Save changes' : 'Saved'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
