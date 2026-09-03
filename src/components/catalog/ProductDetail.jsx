'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { resolveBottleImage } from '@/lib/bottleImages';

function splitValues(value, separator) {
  return value ? value.split(separator).map((item) => item.trim()).filter(Boolean) : [];
}

function ProductImage({ product, colorFrom, colorTo }) {
  const [imageError, setImageError] = useState(false);
  const resolvedImage = product.image_url || resolveBottleImage(product.name);
  const hasImage = Boolean(resolvedImage) && !imageError;

  return (
    <div className="group relative flex items-center justify-center">
      {hasImage ? (
        <img
          src={resolvedImage}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full max-w-[620px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex items-center justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-[36px] border border-neutral-200 bg-neutral-50 text-primary-dark">
            <svg className="h-14 w-14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.35} d="M9.75 3.75h4.5m-6 0h7.5m-9 0v3.5c0 .9-.32 1.77-.9 2.46l-1.92 2.27a3 3 0 00-.7 1.94v3.33A3.75 3.75 0 006.83 21h10.34A3.75 3.75 0 0021 17.25v-3.33a3 3 0 00-.7-1.94l-1.92-2.27a3.8 3.8 0 01-.88-2.46v-3.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.35} d="M7.5 14.25h9" /></svg>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailSection({ title, children }) {
  return (
    <section className="grid gap-4 border-t border-neutral-200 py-9 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] md:gap-12">
      <h2 className="flex items-center gap-2.5 font-heading text-[13px] font-bold uppercase tracking-[1.8px] text-primary-dark">
        <span className="h-3 w-[3px] rounded-full bg-primary-light" />
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function BulletList({ items, columns = false }) {
  return (
    <ul className={columns ? 'grid gap-x-8 gap-y-2.5 sm:grid-cols-2' : 'space-y-2.5'}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700">
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Shared product detail view. `basePath` is the catalogue root (e.g. /nutraceuticals
 * or /cosmetics) used for the back-to-category link and empty-state browse link.
 */
export default function ProductDetail({ basePath = '/nutraceuticals', labels = {} }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    fetch(`/api/products/${id}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Product not found');
        return data;
      })
      .then((data) => { if (!cancelled) setProduct(data); })
      .catch((requestError) => { if (!cancelled) setError(requestError.message || 'Product not found'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="animate-pulse">
            <div className="h-4 w-40 rounded bg-neutral-100" />
            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="min-h-[440px] rounded-[32px] bg-neutral-100 sm:min-h-[560px] lg:min-h-[640px]" />
              <div className="space-y-4 pt-8"><div className="h-10 w-3/4 rounded bg-neutral-100" /><div className="h-5 w-full rounded bg-neutral-100" /><div className="h-5 w-5/6 rounded bg-neutral-100" /></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-5 pt-24 text-center">
        <div>
          <p className="font-heading text-[11px] font-bold uppercase tracking-[2px] text-primary-light">Product not available</p>
          <h1 className="mt-3 font-heading text-[30px] font-bold text-primary-dark">This product could not be found.</h1>
          <Link href={basePath} className="mt-7 inline-flex items-center gap-2 font-heading text-[12px] font-semibold uppercase tracking-[1px] text-primary-light">
            Browse categories
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M7 7h10v10" /></svg>
          </Link>
        </div>
      </main>
    );
  }

  const colorFrom = product.color_from || '#15A859';
  const colorTo = product.color_to || '#1A475C';
  const keyActives = splitValues(product.key_actives, ',');
  const technologies = splitValues(product.dds_delivery_tech, '|');
  const backHref = `${basePath}?category=${product.category_slug}`;

  // A cosmetics (QUES skincare) product carries a `what_makes_potent` or
  // `description` value; those never appear on nutraceutical rows.
  const isCosmetic = Boolean(product.what_makes_potent || product.description);
  // Nutraceutical formats are pipe-separated; cosmetics sizes are comma-separated.
  const formats = splitValues(product.manufacturing_formats, isCosmetic ? ',' : '|');
  const formatsHeading = isCosmetic ? (labels.sizesLabel || 'Available sizes') : labels.formatsLabel;

  // Cosmetics (QUES skincare) fields. "What makes it potent" bullets are stored
  // with leading • characters and/or newlines — split on either.
  const potencyBullets = product.what_makes_potent
    ? product.what_makes_potent
        .split(/\n|•/)
        .map((item) => item.replace(/^[•\s]+/, '').trim())
        .filter(Boolean)
    : [];
  const concerns = splitValues(product.concerns_addressed, ',');
  // The main descriptive paragraph — cosmetics use `description`, nutraceuticals
  // fall back to `primary_benefit`.
  const intro = product.description || product.primary_benefit;

  return (
    <main className="min-h-screen bg-white pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Link href={backHref} className="group inline-flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[1px] text-neutral-500 transition-colors hover:text-primary-dark">
          <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m0 0 6-6m-6 6 6 6" /></svg>
          {labels.backLabel} {product.category_name}
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Sticky big product image — Minimalist-style */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
              <ProductImage product={product} colorFrom={colorFrom} colorTo={colorTo} />
            </motion.div>
          </div>

          {/* Scrolling product info column */}
          <div className="flex flex-col">
            <div className="lg:pt-6">
              <h1 className="font-heading text-[38px] font-bold leading-[1.04] tracking-[-1.2px] text-primary-dark sm:text-[46px] lg:text-[52px]">{product.name}</h1>
              {intro && <p className="mt-6 text-[16px] leading-relaxed text-neutral-600 sm:text-[17px]">{intro}</p>}
              {(product.skin_hair_type || product.suitable_for) && (
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {product.skin_hair_type && (
                    <span className="rounded-full border border-primary-light/20 bg-primary-light/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.5px] text-primary-dark">
                      {product.skin_hair_type}
                    </span>
                  )}
                  {product.suitable_for && (
                    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.5px] text-neutral-500">
                      {product.suitable_for}
                    </span>
                  )}
                </div>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={labels.enquireHref || '/contact'} className="inline-flex items-center gap-2 rounded-[3px] bg-primary-dark px-6 py-3.5 font-heading text-[11px] font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-primary-light">
                  {labels.enquireLabel}
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M7 7h10v10" /></svg>
                </Link>
              </div>
            </div>

            {/* Sectioned detail rows */}
            <div className="mt-10">
              {potencyBullets.length > 0 && (
                <DetailSection title={labels.potentLabel || 'What makes it potent'}>
                  <BulletList items={potencyBullets} />
                </DetailSection>
              )}
              {keyActives.length > 0 && (
                <DetailSection title={labels.keyActivesLabel}>
                  <BulletList items={keyActives} />
                </DetailSection>
              )}
              {concerns.length > 0 && (
                <DetailSection title={labels.concernsLabel || 'Concerns addressed'}>
                  <BulletList items={concerns} columns />
                </DetailSection>
              )}
              {product.secondary_benefits && (
                <DetailSection title={labels.secondaryLabel}>
                  <p className="text-[15px] leading-relaxed text-neutral-600">{product.secondary_benefits}</p>
                </DetailSection>
              )}
              {formats.length > 0 && (
                <DetailSection title={formatsHeading}>
                  <BulletList items={formats} columns />
                </DetailSection>
              )}
              {technologies.length > 0 && (
                <DetailSection title={labels.deliveryLabel}>
                  <BulletList items={technologies} columns />
                </DetailSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
