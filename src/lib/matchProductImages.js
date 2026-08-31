import { readdir } from 'fs/promises';
import path from 'path';

const IMAGE_DIR_REL = 'uploads/zeovus_life_bottle_products_v3';

// Words in filenames/product names that add noise to matching.
const STOP_WORDS = new Set([
  'bottle', 'bottles', 'formula', 'formulas', 'the', 'and', 'with', 'a', 'of', 'for',
  'support', 'supports', 'blend', 'range', 'tablet', 'tablets', 'capsule', 'capsules',
  'effervescent', 'lozenge', 'lozenges', 'plus', 'max',
]);

/**
 * Normalise any string (filename stem or product name) to a set of comparison
 * tokens. Removes the leading numeric index and a trailing `_bottle` marker
 * from filenames, lowercases, and drops stop words.
 */
export function tokenize(input) {
  const cleaned = input
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')          // drop extension
    .replace(/^\d+[_\s-]+/, '')            // drop leading numeric index
    .replace(/[^a-z0-9]+/g, ' ')           // non-alphanumerics -> space
    .trim();

  const tokens = cleaned.split(/\s+/).filter(Boolean);
  const meaningful = tokens.filter((t) => !STOP_WORDS.has(t));
  return {
    all: tokens,
    meaningful: meaningful.length ? meaningful : tokens,
    joined: tokens.join(' '),
  };
}

function scoreOverlap(aTokens, bTokens) {
  const b = new Set(bTokens);
  let hits = 0;
  for (const t of aTokens) if (b.has(t)) hits += 1;
  const denom = Math.max(aTokens.length, bTokens.length);
  return denom === 0 ? 0 : hits / denom;
}

/**
 * List product image files in the extracted upload directory.
 * Returns [{ file, url, tokens }].
 */
export async function listProductImages(publicRoot) {
  const dir = path.join(publicRoot, IMAGE_DIR_REL);
  let entries = [];
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }
  return entries
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .filter((f) => !/^(base_bottle|contact_v3)/i.test(f)) // skip non-product assets
    .map((file) => ({
      file,
      url: `/${IMAGE_DIR_REL}/${file}`,
      tokens: tokenize(file),
    }));
}

/**
 * Match product rows to image files.
 * @param {Array<{id:number,name:string}>} products
 * @param {Array<{file:string,url:string,tokens:object}>} images
 * @param {number} [threshold] minimum overlap score for a fuzzy match
 * @returns {{ matches: Array, unmatchedProducts: Array, unmatchedImages: Array }}
 */
export function matchProductsToImages(products, images, threshold = 0.6) {
  const usedImages = new Set();
  const matches = [];
  const unmatchedProducts = [];

  // Precompute product tokens.
  const productList = products.map((p) => ({ ...p, tokens: tokenize(p.name) }));

  // Pass 1: exact joined-string match (after normalisation).
  const imageByJoined = new Map();
  for (const img of images) {
    if (!imageByJoined.has(img.tokens.joined)) imageByJoined.set(img.tokens.joined, img);
  }
  for (const product of productList) {
    const exact = imageByJoined.get(product.tokens.joined);
    if (exact && !usedImages.has(exact.file)) {
      usedImages.add(exact.file);
      matches.push({ id: product.id, name: product.name, file: exact.file, url: exact.url, score: 1, kind: 'exact' });
      product._matched = true;
    }
  }

  // Pass 2: best fuzzy overlap on meaningful tokens.
  for (const product of productList) {
    if (product._matched) continue;
    let best = null;
    let bestScore = 0;
    for (const img of images) {
      if (usedImages.has(img.file)) continue;
      const score = scoreOverlap(product.tokens.meaningful, img.tokens.meaningful);
      if (score > bestScore) {
        bestScore = score;
        best = img;
      }
    }
    if (best && bestScore >= threshold) {
      usedImages.add(best.file);
      matches.push({ id: product.id, name: product.name, file: best.file, url: best.url, score: Number(bestScore.toFixed(2)), kind: 'fuzzy' });
      product._matched = true;
    } else {
      unmatchedProducts.push({ id: product.id, name: product.name });
    }
  }

  const unmatchedImages = images.filter((img) => !usedImages.has(img.file)).map((img) => img.file);

  return { matches, unmatchedProducts, unmatchedImages };
}
