'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not sign in.');
      router.replace(from.startsWith('/admin') ? from : '/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Could not sign in.');
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-5">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-dark">
            <span className="font-heading text-sm font-bold text-secondary">ZL</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-neutral-900">Admin Sign In</h1>
          <p className="mt-1 text-sm text-neutral-500">Zeovus Life content management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-neutral-200/70 bg-white p-8 shadow-sm">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
              placeholder="admin@zeovuslife.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-neutral-700">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary-dark px-5 py-3 font-heading text-sm font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-100" />}>
      <LoginForm />
    </Suspense>
  );
}
