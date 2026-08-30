import { cookies } from 'next/headers';
import { authCookieName, verifySessionToken } from '@/lib/auth';

/**
 * Read and verify the current admin session from the request cookies.
 * Returns the user payload or null.
 */
export async function getCurrentAdmin() {
  const token = cookies().get(authCookieName)?.value;
  return verifySessionToken(token);
}

/**
 * Guard for admin API routes. Returns { user } when authorised, or
 * { response } holding a 401/403 Response when not.
 *
 * @param {object} [options]
 * @param {string[]} [options.roles] Allowed roles (defaults to any authenticated admin).
 */
export async function requireAdmin(options = {}) {
  const user = await getCurrentAdmin();

  if (!user) {
    return { response: Response.json({ error: 'Authentication required.' }, { status: 401 }) };
  }

  if (options.roles && !options.roles.includes(user.role)) {
    return { response: Response.json({ error: 'You do not have permission to do that.' }, { status: 403 }) };
  }

  return { user };
}
