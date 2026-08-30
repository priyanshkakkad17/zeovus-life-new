'use client';

import { useEffect, useState } from 'react';

/**
 * Lightweight client hook that reports whether the current visitor is a
 * signed-in admin. Used to reveal inline edit affordances on public pages.
 */
export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (!cancelled && data?.user) setIsAdmin(true); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return isAdmin;
}
