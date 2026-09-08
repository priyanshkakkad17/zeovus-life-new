export const DEFAULT_SITE_URL = 'https://zeovuslife.com';
export const DEFAULT_SOCIAL_IMAGE = '/navbar_logo.png';

export function safeSiteUrl(value) {
  try {
    return new URL(value || DEFAULT_SITE_URL).toString().replace(/\/$/, '');
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function absoluteUrl(path = '/', siteUrl = DEFAULT_SITE_URL) {
  const base = safeSiteUrl(siteUrl);
  return new URL(path, `${base}/`).toString();
}

const META_CTA_OPTIONS = [
  ' Request a tailored brief today.',
  ' Contact Zeovus Life today.',
  ' Contact us today.',
  ' Start today.',
];

export function normalizeMetaDescription(value) {
  const description = String(value || '').trim();
  const withoutTrailingCta = description.replace(/\s+(?:contact|start|request|talk to)[^.]{0,50}\.$/i, '').trim();
  const base = withoutTrailingCta || description;
  const cta = META_CTA_OPTIONS.find((candidate) => base.length + candidate.length >= 150 && base.length + candidate.length <= 160);
  if (cta) return `${base}${cta}`;

  let expanded = base;
  while (expanded.length < 150) expanded += ' Contact us today.';
  if (expanded.length <= 160) return expanded;
  return `${expanded.slice(0, 157).trimEnd()}...`;
}

export function buildPageMetadata({ title, description, path = '/', siteUrl, image = DEFAULT_SOCIAL_IMAGE }) {
  const normalizedDescription = normalizeMetaDescription(description);
  const url = absoluteUrl(path, siteUrl);
  const imageUrl = absoluteUrl(image, siteUrl);
  return {
    title,
    description: normalizedDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: normalizedDescription,
      url,
      siteName: 'Zeovus Life',
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${title} — Zeovus Life` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: normalizedDescription,
      images: [imageUrl],
    },
  };
}

export function organizationJsonLd(siteUrl = DEFAULT_SITE_URL) {
  const url = safeSiteUrl(siteUrl);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zeovus Life',
    legalName: 'Zeovus Ventures Private Limited',
    url,
    logo: absoluteUrl('/navbar_logo.png', url),
    sameAs: [
      'https://www.instagram.com/zeovusworld',
      'https://www.linkedin.com/company/zeovus-ventures-pvt-ltd/',
    ],
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Unit No. 419, 4th Floor, Master Mind V, Royal Palms Estate, Aarey Milk Colony, Goregaon (East)',
        addressLocality: 'Mumbai',
        postalCode: '400065',
        addressCountry: 'IN',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: '11634 Ecclesia Drive',
        addressLocality: 'Tampa',
        addressRegion: 'FL',
        postalCode: '33626',
        addressCountry: 'US',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'West Bay, Doha',
        addressCountry: 'QA',
      },
    ],
    email: 'info@zeovuslife.com',
  };
}
