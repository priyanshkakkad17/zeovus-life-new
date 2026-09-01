/** Our Company page content. */
const ourCompany = {
  id: 'ourCompany',
  label: 'Our Company Page',
  description: 'Hero, story timeline, vision & mission, founders note, ZQA, sustainability and social impact.',
  icon: 'building',
  preview: '/our-company',
  sections: [
    {
      id: 'hero',
      label: 'Hero',
      fields: [
        {
          id: 'media',
          label: 'Background video or image',
          type: 'image',
          help: 'Accepts an .mp4 / .webm video URL or an image.',
          default: 'https://res.cloudinary.com/ac74hfe9/video/upload/v1787608494/ourCompanyHero.mp4',
        },
        { id: 'title', label: 'Title', type: 'textarea', default: 'Built to be trusted with wellness.' },
        {
          id: 'subtitle',
          label: 'Subtitle',
          type: 'textarea',
          default:
            'Leading B2B nutraceutical and cosmetic manufacturer with decades of expertise in formulation science and manufacturing excellence.',
        },
        { id: 'ctaLabel', label: 'Button label', type: 'text', default: 'ENQUIRE NOW' },
        { id: 'ctaHref', label: 'Button link', type: 'url', default: '/contact' },
        {
          id: 'stats',
          label: 'Hero stats',
          type: 'list',
          itemLabel: 'Stat',
          titleField: 'label',
          fields: [
            { id: 'value', label: 'Value', type: 'text', default: '' },
            { id: 'label', label: 'Label', type: 'text', default: '' },
          ],
          default: [
            { value: '20+', label: 'Years Experience' },
            { value: '268+', label: 'Formulations' },
            { value: '17', label: 'Certifications' },
          ],
        },
      ],
    },
    {
      id: 'story',
      label: 'Our Story',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'OUR STORY' },
        {
          id: 'heading',
          label: 'Heading',
          type: 'textarea',
          default: 'Bridging Ancient Wisdom with Modern Innovation',
        },
        {
          id: 'timeline',
          label: 'Timeline cards',
          type: 'list',
          itemLabel: 'Stage',
          titleField: 'title',
          fields: [
            { id: 'title', label: 'Title', type: 'text', default: '' },
            { id: 'description', label: 'Description', type: 'textarea', default: '' },
            { id: 'image', label: 'Image', type: 'image', default: '' },
          ],
          default: [
            {
              title: 'It started with Food',
              description: 'Natural ingredients and botanical foundations.',
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787610358/our_story_1_1.png',
            },
            {
              title: 'The standard extended to Life',
              description: 'Scientific formulation and nutraceutical excellence.',
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787610313/our_story_2.png',
            },
            {
              title: 'Today: Global Manufacturing',
              description: 'Manufacturing and formulation across categories, exporting globally.',
              image:
                'https://res.cloudinary.com/ac74hfe9/image/upload/v1788200884/Today_Global_Manufacturing.jpg',
            },
          ],
        },
        {
          id: 'leadParagraph',
          label: 'Lead paragraph',
          type: 'textarea',
          default:
            "Zeovus began with a mission to share India's rich heritage of botanical wellness with the world while embracing cutting-edge nutraceutical science. Today, we stand as one of India's premier B2B supplement manufacturers, trusted by our distributors and importers.",
        },
        {
          id: 'paragraphs',
          label: 'Supporting paragraphs',
          type: 'stringList',
          itemLabel: 'Paragraph',
          multiline: true,
          default: [
            "That trust starts with leadership, over two decades spent inside supplier facilities, regulatory reviews, and formulation rooms across the globe. It's that same judgment that runs every formulation and every batch at Zeovus Life.",
            "What sets us apart is our unique position: we combine India's cost-effective, high-quality manufacturing with a deep understanding of nutraceutical supplements at the molecular level and their synergy, backed by experienced international regulatory expertise.",
            'Zeovus Life is part of the wider Zeovus Group, alongside Food and Vet, three categories, one standard. The same supplier relationships built over years, and the same formulation philosophy held, regardless of the category they\u2019re applied to.',
          ],
        },
        {
          id: 'stats',
          label: 'Stat cards',
          type: 'list',
          itemLabel: 'Stat',
          titleField: 'label',
          fields: [
            { id: 'value', label: 'Value', type: 'text', default: '' },
            { id: 'label', label: 'Label', type: 'text', default: '' },
          ],
          default: [
            { value: '20+', label: 'Years Experience' },
            { value: '268+', label: 'Formulations' },
            { value: '50+', label: 'Countries' },
          ],
        },
      ],
    },
    {
      id: 'visionMission',
      label: 'Vision & Mission',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'WHAT GUIDES US' },
        { id: 'heading', label: 'Heading', type: 'text', default: 'Vision & Mission' },
        { id: 'visionLabel', label: 'Vision card title', type: 'text', default: 'Vision' },
        {
          id: 'visionBody',
          label: 'Vision body',
          type: 'textarea',
          default: 'To make everyday wellness products accessible, trusted and affordable.',
        },
        { id: 'missionLabel', label: 'Mission card title', type: 'text', default: 'Mission' },
        {
          id: 'missionBody',
          label: 'Mission body',
          type: 'textarea',
          default:
            'To help brands bring high-quality nutrition, wellness and personal care products to market through thoughtful formulations, reliable sourcing and manufacturing.',
        },
      ],
    },
    {
      id: 'founders',
      label: 'Note from Founders',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        {
          id: 'eyebrow',
          label: 'Eyebrow',
          type: 'textarea',
          default: 'A NOTE FROM THE PEOPLE BEHIND ZEOVUS LIFE',
        },
        { id: 'heading', label: 'Heading', type: 'text', default: 'Built to do it right.' },
        {
          id: 'openingParagraph',
          label: 'Opening paragraph',
          type: 'textarea',
          default:
            'We started Zeovus Life because we believed great wellness products should be accessible to more people, without compromising on quality.',
        },
        {
          id: 'paragraphs',
          label: 'Supporting paragraphs',
          type: 'stringList',
          itemLabel: 'Paragraph',
          multiline: true,
          default: [
            "We've spent years working with ingredients, formulations and manufacturing partners, learning that the small things matter: where an ingredient comes from, how it is tested, how a product is made, and what finally goes into the bottle.",
            "We don't make products just to fill a shelf. We work with brands to build supplements and cosmetics that are well formulated, responsibly sourced and made to the standards they deserve.",
          ],
        },
        {
          id: 'closingLine',
          label: 'Closing line',
          type: 'textarea',
          default: "That's what Zeovus Life is here to do.",
        },
      ],
    },
    {
      id: 'audience',
      label: 'Who We Build With',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'WHO WE SERVE' },
        { id: 'heading', label: 'Heading', type: 'text', default: 'Who We Build With' },
        {
          id: 'intro',
          label: 'Intro paragraph',
          type: 'textarea',
          default:
            'We work with businesses looking for reliable products, strong formulations and a partner they can grow with.',
        },
        {
          id: 'items',
          label: 'Audience rows',
          type: 'list',
          itemLabel: 'Row',
          titleField: 'title',
          fields: [
            { id: 'title', label: 'Title', type: 'text', default: '' },
            { id: 'description', label: 'Description', type: 'textarea', default: '' },
          ],
          default: [
            { title: 'Retailers', description: 'Need reliable products that keep your shelves moving.' },
            { title: 'Distributors', description: 'Need consistent products you can take to new markets.' },
            { title: 'Private Label Brands', description: 'Need quality products built for your brand.' },
            { title: 'Emerging & D2C Brands', description: 'Need the right partner to turn ideas into products.' },
            {
              title: 'Purpose-Led Founders',
              description: "Turned a personal problem into a brand because the product they needed didn't exist yet.",
            },
          ],
        },
      ],
    },
    {
      id: 'slogan',
      label: 'Slogan Banner',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'lineOne', label: 'Line 1', type: 'text', default: 'If your business runs on trust,' },
        { id: 'lineTwo', label: 'Line 2 (accent)', type: 'text', default: "we're already built for it." },
      ],
    },
    {
      id: 'zqa',
      label: 'Global Standards / ZQA',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'GLOBAL STANDARDS' },
        {
          id: 'heading',
          label: 'Heading',
          type: 'textarea',
          default: 'Zeovus Quality Assurance (ZQA) is the standard. Everything else is proof of it.',
        },
        {
          id: 'paragraphs',
          label: 'Body paragraphs',
          type: 'stringList',
          itemLabel: 'Paragraph',
          multiline: true,
          default: [
            'We manufacture supplements and cosmetics through facilities built to global quality, safety and regulatory standards. Every product is then evaluated through Zeovus Quality Assurance (ZQA), our 12-step quality framework covering 825+ verified and validated parameters.',
            'From raw materials to finished products, ZQA uses three layers of checks across incoming materials, in-process production and finished goods — covering identity, purity, microbiological safety, contaminants, stability, packaging and more.',
            "Beneath ZQA sit the global standards the industry expects as a baseline — FDA, cGMP, BRCGS, IFS and more. We don't treat them as boxes to check. They're the foundation, ZQA is built upon.",
          ],
        },
        { id: 'ctaLabel', label: 'Link label', type: 'text', default: 'View our Standards' },
        { id: 'ctaHref', label: 'Link', type: 'url', default: '/capabilities' },
        { id: 'sealImage', label: 'Seal image', type: 'image', default: '/zqa/seal5.png' },
        {
          id: 'stages',
          label: 'Verification stages',
          type: 'stringList',
          itemLabel: 'Stage',
          default: ['Raw Materials', 'In-Process', 'Finished Goods'],
        },
        {
          id: 'checks',
          label: 'Quality check chips',
          type: 'stringList',
          itemLabel: 'Check',
          default: ['Identity', 'Purity', 'Microbiological Safety', 'Contaminants', 'Stability', 'Packaging'],
        },
        {
          id: 'proofPoints',
          label: 'Proof points',
          type: 'stringList',
          itemLabel: 'Proof point',
          default: ['12-step quality framework', '825+ verified and validated parameters'],
        },
      ],
    },
    {
      id: 'certifications',
      label: 'Certifications Grid',
      description: 'The certification list itself is managed under Global & Layout → Certifications.',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'heading', label: 'Heading', type: 'text', default: 'Certifications & Compliance' },
      ],
    },
    {
      id: 'sustainability',
      label: 'Sustainability',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'SUSTAINABILITY' },
        {
          id: 'heading',
          label: 'Heading',
          type: 'textarea',
          default: 'Committed to the preservation and protection of the global environment.',
        },
        {
          id: 'paragraphs',
          label: 'Body paragraphs',
          type: 'stringList',
          itemLabel: 'Paragraph',
          multiline: true,
          default: [
            'We manufacture nutraceutical and cosmetic formulations that promote the health and well-being of consumers in an environmentally positive manner.',
            'That commitment starts with our ingredient suppliers — we work with partners who take sourcing, sustainable harvesting and fair trade as seriously as we do. Across our manufacturing operations, we hold ourselves to material and energy practices that reduce our footprint at every stage, from packaging through to production.',
            "Sustainability isn't a claim we make once. It's a standard we hold our suppliers, our facilities and our formulations to — consistently.",
          ],
        },
      ],
    },
    {
      id: 'socialImpact',
      label: 'Beyond Manufacturing',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'SOCIAL IMPACT' },
        { id: 'heading', label: 'Heading', type: 'text', default: 'Beyond Manufacturing' },
        {
          id: 'intro',
          label: 'Intro paragraph',
          type: 'textarea',
          default:
            'We commit 1% of our profits to programs supporting child nutrition, education, and stronger communities because the places we source from and the world we manufacture for have always been the same world.',
        },
        {
          id: 'pillars',
          label: 'Impact pillars',
          type: 'list',
          itemLabel: 'Pillar',
          titleField: 'label',
          fields: [
            { id: 'icon', label: 'Icon', type: 'icon', default: 'heart' },
            { id: 'label', label: 'Label', type: 'text', default: '' },
          ],
          default: [
            { icon: 'gift', label: 'Child Nutrition' },
            { icon: 'book', label: 'Education' },
            { icon: 'users', label: 'Communities' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'SEO',
      fields: [
        { id: 'title', label: 'Page title', type: 'text', default: 'Our Company — Zeovus Life' },
        {
          id: 'description',
          label: 'Meta description',
          type: 'textarea',
          default:
            'Decades of formulation and manufacturing expertise, one quality standard. Meet the company behind Zeovus Life.',
        },
      ],
    },
  ],
};

export default ourCompany;
