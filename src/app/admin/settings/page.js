'use client';

import { useState } from 'react';

export default function AdminSettings() {
  const [bulkData, setBulkData] = useState('');
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

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
