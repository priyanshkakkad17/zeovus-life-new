import { getCurrentAdmin } from '@/lib/requireAdmin';

export async function GET() {
  const user = await getCurrentAdmin();
  if (!user) {
    return Response.json({ user: null }, { status: 401 });
  }
  return Response.json({ user });
}
