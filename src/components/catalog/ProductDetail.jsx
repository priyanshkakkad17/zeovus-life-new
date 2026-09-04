'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { resolveBottleImage } from '@/lib/bottleImages';

function splitValues(value, separator) {
  if (!value) return [];
  // Always treat newlines as separators too — the nutraceutical catalogue stores
  // formats/technologies one per line, while cosmetics use commas.
  const pattern = new RegExp(`[\\n${separator === ',' ? ',' : '|'}]`);
  return value.split(pattern).map((item) => item.trim()).filter(Boolean);
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

function AccordionIcon({ open }) {
  return (
    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center text-primary-light">
      {/* horizontal bar — always present */}
      <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
      {/* vertical bar — rotates/fades out when open, forming + / − */}
      <span
        className={`absolute h-3.5 w-[1.5px] rounded-full bg-current transition-all duration-300 ease-out ${
          open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
        }`}
      />
    </span>
  );
}

/**
 * A single collapsible accordion row. Controlled by the parent so that only one
 * section stays open at a time.
 */
function AccordionSection({ title, open, onToggle, children }) {
  return (
    <div className="border-t border-neutral-200 last:border-b">
      <h2>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="group flex w-full items-center justify-between gap-4 py-6 text-left"
        >
          <span className="flex items-center gap-2.5 font-heading text-[13px] font-bold uppercase tracking-[1.8px] text-primary-dark transition-colors group-hover:text-primary-light">
            <span className="h-3 w-[3px] rounded-full bg-primary-light" />
            {title}
          </span>
          <AccordionIcon open={open} />
        </button>
      </h2>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-[13px]">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
  const [openSection, setOpenSection] = useState(0);

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

  // Prefer the category division (reliable) and fall back to field-shape
  // detection for older rows that predate the division column.
  const isCosmetic = product.division
    ? product.division === 'cosmetics'
    : Boolean(product.what_makes_potent);
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

  // Build the accordion sections in order, including only those with content.
  const sections = [
    potencyBullets.length > 0 && {
      title: labels.potentLabel || 'What makes it potent',
      content: <BulletList items={potencyBullets} />,
    },
    keyActives.length > 0 && {
      title: labels.keyActivesLabel || 'Key actives',
      content: <BulletList items={keyActives} />,
    },
    concerns.length > 0 && {
      title: labels.concernsLabel || 'Concerns addressed',
      content: <BulletList items={concerns} columns />,
    },
    product.secondary_benefits && {
      title: labels.secondaryLabel || 'Secondary benefits',
      content: <p className="text-[15px] leading-relaxed text-neutral-600">{product.secondary_benefits}</p>,
    },
    formats.length > 0 && {
      title: formatsHeading || 'Formats',
      content: <BulletList items={formats} columns />,
    },
    technologies.length > 0 && {
      title: labels.deliveryLabel || 'Delivery technology',
      content: <BulletList items={technologies} columns />,
    },
    product.recommended_dosage && {
      title: labels.dosageLabel || 'Recommended dosage',
      content: <p className="whitespace-pre-line text-[15px] leading-relaxed text-neutral-600">{product.recommended_dosage}</p>,
    },
    product.mechanism_of_action && {
      title: labels.mechanismLabel || 'Mechanism of action',
      content: <p className="whitespace-pre-line text-[15px] leading-relaxed text-neutral-600">{product.mechanism_of_action}</p>,
    },
  ].filter(Boolean);

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
                    <span className="inline-flex items-center border-l-2 border-primary-light bg-neutral-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.5px] text-primary-dark">
                      {product.skin_hair_type}
                    </span>
                  )}
                  {product.suitable_for && (
                    <span className="inline-flex items-center border-l-2 border-neutral-300 bg-neutral-50 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.5px] text-neutral-500">
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

            {/* Collapsible detail accordion — one section open at a time */}
            <div className="mt-10">
              {sections.map((section, index) => (
                <AccordionSection
                  key={section.title}
                  title={section.title}
                  open={openSection === index}
                  onToggle={() => setOpenSection((current) => (current === index ? -1 : index))}
                >
                  {section.content}
                </AccordionSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
