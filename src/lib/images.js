/**
 * Normalise an image reference. Accepts either:
 *  - an absolute http(s) URL (e.g. hosted / Cloudinary), or
 *  - a root-relative uploaded path served from /public (e.g. /uploads/pic.png).
 * Returns null for empty input, or throws with a friendly message when invalid.
 */
export function normaliseImageUrl(value) {
  if (!value || !value.trim()) return null;

  const trimmed = value.trim();

  // Allow locally uploaded assets served from /public.
  if (trimmed.startsWith('/uploads/')) {
    if (trimmed.includes('..')) {
      throw new Error('Enter a valid image URL.');
    }
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('Image URL must use HTTP or HTTPS.');
    }
    return url.toString();
  } catch (error) {
    throw new Error(
      error.message === 'Image URL must use HTTP or HTTPS.' ? error.message : 'Enter a valid image URL.'
    );
  }
}
