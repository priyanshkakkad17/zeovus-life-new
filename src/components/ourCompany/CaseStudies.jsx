'use client';

import Link from 'next/link';

const caseStudies = [
  {
    label: 'US wellness brand',
    category: 'Gut health',
    format: 'Multi-strain probiotic capsules',
    timeline: 'Formulation, stability planning and commercial production',
    outcome: 'A shelf-ready digestive wellness range with documented ingredient specifications and a repeatable quality plan.',
  },
  {
    label: 'Gulf-region distributor',
    category: 'Daily nutrition',
    format: 'Age-targeted multivitamin tablets',
    timeline: 'Portfolio brief through export documentation review',
    outcome: 'A foundational nutrition line structured for clear audience segmentation, practical serving sizes and regional distribution.',
  },
  {
    label: 'European beauty company',
    category: 'Beauty from within',
    format: 'Collagen and hyaluronic acid powder',
    timeline: 'Concept refinement, flavour direction and pilot-to-scale planning',
    outcome: 'A premium nutricosmetic format designed around daily use, sensory acceptance and a defined packaging brief.',
  },
  {
    label: 'Emerging personal-care brand',
    category: 'Skincare',
    format: 'Vitamin C and hyaluronic acid serum',
    timeline: 'Base selection, active compatibility and cosmetic stability review',
    outcome: 'A differentiated serum concept with a defined texture, packaging direction and manufacturing route.',
  },
];

export default function CaseStudies() {
  return (
    <section className="bg-primary-dark px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28" aria-labelledby="case-studies-heading">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 font-heading text-[11px] font-bold uppercase tracking-[2.5px] text-secondary">Representative engagements</p>
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <h2 id="case-studies-heading" className="max-w-[700px] font-heading text-[32px] font-bold uppercase leading-[1.04] tracking-[-1px] sm:text-[44px] lg:text-[54px]">Built for the brief, ready for the market.</h2>
          <p className="max-w-[380px] text-[14px] leading-relaxed text-white/65">Anonymized examples show the kinds of category, format and development questions our team helps buyers work through. Specific outcomes vary by brief and market.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {caseStudies.map((study) => (
            <article key={study.label} className="flex min-h-[330px] flex-col border-t border-white/20 pt-5">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[1.7px] text-secondary">{study.label}</p>
              <h3 className="mt-4 font-heading text-[21px] font-bold leading-tight">{study.category}</h3>
              <dl className="mt-7 space-y-4 text-[13px] leading-relaxed text-white/70">
                <div><dt className="font-semibold text-white/45">Format</dt><dd>{study.format}</dd></div>
                <div><dt className="font-semibold text-white/45">Scope</dt><dd>{study.timeline}</dd></div>
                <div><dt className="font-semibold text-white/45">Outcome</dt><dd>{study.outcome}</dd></div>
              </dl>
            </article>
          ))}
        </div>
        <Link href="/contact" className="mt-12 inline-flex items-center gap-3 font-heading text-[12px] font-semibold uppercase tracking-[1.5px] text-secondary underline decoration-secondary/50 underline-offset-4">Discuss your product brief <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
