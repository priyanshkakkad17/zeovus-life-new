'use client';

import { useEffect, useState } from 'react';
import ImageField from '@/components/admin/ImageField';

const EMPTY_CATEGORY_FORM = {
  name: '',
  description: '',
  division: 'nutraceuticals',
  icon: '',
  image: '',
  color_from: '#15A859',
  color_to: '#1A475C',
  sort_order: 0,
};

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [divisionFilter, setDivisionFilter] = useState('nutraceuticals');
  const [showForm, setShowForm] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showSubForm, setShowSubForm] = useState(null);
  const [subFormData, setSubFormData] = useState({ name: '', description: '', sort_order: 0 });
  const [formData, setFormData] = useState(EMPTY_CATEGORY_FORM);
  const [editingImageId, setEditingImageId] = useState(null);
  const [imageDraft, setImageDraft] = useState('');
  const [savingImage, setSavingImage] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch (err) {
      setFormError('Could not load categories.');
    } finally {
      setLoading(false);
    }
  }

  function closeCategoryForm() {
    setShowForm(false);
    setFormData(EMPTY_CATEGORY_FORM);
    setFormError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not create category.');
      closeCategoryForm();
      fetchCategories();
    } catch (err) {
      setFormError(err.message || 'Could not create category.');
    }
  }

  function startImageEdit(category) {
    setEditingImageId(category.id);
    setImageDraft(category.image || '');
    setFormError('');
  }

  function cancelImageEdit() {
    setEditingImageId(null);
    setImageDraft('');
    setFormError('');
  }

  async function saveCategoryImage(categoryId) {
    setSavingImage(true);
    setFormError('');
    try {
      const res = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_category_image', category_id: categoryId, image: imageDraft }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save image.');
      cancelImageEdit();
      fetchCategories();
    } catch (err) {
      setFormError(err.message || 'Could not save image.');
    } finally {
      setSavingImage(false);
    }
  }

  async function handleSubcategorySubmit(event, categoryId) {
    event.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_subcategory', category_id: categoryId, ...subFormData }),
      });
      const data = await res.json();
      if (data.success || data.id) {
        setShowSubForm(null);
        setSubFormData({ name: '', description: '', sort_order: 0 });
        fetchCategories();
      }
    } catch (err) {
      setFormError('Could not add subcategory.');
    }
  }

  async function handleDeleteSubcategory(subId) {
    if (!confirm('Delete this subcategory? Products will be unlinked.')) return;
    try {
      const res = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_subcategory', subcategory_id: subId }),
      });
      if (!res.ok) throw new Error();
      fetchCategories();
    } catch (err) {
      setFormError('Could not delete subcategory.');
    }
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Categories</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage product categories, category imagery and subcategories</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setFormError(''); setFormData((d) => ({ ...d, division: divisionFilter })); }}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-light px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-dark"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Category
        </button>
      </div>

      {/* Division switcher */}
      <div className="mb-6 inline-flex rounded-lg border border-neutral-200 bg-white p-1">
        {[
          { key: 'nutraceuticals', label: 'Nutraceuticals' },
          { key: 'cosmetics', label: 'Cosmetics' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setDivisionFilter(tab.key)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${divisionFilter === tab.key ? 'bg-primary-dark text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-800'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {formError && (
        <div className="mb-5 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{formError}</span>
          <button type="button" onClick={() => setFormError('')} className="font-medium">Dismiss</button>
        </div>
      )}

      {/* New category form */}
      {showForm && (
        <div className="mb-6 rounded-xl border border-neutral-200/60 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-display font-semibold text-neutral-900">New Category</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">Name *</label>
                <input type="text" value={formData.name} onChange={(event) => setFormData((data) => ({ ...data, name: event.target.value }))} required className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">Division *</label>
                <select value={formData.division} onChange={(event) => setFormData((data) => ({ ...data, division: event.target.value }))} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20">
                  <option value="nutraceuticals">Nutraceuticals</option>
                  <option value="cosmetics">Cosmetics</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">Icon Key</label>
                <input type="text" value={formData.icon} onChange={(event) => setFormData((data) => ({ ...data, icon: event.target.value }))} placeholder="dna, pill, heart, brain, etc." className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20" />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">Description</label>
              <textarea value={formData.description} onChange={(event) => setFormData((data) => ({ ...data, description: event.target.value }))} rows={2} className="w-full resize-none rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20" />
            </div>

            <ImageField
              label="Category Image"
              value={formData.image}
              onChange={(url) => setFormData((data) => ({ ...data, image: url }))}
              help="Paste a hosted image URL or upload a file. Leave blank to use the frontend placeholder."
            />

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">Color From</label>
                <input type="color" value={formData.color_from} onChange={(event) => setFormData((data) => ({ ...data, color_from: event.target.value }))} className="h-10 w-full cursor-pointer rounded-lg border border-neutral-200" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">Color To</label>
                <input type="color" value={formData.color_to} onChange={(event) => setFormData((data) => ({ ...data, color_to: event.target.value }))} className="h-10 w-full cursor-pointer rounded-lg border border-neutral-200" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">Sort Order</label>
                <input type="number" value={formData.sort_order} onChange={(event) => setFormData((data) => ({ ...data, sort_order: Number(event.target.value) || 0 }))} className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20" />
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" className="rounded-lg bg-primary-light px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary-dark">Create Category</button>
              <button type="button" onClick={closeCategoryForm} className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm text-neutral-600 transition-all hover:bg-neutral-50">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          [...Array(6)].map((_, index) => <div key={index} className="h-24 animate-pulse rounded-xl border border-neutral-200/60 bg-white p-5" />)
        ) : categories.filter((cat) => (cat.division || 'nutraceuticals') === divisionFilter).map((cat) => (
          <div key={cat.id} className="overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${cat.color_from}, ${cat.color_to})` }} />
            <div className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 gap-4">
                  <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                    {cat.image ? <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[10px] text-neutral-400">No image</div>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-neutral-900">{cat.name}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${cat.division === 'cosmetics' ? 'bg-pink-50 text-pink-700' : 'bg-blue-50 text-blue-700'}`}>{cat.division || 'nutraceuticals'}</span>
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">Active</span>
                      <span className="text-xs text-neutral-400">({cat.product_count || 0} products)</span>
                    </div>
                    <p className="mt-1 text-xs text-neutral-500">{cat.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-4">
                      <span className="text-xs text-neutral-400">Slug: {cat.slug}</span>
                      <span className="text-xs text-neutral-400">Icon: {cat.icon || '—'}</span>
                      {cat.image && <span className="max-w-[280px] truncate text-xs text-neutral-400" title={cat.image}>Image: {cat.image}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
                  <button onClick={() => startImageEdit(cat)} className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-all hover:border-primary-light hover:text-primary-light">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 4.5h15v15h-15z" /></svg>
                    {cat.image ? 'Change Image' : 'Add Image'}
                  </button>
                  <button onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-600 transition-all hover:bg-neutral-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" /></svg>
                    {cat.subcategories?.length || 0} Subcategories
                    <svg className={`h-3.5 w-3.5 transition-transform ${expandedCategory === cat.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                </div>
              </div>

              {/* Image editor */}
              {editingImageId === cat.id && (
                <div className="mt-5 border-t border-neutral-100 pt-5">
                  <ImageField
                    label="Category Image"
                    value={imageDraft}
                    onChange={setImageDraft}
                    help="Paste a hosted image URL or upload a file. Clear and save to remove this category image."
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={() => saveCategoryImage(cat.id)} disabled={savingImage} className="rounded-lg bg-primary-light px-4 py-2 text-xs font-medium text-white transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60">
                      {savingImage ? 'Saving…' : 'Save Image'}
                    </button>
                    <button type="button" onClick={cancelImageEdit} disabled={savingImage} className="rounded-lg border border-neutral-200 px-4 py-2 text-xs text-neutral-600 transition-all hover:bg-neutral-50">Cancel</button>
                  </div>
                </div>
              )}

              {/* Subcategories */}
              {expandedCategory === cat.id && (
                <div className="mt-4 border-t border-neutral-100 pt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-neutral-700">Subcategories</h4>
                    <button onClick={() => setShowSubForm(showSubForm === cat.id ? null : cat.id)} className="inline-flex items-center gap-1.5 rounded-lg bg-primary-light/10 px-3 py-1.5 text-xs font-medium text-primary-light transition-all hover:bg-primary-light/20">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                      Add Subcategory
                    </button>
                  </div>

                  {showSubForm === cat.id && (
                    <form onSubmit={(event) => handleSubcategorySubmit(event, cat.id)} className="mb-4 rounded-lg border border-neutral-200/60 bg-neutral-50 p-4">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-neutral-600">Name *</label>
                          <input type="text" value={subFormData.name} onChange={(event) => setSubFormData((data) => ({ ...data, name: event.target.value }))} required placeholder="e.g. Daily Multivitamins" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20" />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-neutral-600">Description</label>
                          <input type="text" value={subFormData.description} onChange={(event) => setSubFormData((data) => ({ ...data, description: event.target.value }))} placeholder="Optional" className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20" />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <label className="mb-1 block text-xs font-medium text-neutral-600">Sort</label>
                            <input type="number" value={subFormData.sort_order} onChange={(event) => setSubFormData((data) => ({ ...data, sort_order: Number(event.target.value) || 0 }))} className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20" />
                          </div>
                          <button type="submit" className="rounded-lg bg-primary-light px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary-dark">Add</button>
                          <button type="button" onClick={() => { setShowSubForm(null); setSubFormData({ name: '', description: '', sort_order: 0 }); }} className="rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100">✕</button>
                        </div>
                      </div>
                    </form>
                  )}

                  {cat.subcategories?.length > 0 ? (
                    <div className="space-y-2">
                      {cat.subcategories.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-primary-light/50" />
                            <div>
                              <span className="text-sm font-medium text-neutral-800">{sub.name}</span>
                              {sub.description && <span className="ml-2 text-xs text-neutral-400">— {sub.description}</span>}
                            </div>
                            <span className="rounded-full bg-neutral-200/70 px-2 py-0.5 text-xs font-medium text-neutral-600">{sub.product_count || 0} products</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-400">slug: {sub.slug}</span>
                            <button onClick={() => handleDeleteSubcategory(sub.id)} className="rounded p-1.5 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500" title="Delete subcategory">
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : <p className="py-2 text-xs italic text-neutral-400">No subcategories yet. Add one above.</p>}
                </div>
              )}
            </div>
          </div>
        ))}
        {!loading && categories.filter((cat) => (cat.division || 'nutraceuticals') === divisionFilter).length === 0 && (
          <div className="rounded-xl border border-dashed border-neutral-200 bg-white p-10 text-center text-sm text-neutral-400">
            No {divisionFilter} categories yet. Use “Add Category” to create one.
          </div>
        )}
      </div>
    </div>
  );
}
