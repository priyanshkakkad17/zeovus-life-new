import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { requireAdmin } from '@/lib/requireAdmin';

// Allowed image types mapped to their canonical extension.
const ALLOWED_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export async function POST(request) {
  const guard = await requireAdmin();
  if (guard.response) return guard.response;

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return Response.json({ error: 'No file provided.' }, { status: 400 });
    }

    const extension = ALLOWED_TYPES[file.type];
    if (!extension) {
      return Response.json({ error: 'Unsupported file type. Use JPG, PNG, WEBP, GIF, AVIF or SVG.' }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return Response.json({ error: 'File is too large. Maximum size is 8 MB.' }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    // Build a safe, unique filename; never trust the client-supplied name.
    const baseName = (file.name || 'image')
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 40) || 'image';
    const unique = crypto.randomBytes(6).toString('hex');
    const fileName = `${baseName}-${unique}.${extension}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, fileName), bytes);

    const url = `/uploads/${fileName}`;
    return Response.json({ success: true, url });
  } catch (error) {
    console.error('Upload error:', error);
    return Response.json({ error: 'Could not upload the file. Please try again.' }, { status: 500 });
  }
}
