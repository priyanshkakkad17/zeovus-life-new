import { SignJWT, jwtVerify } from 'jose';

const COOKIE_NAME = 'zl_admin_session';
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('JWT_SECRET is not set or is too short. Add a strong JWT_SECRET to your environment.');
  }
  return new TextEncoder().encode(secret);
}

export const authCookieName = COOKIE_NAME;
export const tokenMaxAge = TOKEN_MAX_AGE_SECONDS;

/**
 * Create a signed session token for an authenticated admin user.
 */
export async function createSessionToken({ id, email, name, role }) {
  return new SignJWT({ email, name, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(id))
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE_SECONDS}s`)
    .sign(getSecretKey());
}

/**
 * Verify a session token and return its payload, or null if invalid/expired.
 * Works in both the Node runtime and the Edge middleware runtime.
 */
export async function verifySessionToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    return null;
  }
}

/**
 * Serialised cookie options shared by login and logout responses.
 */
export function sessionCookieOptions(maxAge = TOKEN_MAX_AGE_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  };
}
