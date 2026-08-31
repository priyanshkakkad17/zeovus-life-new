'use client';

import { useState } from 'react';

export default function AdminSettings() {
  const [bulkData, setBulkData] = useState('');
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  const [matchLoading, setMatchLoading] = useState(false);
  const [matchReport, setMatchReport] = useState(null);
  const [matchError, setMatchError] = useState('');
  const [overwrite, setOverwrite] = useState(true);

  async function previewImageMatches() {
    setMatchLoading(true);
    setMatchError('');
    setMatchReport(null);
    try {
      const res = await fetch('/api/products/match-images');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Preview failed.');
      setMatchReport({ ...data, applied: false });
    } catch (err) {
      setMatchError(err.message);
    } finally {
      setMatchLoading(false);
    }
  }

  async function applyImageMatches() {
    if (!confirm(overwrite ? 'Apply images to all matched products (overwriting any existing images)?' : 'Apply images only to products without an image?')) return;
    setMatchLoading(true);
    setMatchError('');
    try {
      const res = await fetch('/api/products/match-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ overwrite }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Apply failed.');
      setMatchReport({ ...data, applied: true });
    } catch (err) {
      setMatchError(err.message);
    } finally {
      setMatchLoading(false);
    }
  }

  async function handleBulkImport() {
    if (!bulkData.trim()) return;
    setImporting(true);
    setImportResult(null);

    try {
      const res = await fetch('/api/products/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: bulkData })
      });
      const result = await res.json();
      setImportResult(result);
      if (result.success) setBulkData('');
    } catch (err) {
      setImportResult({ success: false, error: err.message });
    }
    setImporting(false);
  }

  async function handleSetup() {
    try {
      const res = await fetch('/api/setup', { method: 'POST' });
      const data = await res.json();
      alert(data.success ? 'Database setup complete!' : `Setup failed: ${data.error}`);
    } catch (err) {
      alert('Setup failed: ' + err.message);
    }
  }

  async function handleSeed() {
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      alert(data.success ? 'Categories seeded!' : `Seed failed: ${data.error}`);
    } catch (err) {
      alert('Seed failed: ' + err.message);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-neutral-900">Settings</h1>
        <p className="text-neutral-500 text-sm mt-1">Database management and bulk operations</p>
      </div>

      {/* Database Operations */}
      <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm p-6 mb-6">
        <h2 className="font-display font-semibold text-neutral-900 mb-4">Database Operations</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSetup}
            className="px-5 py-2.5 bg-primary-dark text-white rounded-lg font-medium text-sm hover:bg-primary transition-all"
          >
            Initialize Tables
          </button>
          <button
            onClick={handleSeed}
            className="px-5 py-2.5 bg-primary-light text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-all"
          >
            Seed Categories
          </button>
        </div>
        <p className="text-xs text-neutral-400 mt-3">
          "Initialize Tables" creates the database schema. "Seed Categories" populates the 14 default categories.
        </p>
      </div>

      {/* Product Image Matching */}
      <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm p-6 mb-6">
        <h2 className="font-display font-semibold text-neutral-900 mb-2">Product Images</h2>
        <p className="text-sm text-neutral-500 mb-4">
          Match the uploaded bottle images (in <code className="rounded bg-neutral-100 px-1">/uploads/zeovus_life_bottle_products_v3</code>) to products by name.
          Preview first, then apply. Applying updates each matched product's image.
        </p>

        <label className="mb-4 flex items-center gap-2 text-sm text-neutral-600">
          <input type="checkbox" checked={overwrite} onChange={(e) => setOverwrite(e.target.checked)} className="h-4 w-4 rounded border-neutral-300" />
          Overwrite images that are already set
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={previewImageMatches}
            disabled={matchLoading}
            className="px-5 py-2.5 border border-neutral-200 text-neutral-700 rounded-lg font-medium text-sm hover:border-primary-light hover:text-primary-light transition-all disabled:opacity-50"
          >
            {matchLoading ? 'Working…' : 'Preview Matches'}
          </button>
          <button
            onClick={applyImageMatches}
            disabled={matchLoading}
            className="px-5 py-2.5 bg-primary-light text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-all disabled:opacity-50"
          >
            {matchLoading ? 'Working…' : 'Apply Images'}
          </button>
        </div>

        {matchError && <p className="mt-3 text-sm text-red-600">✗ {matchError}</p>}

        {matchReport && (
          <div className="mt-5 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm">
            <p className="font-medium text-neutral-800">
              {matchReport.applied
                ? `✓ Applied — ${matchReport.updated} updated${matchReport.skipped ? `, ${matchReport.skipped} skipped` : ''}.`
                : `Preview — ${matchReport.matchedCount} of ${matchReport.totalProducts} products matched.`}
            </p>
            <p className="mt-1 text-neutral-500">
              {matchReport.unmatchedProductCount} products without a match · {matchReport.unmatchedImageCount} images unused.
            </p>

            {matchReport.matches?.length > 0 && (
              <details className="mt-3">
                <summary className="cursor-pointer font-medium text-primary-light">View matches ({matchReport.matches.length})</summary>
                <div className="mt-2 max-h-64 overflow-y-auto rounded border border-neutral-200 bg-white">
                  {matchReport.matches.map((m) => (
                    <div key={m.id} className="flex items-center justify-between gap-3 border-b border-neutral-100 px-3 py-2 last:border-b-0">
                      <span className="truncate text-neutral-700">{m.name}</span>
                      <span className="flex items-center gap-2 whitespace-nowrap text-xs text-neutral-400">
                        <span className={m.kind === 'exact' ? 'text-green-600' : 'text-amber-600'}>{m.kind} {m.score}</span>
                        {m.file}
                      </span>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {matchReport.unmatchedProducts?.length > 0 && (
              <details className="mt-2">
                <summary className="cursor-pointer font-medium text-neutral-600">Unmatched products ({matchReport.unmatchedProducts.length})</summary>
                <div className="mt-2 max-h-48 overflow-y-auto rounded border border-neutral-200 bg-white">
                  {matchReport.unmatchedProducts.map((p) => (
                    <div key={p.id} className="border-b border-neutral-100 px-3 py-1.5 text-neutral-600 last:border-b-0">{p.name}</div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}
      </div>

      {/* Bulk Import */}
      <div className="bg-white rounded-xl border border-neutral-200/60 shadow-sm p-6">
        <h2 className="font-display font-semibold text-neutral-900 mb-2">Bulk Product Import</h2>
        <p className="text-sm text-neutral-500 mb-4">
          Paste JSON array of products. Each object should have: category_id, name, brand_line, key_actives, primary_benefit, secondary_benefits, manufacturing_formats, dds_delivery_tech, status.
        </p>
        <textarea
          value={bulkData}
          onChange={(e) => setBulkData(e.target.value)}
          rows={10}
          placeholder={`[\n  {\n    "category_id": 1,\n    "name": "Zeomen 50+",\n    "brand_line": "Smart Men",\n    "key_actives": "CoQ10, L-Carnitine, Lutein",\n    "primary_benefit": "Healthy ageing multivitamin",\n    "status": "Verified"\n  }\n]`}
          className="w-full px-4 py-3 rounded-lg border border-neutral-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light resize-y"
        />
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleBulkImport}
            disabled={importing || !bulkData.trim()}
            className="px-5 py-2.5 bg-primary-light text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-all disabled:opacity-50"
          >
            {importing ? 'Importing...' : 'Import Products'}
          </button>
          {importResult && (
            <span className={`text-sm ${importResult.success ? 'text-green-600' : 'text-red-600'}`}>
              {importResult.success ? `✓ ${importResult.imported || 0} products imported` : `✗ ${importResult.error}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
