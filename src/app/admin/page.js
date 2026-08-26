'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ categories: 0, products: 0, verified: 0 });
  const [categories, setCategories] = useState([]);
  const [setupStatus, setSetupStatus] = useState('idle'); // idle, loading, success, error

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
        const totalProducts = data.reduce((sum, c) => sum + (c.product_count || 0), 0);
        setStats({ categories: data.length, products: totalProducts, verified: totalProducts });
      }
    } catch (err) {
      // DB might not be set up yet
    }
  }

  async function handleSetup() {
    setSetupStatus('loading');
    try {
      const res = await fetch('/api/setup', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSetupStatus('success');
        // Seed categories
        await fetch('/api/seed', { method: 'POST' });
        await fetchData();
      } else {
        setSetupStatus('error');
      }
    } catch (err) {
      setSetupStatus('error');
    }
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500 text-sm mt-1">Manage your nutraceutical product catalog</p>
      </div>

      {/* Setup Banner */}
      {stats.categories === 0 && (
        <div className="mb-8 bg-gradient-to-r from-primary-dark to-primary rounded-xl p-6 text-white">
          <h3 className="font-display font-semibold text-lg mb-2">Database Setup</h3>
          <p className="text-white/70 text-sm mb-4">
            Initialize the database tables and seed the category data. Run this once to get started.
          </p>
          <button
            onClick={handleSetup}
            disabled={setupStatus === 'loading'}
            className="px-5 py-2.5 bg-secondary text-primary-dark rounded-lg font-semibold text-sm hover:bg-secondary-dark transition-all disabled:opacity-50"
          >
            {setupStatus === 'loading' ? 'Setting up...' :
             setupStatus === 'success' ? '✓ Setup Complete' :
             setupStatus === 'error' ? 'Retry Setup' : 'Initialize Database'}
          </button>
          {setupStatus === 'error' && (
            <p className="text-red-300 text-xs mt-2">Setup failed. Check your database connection settings.</p>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white rounded-xl p-6 border border-neutral-200/60 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Total Products</p>
              <p className="text-3xl font-display font-bold text-neutral-900 mt-1 editorial-number">{stats.products}</p>
            </div>
            <div className="w-12 h-12 bg-primary-light/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200/60 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Categories</p>
              <p className="text-3xl font-display font-bold text-neutral-900 mt-1 editorial-number">{stats.categories}</p>
            </div>
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-secondary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200/60 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">Verified</p>
              <p className="text-3xl font-display font-bold text-neutral-900 mt-1 editorial-number">{stats.verified}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Categories table */}
      <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200/60 flex items-center justify-between">
          <h2 className="font-display font-semibold text-neutral-900">Categories</h2>
          <Link
            href="/admin/products"
            className="text-sm text-primary-light hover:text-primary-dark font-medium transition-colors"
          >
            View All Products →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-neutral-500">#</th>
                <th className="px-6 py-3 text-left font-medium text-neutral-500">Category</th>
                <th className="px-6 py-3 text-left font-medium text-neutral-500">Subcategories</th>
                <th className="px-6 py-3 text-left font-medium text-neutral-500">Products</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {categories.map((cat, i) => (
                <tr key={cat.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="px-6 py-3 text-neutral-400">{i + 1}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ background: `linear-gradient(135deg, ${cat.color_from}, ${cat.color_to})` }}
                      />
                      <span className="font-medium text-neutral-800">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-neutral-500">{cat.subcategories?.length || 0}</td>
                  <td className="px-6 py-3 text-neutral-600">{cat.product_count || 0}</td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-400">
                    No categories yet. Run database setup to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
