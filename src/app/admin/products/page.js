'use client';

import { useEffect, useState } from 'react';
import ImageField from '@/components/admin/ImageField';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    category_id: '', subcategory_id: '', name: '', image_url: '', brand_line: '',
    key_actives: '', primary_benefit: '', secondary_benefits: '',
    manufacturing_formats: '', dds_delivery_tech: '', status: 'Draft'
  });

  useEffect(() => { fetchCategories(); }, []);
  useEffect(() => { fetchProducts(); }, [search, categoryFilter, subcategoryFilter, page]);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch (err) {}
  }

  async function fetchProducts() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '25' });
      if (categoryFilter) params.set('category', categoryFilter);
      if (subcategoryFilter) params.set('subcategory', subcategoryFilter);
      if (search) params.set('search', search);
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
      setPagination(data.pagination || { total: 0, totalPages: 1 });
    } catch (err) { setProducts([]); }
    setLoading(false);
  }

  function resetForm() {
    setFormData({ category_id: '', subcategory_id: '', name: '', image_url: '', brand_line: '', key_actives: '', primary_benefit: '', secondary_benefits: '', manufacturing_formats: '', dds_delivery_tech: '', status: 'Draft' });
    setEditingProduct(null);
    setShowForm(false);
  }

  function openEdit(product) {
    setFormData({
      category_id: product.category_id,
      subcategory_id: product.subcategory_id || '',
      name: product.name,
      image_url: product.image_url || '',
      brand_line: product.brand_line || '',
      key_actives: product.key_actives || '',
      primary_benefit: product.primary_benefit || '',
      secondary_benefits: product.secondary_benefits || '',
      manufacturing_formats: product.manufacturing_formats || '',
      dds_delivery_tech: product.dds_delivery_tech || '',
      status: product.status || 'Draft'
    });
    setEditingProduct(product);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (data.success || data.id) { resetForm(); fetchProducts(); }
    } catch (err) {}
  }

  async function handleDelete(id) {
    if (!confirm('Deactivate this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  }

  // Get subcategories for selected category in filter
  const selectedFilterCat = categories.find(c => c.slug === categoryFilter);
  const filterSubcategories = selectedFilterCat?.subcategories || [];

  // Get subcategories for form
  const formCat = categories.find(c => c.id == formData.category_id);
  const formSubcategories = formCat?.subcategories || [];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-neutral-900">Products</h1>
          <p className="text-neutral-500 text-sm mt-1">{pagination.total} products total</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-light text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-all">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20" />
        </div>
        <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setSubcategoryFilter(''); setPage(1); }} className="px-4 py-2.5 rounded-lg border border-neutral-200 text-sm bg-white">
          <option value="">All Categories</option>
          {categories.map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
        </select>
        {filterSubcategories.length > 0 && (
          <select value={subcategoryFilter} onChange={(e) => { setSubcategoryFilter(e.target.value); setPage(1); }} className="px-4 py-2.5 rounded-lg border border-neutral-200 text-sm bg-white">
            <option value="">All Subcategories</option>
            {filterSubcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name} ({sub.product_count})</option>)}
          </select>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-5 py-3 text-left font-medium text-neutral-500">Product</th>
                <th className="px-5 py-3 text-left font-medium text-neutral-500">Brand</th>
                <th className="px-5 py-3 text-left font-medium text-neutral-500">Category</th>
                <th className="px-5 py-3 text-left font-medium text-neutral-500">Subcategory</th>
                <th className="px-5 py-3 text-left font-medium text-neutral-500">Status</th>
                <th className="px-5 py-3 text-right font-medium text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {loading ? [...Array(5)].map((_, i) => (
                <tr key={i}><td colSpan={6} className="px-5 py-4"><div className="h-4 bg-neutral-100 rounded animate-pulse w-3/4"></div></td></tr>
              )) : products.length > 0 ? products.map(p => (
                <tr key={p.id} className="hover:bg-neutral-50/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <img src={p.image_url} alt="" className="h-10 w-10 flex-shrink-0 rounded-lg border border-neutral-200 object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-light/10 text-primary-light">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L14 14m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-16 4h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2zm6-9h.01" /></svg>
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-medium text-neutral-800 max-w-[180px] truncate">{p.name}</div>
                        <div className="text-xs text-neutral-400 max-w-[180px] truncate mt-0.5">{p.primary_benefit}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-primary-light/10 text-primary-light font-medium">{p.brand_line || '—'}</span></td>
                  <td className="px-5 py-3 text-neutral-600 text-xs">{p.category_name}</td>
                  <td className="px-5 py-3 text-neutral-500 text-xs">{p.subcategory_name || '—'}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'Verified' ? 'bg-green-50 text-green-700' : p.status === 'Corrected' ? 'bg-amber-50 text-amber-700' : 'bg-neutral-100 text-neutral-600'}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700" title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-red-50 text-neutral-400 hover:text-red-600" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-neutral-400">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {pagination.totalPages > 1 && (
          <div className="px-5 py-4 border-t border-neutral-100 flex items-center justify-between">
            <p className="text-sm text-neutral-500">Page {page} of {pagination.totalPages} ({pagination.total} total)</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1.5 rounded border border-neutral-200 text-sm disabled:opacity-50 hover:bg-neutral-50">Prev</button>
              <button onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))} disabled={page === pagination.totalPages} className="px-3 py-1.5 rounded border border-neutral-200 text-sm disabled:opacity-50 hover:bg-neutral-50">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={resetForm} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <h2 className="font-display font-semibold text-lg">{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <button onClick={resetForm} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Category *</label>
                  <select value={formData.category_id} onChange={(e) => setFormData(f => ({ ...f, category_id: e.target.value, subcategory_id: '' }))} required className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm">
                    <option value="">Select</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Subcategory</label>
                  <select value={formData.subcategory_id} onChange={(e) => setFormData(f => ({ ...f, subcategory_id: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm">
                    <option value="">None</option>
                    {formSubcategories.map(sub => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Product Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))} required className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Brand Line</label>
                  <input type="text" value={formData.brand_line} onChange={(e) => setFormData(f => ({ ...f, brand_line: e.target.value }))} placeholder="Smart Men, Meltos..." className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm" />
                </div>
              </div>
              <ImageField
                label="Product Image"
                value={formData.image_url}
                onChange={(url) => setFormData(f => ({ ...f, image_url: url }))}
                help="Paste a hosted image URL or upload a file. Uploads are stored under /uploads."
              />
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Key Actives</label>
                <textarea value={formData.key_actives} onChange={(e) => setFormData(f => ({ ...f, key_actives: e.target.value }))} rows={2} placeholder="Comma separated..." className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Primary Benefit</label>
                  <input type="text" value={formData.primary_benefit} onChange={(e) => setFormData(f => ({ ...f, primary_benefit: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Secondary Benefits</label>
                  <input type="text" value={formData.secondary_benefits} onChange={(e) => setFormData(f => ({ ...f, secondary_benefits: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Manufacturing Formats</label>
                <textarea value={formData.manufacturing_formats} onChange={(e) => setFormData(f => ({ ...f, manufacturing_formats: e.target.value }))} rows={2} placeholder="Pipe separated: Tablet | Capsule..." className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">DDS / Delivery Technology</label>
                <textarea value={formData.dds_delivery_tech} onChange={(e) => setFormData(f => ({ ...f, dds_delivery_tech: e.target.value }))} rows={2} placeholder="Pipe separated..." className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Status</label>
                <select value={formData.status} onChange={(e) => setFormData(f => ({ ...f, status: e.target.value }))} className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 text-sm">
                  <option value="Draft">Draft</option>
                  <option value="Verified">Verified</option>
                  <option value="Corrected">Corrected</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="px-6 py-2.5 bg-primary-light text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-all">{editingProduct ? 'Update' : 'Create'}</button>
                <button type="button" onClick={resetForm} className="px-6 py-2.5 border border-neutral-200 text-neutral-600 rounded-lg text-sm hover:bg-neutral-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
