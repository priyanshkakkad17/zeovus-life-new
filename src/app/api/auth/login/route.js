import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { queryOne } from '@/lib/db';
import { authCookieName, createSessionToken, sessionCookieOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const user = await queryOne(
      'SELECT id, email, password_hash, name, role, is_active FROM admin_users WHERE email = ?',
      [email.trim().toLowerCase()]
    );

    // Generic message avoids leaking which part failed.
    const invalid = () => Response.json({ error: 'Invalid email or password.' }, { status: 401 });

    if (!user || !user.is_active) return invalid();

    const passwordOk = await bcrypt.compare(password, user.password_hash);
    if (!passwordOk) return invalid();

    const token = await createSessionToken(user);
    cookies().set(authCookieName, token, sessionCookieOptions());

    return Response.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Could not sign in. Please try again.' }, { status: 500 });
  }
}
