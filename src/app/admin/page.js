'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ categories: 0, products: 0, verified: 0 });
  const [byDivision, setByDivision] = useState({
    nutraceuticals: { categories: 0, products: 0 },
    cosmetics: { categories: 0, products: 0 },
  });
  const [categories, setCategories] = useState([]);

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

        const divisions = { nutraceuticals: { categories: 0, products: 0 }, cosmetics: { categories: 0, products: 0 } };
        for (const c of data) {
          const div = c.division === 'cosmetics' ? 'cosmetics' : 'nutraceuticals';
          divisions[div].categories += 1;
          divisions[div].products += c.product_count || 0;
        }
        setByDivision(divisions);
      }
    } catch (err) {}
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500 text-sm mt-1">Manage your nutraceutical product catalog</p>
      </div>

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

      {/* Division breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-white rounded-xl p-6 border border-neutral-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-neutral-900">Nutraceuticals</h3>
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">Division</span>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-2xl font-display font-bold text-neutral-900 editorial-number">{byDivision.nutraceuticals.products}</p>
              <p className="text-xs text-neutral-500 mt-0.5">Products</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-neutral-900 editorial-number">{byDivision.nutraceuticals.categories}</p>
              <p className="text-xs text-neutral-500 mt-0.5">Categories</p>
            </div>
          </div>
          <Link href="/admin/products" className="mt-4 inline-block text-sm text-primary-light hover:text-primary-dark font-medium">Manage →</Link>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200/60 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-neutral-900">Cosmetics</h3>
            <span className="rounded-full bg-pink-50 px-2.5 py-0.5 text-xs font-medium text-pink-700">Division</span>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-2xl font-display font-bold text-neutral-900 editorial-number">{byDivision.cosmetics.products}</p>
              <p className="text-xs text-neutral-500 mt-0.5">Products</p>
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-neutral-900 editorial-number">{byDivision.cosmetics.categories}</p>
              <p className="text-xs text-neutral-500 mt-0.5">Categories</p>
            </div>
          </div>
          <Link href="/admin/products" className="mt-4 inline-block text-sm text-primary-light hover:text-primary-dark font-medium">Manage →</Link>
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
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${cat.division === 'cosmetics' ? 'bg-pink-50 text-pink-700' : 'bg-blue-50 text-blue-700'}`}>{cat.division || 'nutraceuticals'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-neutral-500">{cat.subcategories?.length || 0}</td>
                  <td className="px-6 py-3 text-neutral-600">{cat.product_count || 0}</td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-neutral-400">
                    No categories found.
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
