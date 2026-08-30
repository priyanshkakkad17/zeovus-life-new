'use client';

import Link from 'next/link';
import { useIsAdmin } from './useIsAdmin';

/**
 * Wraps a piece of public-page content. For normal visitors it renders children
 * unchanged. For a signed-in admin it adds a hover "Edit" affordance that links
 * to the CMS page/section responsible for this content.
 *
 * Props:
 *  - page: CMS page key (e.g. 'nutraceuticals')
 *  - className: passthrough wrapper class
 */
export default function EditableRegion({ page, className = '', children }) {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <div className={`group/cms relative ${className}`}>
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-dashed ring-primary-light/0 transition-all duration-200 group-hover/cms:ring-primary-light/60" />
      <Link
        href={`/admin/content?page=${page}`}
        className="absolute right-2 top-2 z-30 inline-flex items-center gap-1.5 rounded-full bg-primary-dark/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover/cms:opacity-100"
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" /></svg>
        Edit
      </Link>
      {children}
    </div>
  );
}
