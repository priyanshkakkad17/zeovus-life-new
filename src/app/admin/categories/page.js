'use client';

import { useEffect, useState } from 'react';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showSubForm, setShowSubForm] = useState(null);
  const [subFormData, setSubFormData] = useState({ name: '', description: '', sort_order: 0 });
  const [formData, setFormData] = useState({
    name: '', description: '', icon: '', color_from: '#15A859', color_to: '#1A475C', sort_order: 0
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch (err) {}
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success || data.id) {
        setShowForm(false);
        setFormData({ name: '', description: '', icon: '', color_from: '#15A859', color_to: '#1A475C', sort_order: 0 });
        fetchCategories();
      }
    } catch (err) {}
  }

  async function handleSubcategorySubmit(e, categoryId) {
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add_subcategory', category_id: categoryId, ...subFormData })
      });
      const data = await res.json();
      if (data.success || data.id) {
        setShowSubForm(null);
        setSubFormData({ name: '', description: '', sort_order: 0 });
        fetchCategories();
      }
    } catch (err) {}
  }

  async function handleDeleteSubcategory(subId) {
    if (!confirm('Delete this subcategory? Products will be unlinked.')) return;
    try {
      await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_subcategory', subcategory_id: subId })
      });
      fetchCategories();
    } catch (err) {}
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-neutral-900">Categories</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage product categories &amp; subcategories</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-light text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm p-6 mb-6">
          <h3 className="font-display font-semibold text-neutral-900 mb-4">New Category</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Icon Key</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData(f => ({ ...f, icon: e.target.value }))}
                  placeholder="dna, pill, heart, brain, etc."
                  className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(f => ({ ...f, description: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light resize-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Color From</label>
                <input
                  type="color"
                  value={formData.color_from}
                  onChange={(e) => setFormData(f => ({ ...f, color_from: e.target.value }))}
                  className="w-full h-10 rounded-lg border border-neutral-200 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Color To</label>
                <input
                  type="color"
                  value={formData.color_to}
                  onChange={(e) => setFormData(f => ({ ...f, color_to: e.target.value }))}
                  className="w-full h-10 rounded-lg border border-neutral-200 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Sort Order</label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData(f => ({ ...f, sort_order: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" className="px-5 py-2.5 bg-primary-light text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-all">
                Create Category
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-neutral-200 text-neutral-600 rounded-lg text-sm hover:bg-neutral-50 transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-4">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200/60 p-5 h-24 animate-pulse" />
          ))
        ) : categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl border border-neutral-200/60 shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${cat.color_from}, ${cat.color_to})` }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display font-semibold text-neutral-900 text-base">{cat.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 font-medium">Active</span>
                    <span className="text-xs text-neutral-400">({cat.product_count || 0} products)</span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">{cat.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-neutral-400">Slug: {cat.slug}</span>
                    <span className="text-xs text-neutral-400">Icon: {cat.icon || '—'}</span>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {cat.subcategories?.length || 0} Subcategories
                  <svg className={`w-3.5 h-3.5 transition-transform ${expandedCategory === cat.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Subcategories Panel */}
              {expandedCategory === cat.id && (
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-neutral-700">Subcategories</h4>
                    <button
                      onClick={() => setShowSubForm(showSubForm === cat.id ? null : cat.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-light/10 text-primary-light rounded-lg text-xs font-medium hover:bg-primary-light/20 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add Subcategory
                    </button>
                  </div>

                  {/* Subcategory Add Form */}
                  {showSubForm === cat.id && (
                    <form onSubmit={(e) => handleSubcategorySubmit(e, cat.id)} className="mb-4 p-4 rounded-lg bg-neutral-50 border border-neutral-200/60">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-neutral-600 mb-1">Name *</label>
                          <input
                            type="text"
                            value={subFormData.name}
                            onChange={(e) => setSubFormData(f => ({ ...f, name: e.target.value }))}
                            required
                            placeholder="e.g. Daily Multivitamins"
                            className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-neutral-600 mb-1">Description</label>
                          <input
                            type="text"
                            value={subFormData.description}
                            onChange={(e) => setSubFormData(f => ({ ...f, description: e.target.value }))}
                            placeholder="Optional"
                            className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light"
                          />
                        </div>
                        <div className="flex items-end gap-2">
                          <div className="flex-1">
                            <label className="block text-xs font-medium text-neutral-600 mb-1">Sort</label>
                            <input
                              type="number"
                              value={subFormData.sort_order}
                              onChange={(e) => setSubFormData(f => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
                              className="w-full px-3 py-2 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                            />
                          </div>
                          <button type="submit" className="px-4 py-2 bg-primary-light text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-all">Add</button>
                          <button type="button" onClick={() => { setShowSubForm(null); setSubFormData({ name: '', description: '', sort_order: 0 }); }} className="px-3 py-2 border border-neutral-200 text-neutral-500 rounded-lg text-sm hover:bg-neutral-100">
                            ✕
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Subcategories List */}
                  {cat.subcategories?.length > 0 ? (
                    <div className="space-y-2">
                      {cat.subcategories.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between rounded-lg border border-neutral-100 bg-neutral-50/50 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary-light/50" />
                            <div>
                              <span className="text-sm font-medium text-neutral-800">{sub.name}</span>
                              {sub.description && <span className="ml-2 text-xs text-neutral-400">— {sub.description}</span>}
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-200/70 text-neutral-600 font-medium">
                              {sub.product_count || 0} products
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-400">slug: {sub.slug}</span>
                            <button
                              onClick={() => handleDeleteSubcategory(sub.id)}
                              className="p-1.5 rounded hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors"
                              title="Delete subcategory"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400 italic py-2">No subcategories yet. Add one above.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
