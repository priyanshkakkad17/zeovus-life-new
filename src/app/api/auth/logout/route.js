import { cookies } from 'next/headers';
import { authCookieName, sessionCookieOptions } from '@/lib/auth';

export async function POST() {
  cookies().set(authCookieName, '', sessionCookieOptions(0));
  return Response.json({ success: true });
}
