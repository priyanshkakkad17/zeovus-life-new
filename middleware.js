import { NextResponse } from 'next/server';
import { authCookieName, verifySessionToken } from '@/lib/auth';

// API paths that must always be reachable without a session.
const PUBLIC_API_PREFIXES = ['/api/auth/login', '/api/auth/logout'];

// API paths that are allowed for public GET reads (writes still require admin).
const PUBLIC_READ_API_PREFIXES = ['/api/categories', '/api/products', '/api/content'];

function isPublicRead(pathname, method) {
  if (method !== 'GET') return false;
  return PUBLIC_READ_API_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const token = request.cookies.get(authCookieName)?.value;
  const user = await verifySessionToken(token);

  // ----- Admin API routes -----
  if (pathname.startsWith('/api/')) {
    if (PUBLIC_API_PREFIXES.some((p) => pathname.startsWith(p))) {
      return NextResponse.next();
    }
    // Setup/seed are one-time bootstrap endpoints; allow them so a fresh DB can
    // create the very first admin user before login is possible.
    if (pathname.startsWith('/api/setup') || pathname.startsWith('/api/seed')) {
      return NextResponse.next();
    }
    if (isPublicRead(pathname, method)) {
      return NextResponse.next();
    }
    if (!user) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }
    return NextResponse.next();
  }

  // ----- Admin pages -----
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      // Already signed in? Send them to the dashboard.
      if (user) return NextResponse.redirect(new URL('/admin', request.url));
      return NextResponse.next();
    }
    if (!user) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
