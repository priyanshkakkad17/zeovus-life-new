/**
 * Global / site-wide content: branding, navigation, footer, shared certification
 * list and default SEO metadata.
 *
 * Every field declared here becomes an editable input in /admin/content.
 * The `default` value is what the site renders until an admin overrides it.
 */
const site = {
  id: 'site',
  label: 'Global & Layout',
  description: 'Branding, header navigation, footer, shared certifications and default SEO.',
  icon: 'globe',
  sections: [
    {
      id: 'brand',
      label: 'Branding',
      description: 'Logo and the tagline shown beside it in the header.',
      fields: [
        { id: 'logo', label: 'Logo', type: 'image', default: '/logo.png' },
        { id: 'logoAlt', label: 'Logo alt text', type: 'text', default: 'Zeovus Life' },
        { id: 'tagline', label: 'Header tagline', type: 'text', default: 'Committed to better tomorrow' },
        { id: 'showTagline', label: 'Show header tagline', type: 'boolean', default: true },
      ],
    },
    {
      id: 'nav',
      label: 'Header Navigation',
      fields: [
        {
          id: 'items',
          label: 'Menu items',
          type: 'list',
          itemLabel: 'Menu item',
          titleField: 'name',
          fields: [
            { id: 'name', label: 'Label', type: 'text', default: '' },
            { id: 'href', label: 'Link', type: 'url', default: '/' },
            { id: 'hasDropdown', label: 'Show chevron', type: 'boolean', default: false },
          ],
          default: [
            { name: 'Home', href: '/', hasDropdown: false },
            { name: 'Our Company', href: '/our-company', hasDropdown: false },
            { name: 'Capabilities', href: '/capabilities', hasDropdown: false },
            { name: 'Nutraceuticals', href: '/nutraceuticals', hasDropdown: true },
            { name: 'Cosmetics', href: '/cosmetics', hasDropdown: true },
            { name: 'FAQ', href: '/faq', hasDropdown: false },
            { name: 'Working Together', href: '/contact', hasDropdown: false },
          ],
        },
      ],
    },
    {
      id: 'footerCta',
      label: 'Footer — Call to Action Card',
      fields: [
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: "Let's Create Together" },
        { id: 'heading', label: 'Heading', type: 'textarea', default: 'Your next breakthrough product starts here.' },
        {
          id: 'body',
          label: 'Body copy',
          type: 'textarea',
          default:
            'From formulation to final product — partner with a manufacturer that delivers science, quality, and scale.',
        },
        { id: 'buttonLabel', label: 'Button label', type: 'text', default: 'Start a Conversation' },
        { id: 'buttonHref', label: 'Button link', type: 'url', default: '/contact' },
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
      ],
    },
    {
      id: 'footer',
      label: 'Footer — Columns & Contact',
      fields: [
        {
          id: 'brandBlurb',
          label: 'Brand blurb',
          type: 'textarea',
          default: '',
        },
        { id: 'companyHeading', label: '"Company" column heading', type: 'text', default: 'Company' },
        {
          id: 'companyLinks',
          label: 'Company links',
          type: 'list',
          itemLabel: 'Link',
          titleField: 'name',
          fields: [
            { id: 'name', label: 'Label', type: 'text', default: '' },
            { id: 'href', label: 'Link', type: 'url', default: '/' },
          ],
          default: [
            { name: 'Home', href: '/' },
            { name: 'Our Company', href: '/our-company' },
            { name: 'Capabilities', href: '/capabilities' },
            { name: 'Nutraceuticals', href: '/nutraceuticals' },
            { name: 'Cosmetics', href: '/cosmetics' },
            { name: 'FAQ', href: '/faq' },
            { name: 'Contact', href: '/contact' },
          ],
        },
        { id: 'nutraceuticalsHeading', label: '"Nutraceuticals" column heading', type: 'text', default: 'Nutraceuticals' },
        {
          id: 'nutraceuticalsLinks',
          label: 'Nutraceuticals links',
          type: 'list',
          itemLabel: 'Link',
          titleField: 'name',
          fields: [
            { id: 'name', label: 'Label', type: 'text', default: '' },
            { id: 'href', label: 'Link', type: 'url', default: '/nutraceuticals' },
          ],
          default: [
            { name: 'Healthy Ageing', href: '/nutraceuticals?category=healthy-ageing' },
            { name: 'Multivitamins', href: '/nutraceuticals?category=multivitamins' },
            { name: 'Gut Health', href: '/nutraceuticals?category=gut-health' },
            { name: "Women's Health", href: '/nutraceuticals?category=womens-health' },
            { name: "Men's Health", href: '/nutraceuticals?category=mens-health' },
            { name: 'Brain, Stress & Sleep', href: '/nutraceuticals?category=brain-stress-sleep' },
            { name: 'Immunity & Respiratory', href: '/nutraceuticals?category=immunity' },
            { name: 'Joint & Bone Health', href: '/nutraceuticals?category=joint-bone' },
          ],
        },
        { id: 'cosmeticsHeading', label: '"Cosmetics" column heading', type: 'text', default: 'Cosmetics' },
        {
          id: 'cosmeticsLinks',
          label: 'Cosmetics links',
          type: 'list',
          itemLabel: 'Link',
          titleField: 'name',
          fields: [
            { id: 'name', label: 'Label', type: 'text', default: '' },
            { id: 'href', label: 'Link', type: 'url', default: '/cosmetics' },
          ],
          default: [
            { name: 'Skincare', href: '/cosmetics?category=skincare' },
            { name: 'Haircare', href: '/cosmetics?category=haircare' },
            { name: 'Sun Care', href: '/cosmetics?category=sun-care' },
            { name: 'Body Care', href: '/cosmetics?category=body-care' },
          ],
        },
        { id: 'contactHeading', label: '"Contact" column heading', type: 'text', default: 'Contact' },
        { id: 'groupHeading', label: '"Group" column heading', type: 'text', default: 'Group' },
        {
          id: 'groupLinks',
          label: 'Group links',
          type: 'list',
          itemLabel: 'Link',
          titleField: 'name',
          fields: [
            { id: 'name', label: 'Label', type: 'text', default: '' },
            { id: 'href', label: 'Link (leave blank for plain text)', type: 'url', default: '' },
            { id: 'external', label: 'Opens in new tab', type: 'boolean', default: false },
          ],
          default: [
            { name: 'Zeovus Group', href: '', external: false },
            { name: 'Zeovus Food', href: 'https://www.zeovusfood.com/', external: true },
          ],
        },
        {
          id: 'copyright',
          label: 'Copyright line ({year} is replaced automatically)',
          type: 'text',
          default: '© {year} Zeovus Ventures Private Limited All rights reserved.',
        },
        {
          id: 'legalLinks',
          label: 'Legal links',
          type: 'list',
          itemLabel: 'Link',
          titleField: 'name',
          fields: [
            { id: 'name', label: 'Label', type: 'text', default: '' },
            { id: 'href', label: 'Link', type: 'url', default: '#' },
          ],
          default: [
            { name: 'Privacy Policy', href: '/privacy-policy' },
            { name: 'Cookie Policy', href: '/cookie-policy' },
          ],
        },
      ],
    },
    {
      id: 'contactInfo',
      label: 'Contact Details',
      description: 'Used in the footer and anywhere contact details appear.',
      fields: [
        { id: 'email', label: 'Email address', type: 'text', default: 'info@zeovuslife.com' },
        { id: 'phone', label: 'Phone number', type: 'text', default: '' },
        { id: 'address', label: 'Address', type: 'textarea', default: '' },
      ],
    },
    {
      id: 'social',
      label: 'Social Links',
      fields: [
        {
          id: 'items',
          label: 'Social profiles',
          type: 'list',
          itemLabel: 'Profile',
          titleField: 'platform',
          fields: [
            {
              id: 'platform',
              label: 'Platform',
              type: 'select',
              options: ['twitter', 'instagram', 'linkedin', 'facebook', 'youtube'],
              default: 'linkedin',
            },
            { id: 'href', label: 'Profile URL', type: 'url', default: '#' },
          ],
          default: [
            { platform: 'instagram', href: 'https://www.instagram.com/zeovusworld?igsh=MWs2ZWszemxmOTV3aw==' },
            { platform: 'linkedin', href: 'https://www.linkedin.com/company/zeovus-ventures-pvt-ltd/' },
          ],
        },
      ],
    },
    {
      id: 'certifications',
      label: 'Certifications (shared)',
      description:
        'One list powering the home page, capabilities page and our company page. Leave the logo blank to render the label as text.',
      fields: [
        {
          id: 'items',
          label: 'Certifications',
          type: 'list',
          itemLabel: 'Certification',
          titleField: 'label',
          fields: [
            { id: 'label', label: 'Label', type: 'text', default: '' },
            { id: 'logo', label: 'Logo', type: 'image', default: '' },
          ],
          default: [
            { label: 'GMP', logo: '/logo/gmp.png' },
            { label: 'ISO', logo: '/logo/ISO-Logo.png' },
            { label: 'HACCP', logo: '/logo/haccp.png' },
            { label: 'FSSC 22000', logo: '/logo/iso22000.png' },
            { label: 'BRCGS', logo: '/logo/brcgs.png' },
            { label: 'IFS', logo: '/logo/ifs-logo.png' },
            { label: 'US FDA', logo: '/logo/usfda.png' },
            { label: 'ISO 22716', logo: '/logo/iso 22716-2007.png' },
            { label: 'COSMOS', logo: '/logo/cosmos-standard.png' },
            { label: 'HALAL', logo: '/logo/halal.png' },
            { label: 'KOSHER', logo: '/logo/kosher.png' },
            { label: 'ORGANIC', logo: '/logo/organic.png' },
            { label: 'NON-GMO', logo: '/logo/non gmo project copy.jpg' },
            { label: 'REACH', logo: '/logo/reach-compliant copy.png' },
            { label: 'NSF', logo: '/logo/nsf.png' },
            { label: 'LEAPING BUNNY', logo: '/logo/leaping_bunny.png' },
            { label: 'VEGAN', logo: '/logo/vegan.webp' },
            { label: 'FSSAI', logo: '/logo/fssai.png' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'Default SEO',
      fields: [
        { id: 'title', label: 'Default page title', type: 'text', default: 'Zeovus Life - Wellness Products Manufacturer' },
        {
          id: 'description',
          label: 'Default meta description',
          type: 'textarea',
          default:
            'Trusted B2B nutraceutical and cosmetic manufacturer. Formulated to deliver, built to scale.',
        },
        { id: 'siteName', label: 'Site name', type: 'text', default: 'Zeovus Life' },
        { id: 'siteUrl', label: 'Canonical site URL', type: 'url', default: 'https://zeovuslife.com' },
        { id: 'favicon', label: 'Favicon', type: 'image', default: '/Tab-Fevicon-clean.png' },
      ],
    },
  ],
};

export default site;
