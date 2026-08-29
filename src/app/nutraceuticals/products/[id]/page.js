'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

function splitValues(value, separator) {
  return value ? value.split(separator).map((item) => item.trim()).filter(Boolean) : [];
}

function ProductImage({ product, colorFrom, colorTo }) {
  const [imageError, setImageError] = useState(false);
  const hasImage = Boolean(product.image_url) && !imageError;

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary-dark/[0.08]" style={{ background: `linear-gradient(135deg, ${colorFrom}25, ${colorTo}38)` }}>
      {hasImage ? (
        <img
          src={product.image_url}
          alt={product.name}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/25 blur-3xl" />
          <div className="absolute -bottom-20 -left-12 h-60 w-60 rounded-full bg-primary-dark/10 blur-3xl" />
          <div className="relative flex h-full items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-[30px] border border-white/50 bg-white/60 text-primary-dark shadow-lg backdrop-blur-sm">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.35} d="M9.75 3.75h4.5m-6 0h7.5m-9 0v3.5c0 .9-.32 1.77-.9 2.46l-1.92 2.27a3 3 0 00-.7 1.94v3.33A3.75 3.75 0 006.83 21h10.34A3.75 3.75 0 0021 17.25v-3.33a3 3 0 00-.7-1.94l-1.92-2.27a3.8 3.8 0 01-.88-2.46v-3.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.35} d="M7.5 14.25h9" /></svg>
            </div>
          </div>
        </>
      )}
      {product.status === 'Verified' && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 font-heading text-[10px] font-semibold uppercase tracking-[0.8px] text-primary-dark shadow-sm backdrop-blur-md">
          <svg className="h-3.5 w-3.5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="m5 12 4 4L19 6" /></svg>
          Verified
        </span>
      )}
    </div>
  );
}

function DetailSection({ title, children }) {
  return (
    <section className="border-t border-neutral-100 pt-7">
      <h2 className="font-heading text-[12px] font-bold uppercase tracking-[1.6px] text-primary-dark">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ProductDetailPage() {
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
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message || 'Product not found');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="animate-pulse">
            <div className="h-4 w-40 rounded bg-neutral-100" />
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div className="aspect-[4/3] rounded-2xl bg-neutral-100" />
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
          <Link href="/nutraceuticals" className="mt-7 inline-flex items-center gap-2 font-heading text-[12px] font-semibold uppercase tracking-[1px] text-primary-light">
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
  const formats = splitValues(product.manufacturing_formats, '|');
  const technologies = splitValues(product.dds_delivery_tech, '|');
  const backHref = `/nutraceuticals?category=${product.category_slug}`;

  return (
    <main className="min-h-screen bg-white pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Link href={backHref} className="group inline-flex items-center gap-2 font-heading text-[11px] font-semibold uppercase tracking-[1px] text-neutral-500 transition-colors hover:text-primary-dark">
          <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m0 0 6-6m-6 6 6 6" /></svg>
          Back to {product.category_name}
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <ProductImage product={product} colorFrom={colorFrom} colorTo={colorTo} />

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-heading text-[10px] font-bold uppercase tracking-[1.5px] text-primary-light">
              <span>{product.category_name}</span>
              {product.subcategory_name && <><span className="h-1 w-1 rounded-full bg-primary-light/50" /><span>{product.subcategory_name}</span></>}
            </div>
            <h1 className="mt-5 font-heading text-[38px] font-bold leading-[1.04] tracking-[-1.2px] text-primary-dark sm:text-[50px] lg:text-[58px]">{product.name}</h1>
            {product.brand_line && <p className="mt-4 font-heading text-[13px] font-semibold uppercase tracking-[1.2px] text-primary-light">{product.brand_line}</p>}
            {product.primary_benefit && <p className="mt-6 max-w-[620px] text-[16px] leading-relaxed text-neutral-600 sm:text-[17px]">{product.primary_benefit}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-[3px] bg-primary-dark px-5 py-3 font-heading text-[11px] font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-primary-light">
                Ask about this product
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17 17 7M7 7h10v10" /></svg>
              </Link>
              <span className="inline-flex items-center rounded-[3px] border border-neutral-200 px-4 py-3 font-heading text-[10px] font-semibold uppercase tracking-[1px] text-neutral-500">Product ID {product.id}</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-9">
            {keyActives.length > 0 && (
              <DetailSection title="Key actives">
                <div className="flex flex-wrap gap-2">
                  {keyActives.map((active, index) => <span key={index} className="rounded-full border border-primary-light/20 bg-primary-light/[0.06] px-3 py-1.5 text-[12px] font-medium text-primary-dark">{active}</span>)}
                </div>
              </DetailSection>
            )}
            {product.secondary_benefits && (
              <DetailSection title="Additional support">
                <p className="max-w-[760px] text-[15px] leading-relaxed text-neutral-600">{product.secondary_benefits}</p>
              </DetailSection>
            )}
            {formats.length > 0 && (
              <DetailSection title="Available formats">
                <div className="flex flex-wrap gap-2">
                  {formats.map((format, index) => <span key={index} className="rounded-full bg-neutral-100 px-3 py-1.5 text-[12px] font-medium text-neutral-700">{format}</span>)}
                </div>
              </DetailSection>
            )}
            {technologies.length > 0 && (
              <DetailSection title="Delivery technology">
                <div className="flex flex-wrap gap-2">
                  {technologies.map((technology, index) => <span key={index} className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-600">{technology}</span>)}
                </div>
              </DetailSection>
            )}
          </div>

          <aside className="h-fit rounded-2xl bg-[#f5f9f6] p-6 sm:p-7">
            <p className="font-heading text-[10px] font-bold uppercase tracking-[1.8px] text-primary-light">Product information</p>
            <dl className="mt-5 space-y-4 text-[13px]">
              <div className="flex items-start justify-between gap-6 border-b border-primary-dark/[0.08] pb-3"><dt className="text-neutral-500">Category</dt><dd className="text-right font-medium text-primary-dark">{product.category_name}</dd></div>
              {product.subcategory_name && <div className="flex items-start justify-between gap-6 border-b border-primary-dark/[0.08] pb-3"><dt className="text-neutral-500">Subcategory</dt><dd className="text-right font-medium text-primary-dark">{product.subcategory_name}</dd></div>}
              {product.brand_line && <div className="flex items-start justify-between gap-6 border-b border-primary-dark/[0.08] pb-3"><dt className="text-neutral-500">Brand line</dt><dd className="text-right font-medium text-primary-dark">{product.brand_line}</dd></div>}
              <div className="flex items-start justify-between gap-6"><dt className="text-neutral-500">Record status</dt><dd className="font-medium text-primary-dark">{product.status || '—'}</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </main>
  );
}
