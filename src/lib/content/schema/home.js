/**
 * Home page content — hero, two divisions, portfolio highlights,
 * capabilities teaser, certifications block and working-together list.
 */
const home = {
  id: 'home',
  label: 'Home Page',
  description: 'Hero video, division cards, portfolio highlights, capabilities teaser and partnership list.',
  icon: 'home',
  preview: '/',
  sections: [
    {
      id: 'hero',
      label: 'Hero',
      fields: [
        {
          id: 'media',
          label: 'Background video or image',
          type: 'image',
          help: 'Accepts an .mp4 / .webm video URL or an image. Videos autoplay muted and loop.',
          default: 'https://res.cloudinary.com/ac74hfe9/video/upload/v1787638726/herosection.mp4',
        },
        { id: 'titleLine1', label: 'Title — line 1', type: 'text', default: 'Wellness,' },
        { id: 'titleLine2', label: 'Title — line 2', type: 'text', default: 'Inside & Outside.' },
        { id: 'ctaPrimaryLabel', label: 'Primary button label', type: 'text', default: 'EXPLORE NUTRACEUTICALS' },
        { id: 'ctaPrimaryHref', label: 'Primary button link', type: 'url', default: '/nutraceuticals' },
        { id: 'ctaSecondaryLabel', label: 'Secondary button label', type: 'text', default: 'EXPLORE COSMETICS' },
        { id: 'ctaSecondaryHref', label: 'Secondary button link', type: 'url', default: '/cosmetics' },
        { id: 'ctaTertiaryLabel', label: 'Third button label', type: 'text', default: 'ENQUIRE NOW' },
        { id: 'ctaTertiaryHref', label: 'Third button link', type: 'url', default: '/contact' },
        { id: 'scrollLabel', label: 'Scroll indicator label', type: 'text', default: 'Scroll' },
      ],
    },
    {
      id: 'divisions',
      label: 'Two Divisions',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'heading', label: 'Section heading', type: 'textarea', default: 'Two ways we care for you.' },
        {
          id: 'cards',
          label: 'Division cards',
          type: 'list',
          itemLabel: 'Card',
          titleField: 'label',
          fields: [
            { id: 'label', label: 'Eyebrow label', type: 'text', default: '' },
            { id: 'subtitle', label: 'Heading', type: 'text', default: '' },
            { id: 'body', label: 'Body copy', type: 'textarea', default: '' },
            { id: 'cta', label: 'Link label', type: 'text', default: '' },
            { id: 'href', label: 'Link', type: 'url', default: '/' },
            { id: 'image', label: 'Background image', type: 'image', default: '' },
            { id: 'tint', label: 'Overlay tint', type: 'color', default: '#0A260E', help: 'Colour washed over the background image.' },
          ],
          default: [
            {
              label: 'NUTRACEUTICALS',
              subtitle: 'Formulated to be felt.',
              body: 'Immunity, sleep, joints, heart — formulated by life stage, dosed for what the body can absorb.',
              cta: 'Explore Nutraceuticals',
              href: '/nutraceuticals',
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1788197673/Formulated_to_be_felt.jpg',
              tint: '#0A260E',
            },
            {
              label: 'COSMETICS',
              subtitle: 'Formulated to be seen.',
              body: 'Skincare and haircare, formulated clean-label first and reviewed for how they perform on skin.',
              cta: 'Explore Cosmetics',
              href: '/cosmetics',
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1788197210/Formulated_to_be_seen..jpg',
              tint: '#083024',
            },
          ],
        },
      ],
    },
    {
      id: 'portfolio',
      label: 'Portfolio Highlights',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'What we formulate' },
        { id: 'heading', label: 'Heading', type: 'text', default: 'Wellness that does more' },
        {
          id: 'intro',
          label: 'Intro paragraph',
          type: 'textarea',
          default: '',
        },
        {
          id: 'items',
          label: 'Highlighted products',
          type: 'list',
          itemLabel: 'Product',
          titleField: 'name',
          fields: [
            { id: 'name', label: 'Product name', type: 'text', default: '' },
            { id: 'benefit', label: 'Benefit', type: 'text', default: '' },
            { id: 'category', label: 'Category label', type: 'text', default: '' },
            { id: 'image', label: 'Image', type: 'image', default: '' },
            { id: 'href', label: 'Link (optional)', type: 'url', default: '' },
          ],
          default: [
            {
              name: 'Omega-3 EPA + DHA',
              benefit: 'Cardiovascular support',
              category: 'Heart',
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787775498/IMG-20260207-WA0017.jpg',
              href: '',
            },
            { name: 'CoQ10 100mg', benefit: 'Cellular energy production', category: 'Energy', image: '', href: '' },
            { name: 'Collagen Peptides', benefit: 'Skin elasticity & joint mobility', category: 'Beauty', image: '', href: '' },
            { name: 'Probiotic 50B CFU', benefit: 'Gut microbiome balance', category: 'Gut', image: '', href: '' },
            { name: 'Vitamin D3 5000 IU', benefit: 'Bone density & immune regulation', category: 'Immunity', image: '', href: '' },
            { name: 'Multivitamin Complete', benefit: 'Daily nutritional coverage', category: 'Daily', image: '', href: '' },
          ],
        },
        { id: 'itemCtaLabel', label: 'Per-product button label', type: 'text', default: 'Request Sheet' },
        { id: 'itemCtaHref', label: 'Per-product button link', type: 'url', default: '/contact' },
        { id: 'countLabel', label: 'Count label ({count} is replaced)', type: 'text', default: '{count} formulations shown' },
        { id: 'footerCtaLabel', label: 'Footer link label', type: 'text', default: 'View Full Portfolio' },
        { id: 'footerCtaHref', label: 'Footer link', type: 'url', default: '/nutraceuticals' },
      ],
    },
    {
      id: 'capabilities',
      label: 'Capabilities Teaser',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'Manufacturing & Research' },
        {
          id: 'heading',
          label: 'Heading',
          type: 'textarea',
          default: 'Formulation science, proven at manufacturing scale.',
        },
        {
          id: 'intro',
          label: 'Intro paragraph',
          type: 'textarea',
          default:
            'Formulation R&D and manufacturing run under one roof at Zeovus Life. Every formula is developed and refined by our team before it reaches the production line.',
        },
        {
          id: 'features',
          label: 'Feature rows',
          type: 'list',
          itemLabel: 'Feature',
          titleField: 'title',
          fields: [
            {
              id: 'icon',
              label: 'Icon',
              type: 'icon',
              default: 'lightbulb',
            },
            { id: 'title', label: 'Title', type: 'text', default: '' },
            { id: 'body', label: 'Body copy', type: 'textarea', default: '' },
          ],
          default: [
            {
              icon: 'lightbulb',
              title: 'In-House Formulation R&D',
              body: 'Every formula is developed and refined by our team before it reaches the production line.',
            },
            {
              icon: 'settings',
              title: 'Pilot-to-Commercial Manufacturing',
              body: 'From small-batch trials to full commercial runs, without re-engineering the formula.',
            },
            {
              icon: 'shield',
              title: 'Certified Quality on Every Batch',
              body: 'Every line operates under certified quality systems, audited to international benchmarks.',
            },
          ],
        },
        { id: 'ctaLabel', label: 'Link label', type: 'text', default: 'Explore Capabilities' },
        { id: 'ctaHref', label: 'Link', type: 'url', default: '/capabilities' },
        {
          id: 'media',
          label: 'Video or image',
          type: 'image',
          help: 'Accepts an .mp4 / .webm video URL or an image.',
          default: 'https://res.cloudinary.com/ac74hfe9/video/upload/v1787608635/Formulation-science.mp4',
        },
      ],
    },
    {
      id: 'quality',
      label: 'Quality & Certifications',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        {
          id: 'eyebrow',
          label: 'Eyebrow',
          type: 'text',
          default: 'Manufactured in facilities built to global standards',
        },
        { id: 'headingLead', label: 'Heading — line 1', type: 'text', default: 'Quality is not a department.' },
        { id: 'headingAccent', label: 'Heading — line 2 (accent)', type: 'text', default: "It's our DNA." },
        {
          id: 'intro',
          label: 'Intro paragraph',
          type: 'textarea',
          default:
            'Every product passes through facilities verified to global quality, safety and regulatory standards — anchored by our proprietary ZQA framework.',
        },
        { id: 'sealImage', label: 'Seal image', type: 'image', default: '/zqa/seal5.png' },
        { id: 'sealAlt', label: 'Seal alt text', type: 'text', default: 'Zeovus Quality Assurance Seal' },
        {
          id: 'metrics',
          label: 'Metrics',
          type: 'list',
          itemLabel: 'Metric',
          titleField: 'label',
          fields: [
            { id: 'value', label: 'Value', type: 'text', default: '' },
            { id: 'suffix', label: 'Suffix', type: 'text', default: '' },
            { id: 'label', label: 'Label', type: 'text', default: '' },
          ],
          default: [
            { value: '12', suffix: '', label: 'Quality Steps' },
            { value: '825', suffix: '+', label: 'Tested Parameters' },
            { value: '3', suffix: '×', label: 'Layer Verification' },
          ],
        },
        {
          id: 'metricsFootnote',
          label: 'Metrics footnote',
          type: 'textarea',
          default:
            'From raw materials to finished goods — ZQA adds a verification layer at every stage.',
        },
        { id: 'showCertifications', label: 'Show certification carousel', type: 'boolean', default: true },
        { id: 'footerHeading', label: 'Footer heading', type: 'text', default: 'Held to standards you can verify.' },
        {
          id: 'footerBody',
          label: 'Footer body',
          type: 'textarea',
          default:
            'Explore every certification, audit protocol, and compliance framework behind Zeovus manufacturing.',
        },
        { id: 'footerCtaLabel', label: 'Footer link label', type: 'text', default: 'View Manufacturing Standards' },
        { id: 'footerCtaHref', label: 'Footer link', type: 'url', default: '/capabilities' },
      ],
    },
    {
      id: 'partnership',
      label: 'Working Together',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'Built to grow with you.' },
        { id: 'headingLead', label: 'Heading — lead', type: 'text', default: 'We shape what you sell —' },
        {
          id: 'headingAccent',
          label: 'Heading — accent',
          type: 'text',
          default: 'and stay for what comes next.',
        },
        {
          id: 'items',
          label: 'Partnership models',
          type: 'list',
          itemLabel: 'Model',
          titleField: 'title',
          fields: [
            { id: 'title', label: 'Title', type: 'text', default: '' },
            { id: 'description', label: 'Description', type: 'textarea', default: '' },
          ],
          default: [
            {
              title: 'Co-Development & Formulation Innovation',
              description:
                'Bring us your idea, brief or product challenge. We work with you to develop the right formulation.',
            },
            {
              title: 'Private Label & White Label',
              description:
                'Launch products under your own brand, with our support across formulation, sourcing and manufacturing.',
            },
            {
              title: 'Distribution & Regional Partnerships',
              description: 'Take our products into new markets and grow with us as a distribution partner.',
            },
            {
              title: 'Bulk Ingredient & Raw Material Supply',
              description: 'Source the ingredients and raw materials you need, in the quantities your business requires.',
            },
          ],
        },
        { id: 'itemCtaLabel', label: 'Per-row link label', type: 'text', default: 'Enquire' },
        { id: 'itemCtaHref', label: 'Per-row link', type: 'url', default: '/contact' },
        {
          id: 'footnote',
          label: 'Footnote',
          type: 'textarea',
          default: 'All partnership models include dedicated account management and quality assurance.',
        },
      ],
    },
    {
      id: 'seo',
      label: 'SEO',
      fields: [
        { id: 'title', label: 'Page title', type: 'text', default: 'Zeovus Life — Nutraceutical & Cosmetic Manufacturer' },
        {
          id: 'description',
          label: 'Meta description',
          type: 'textarea',
          default:
            'Trusted B2B nutraceutical and cosmetic manufacturer. Formulated to deliver, built to scale. GMP, ISO & HACCP certified.',
        },
      ],
    },
  ],
};

export default home;
