'use client';

import { useEffect, useState } from 'react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch('/api/enquiries', { cache: 'no-store' })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not load enquiries.');
        return data;
      })
      .then((data) => setEnquiries(data.enquiries || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-neutral-900">Enquiries</h1>
        <p className="mt-1 text-sm text-neutral-500">Submissions from the contact form, newest first.</p>
      </div>

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-light" />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">{error}</div>
      ) : enquiries.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center">
          <p className="text-sm text-neutral-500">No enquiries yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
          {enquiries.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="border-b border-neutral-100 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-neutral-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-800">
                      {item.first_name} {item.last_name}
                      {item.company ? <span className="font-normal text-neutral-400"> · {item.company}</span> : null}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-neutral-500">
                      {item.email}
                      {item.interest ? ` · ${item.interest}` : ''}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-neutral-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                  <svg
                    className={`h-4 w-4 flex-shrink-0 text-neutral-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="space-y-3 border-t border-neutral-100 bg-neutral-50/60 px-5 py-4 text-sm">
                    <p className="whitespace-pre-line leading-relaxed text-neutral-700">{item.message}</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-neutral-500">
                      <span>
                        Email:{' '}
                        <a href={`mailto:${item.email}`} className="text-primary-light hover:underline">
                          {item.email}
                        </a>
                      </span>
                      {item.phone && <span>Phone: {item.phone}</span>}
                      <span>Received: {new Date(item.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
