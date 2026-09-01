/** Capabilities page content. */
const capabilities = {
  id: 'capabilities',
  label: 'Capabilities Page',
  description: 'Hero stats, the two pillars, format directories and the eight-step process.',
  icon: 'beaker',
  preview: '/capabilities',
  sections: [
    {
      id: 'hero',
      label: 'Hero',
      fields: [
        { id: 'titleLead', label: 'Title — line 1', type: 'text', default: 'Proven in research.' },
        { id: 'titleAccent', label: 'Title — line 2 (accent)', type: 'text', default: 'Built to scale.' },
        { id: 'ctaPrimaryLabel', label: 'Primary button label', type: 'text', default: 'ENQUIRE NOW' },
        { id: 'ctaPrimaryHref', label: 'Primary button link', type: 'url', default: '/contact' },
        { id: 'ctaSecondaryLabel', label: 'Secondary button label', type: 'text', default: 'SEE OUR PROCESS' },
        { id: 'ctaSecondaryHref', label: 'Secondary button link', type: 'url', default: '#process' },
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
            { value: '8', label: 'Step Process' },
            { value: '17', label: 'Certifications' },
          ],
        },
      ],
    },
    {
      id: 'pillars',
      label: 'Pillar Navigation',
      fields: [
        { id: 'oneLabel', label: 'Pillar 1 label', type: 'text', default: 'Innovation' },
        { id: 'twoLabel', label: 'Pillar 2 label', type: 'text', default: 'Manufacturing' },
        { id: 'note', label: 'Sidebar note', type: 'textarea', default: 'Two disciplines. One quality standard.' },
      ],
    },
    {
      id: 'innovation',
      label: '01 — Innovation',
      fields: [
        {
          id: 'heading',
          label: 'Heading',
          type: 'textarea',
          default: 'Where formulation science meets real-world performance.',
        },
        {
          id: 'intro',
          label: 'Intro paragraph',
          type: 'textarea',
          default:
            "Zeovus Life's in-house formulation team is adept at turning ideas into expertly formulated nutraceutical and cosmetic products. We specialise in custom formulation across gummies, softgels and tablets, alongside serums, lotions and other topical formats, each developed with the same clinical rigour, whatever the format.",
        },
        {
          id: 'facts',
          label: 'At-a-glance facts',
          type: 'stringList',
          itemLabel: 'Fact',
          default: [
            'Formulation and regulatory science developed together, not sequentially',
            'Pilot-batch validation before every scale-up',
            'Continuous evaluation of next-generation delivery technology',
          ],
        },
        {
          id: 'formulationHeading',
          label: 'List 1 heading',
          type: 'text',
          default: 'Formulation Design & Delivery Science',
        },
        {
          id: 'formulationItems',
          label: 'List 1 items',
          type: 'stringList',
          itemLabel: 'Item',
          default: [
            'In-house formulation team working from clinical literature',
            'Liposomal, nanoemulsion and microencapsulation systems',
            'Biomimetic emulsion design and sensory/texture optimisation',
            'Continuous evaluation of next-generation delivery technology',
          ],
        },
        { id: 'testingHeading', label: 'List 2 heading', type: 'text', default: 'Testing & Validation' },
        {
          id: 'testingItems',
          label: 'List 2 items',
          type: 'stringList',
          itemLabel: 'Item',
          default: [
            'Compatibility and accelerated-ageing studies',
            'Particle size and encapsulation efficiency testing',
            'Pilot-batch trials before any scale-up',
            'Release-profile testing at every stage',
          ],
        },
        {
          id: 'quote',
          label: 'Pull quote',
          type: 'textarea',
          default: 'Every format is developed with the same clinical rigour.',
        },
        { id: 'regulatoryHeading', label: 'Regulatory heading', type: 'text', default: 'Regulatory Science' },
        {
          id: 'regulatoryItems',
          label: 'Regulatory items',
          type: 'stringList',
          itemLabel: 'Item',
          default: [
            'Formulated in line with global compliance frameworks',
            'Every claim backed by measurable, label-ready specificity',
            'Built to meet the requirements of its target market',
          ],
        },
      ],
    },
    {
      id: 'manufacturing',
      label: '02 — Manufacturing',
      fields: [
        {
          id: 'heading',
          label: 'Heading',
          type: 'textarea',
          default: 'Manufacturing built for every format, at scale.',
        },
        {
          id: 'intro',
          label: 'Intro paragraph',
          type: 'textarea',
          default:
            'Zeovus Life manufactures nutraceuticals and cosmetics across every major format on the market today, inside GMP, ISO- and HACCP-certified, allergen-controlled facilities — with capacity that scales from first sample to full commercial volume without ever changing partners.',
        },
        {
          id: 'facts',
          label: 'At-a-glance facts',
          type: 'stringList',
          itemLabel: 'Fact',
          default: [
            'Multiple production lines running in parallel across both divisions',
            'Pilot-to-commercial scale-up without changing manufacturing partners',
            'GMP-certified, allergen-controlled, machine-vision quality control',
          ],
        },
        { id: 'nutraHeading', label: 'Nutraceutical formats heading', type: 'text', default: 'Nutraceutical Formats' },
        {
          id: 'nutraFormats',
          label: 'Nutraceutical formats',
          type: 'list',
          itemLabel: 'Format',
          titleField: 'name',
          fields: [
            { id: 'name', label: 'Name', type: 'text', default: '' },
            { id: 'desc', label: 'Description', type: 'text', default: '' },
          ],
          default: [
            { name: 'Capsules', desc: 'Hard-shell and softgel capsules with various fill types' },
            { name: 'Tablets', desc: 'Compressed tablets including chewable and effervescent' },
            { name: 'Gummies', desc: 'Chewable gummies in various shapes and flavors' },
            { name: 'Softgels', desc: 'Oil-based formulations in softgel shells' },
            { name: 'Powder Sachets', desc: 'Stick packs and sachets for easy consumption' },
            { name: 'Oral Dissolving Strips', desc: 'Fast-dissolving strips for quick absorption' },
            { name: 'Transdermal Patches', desc: 'Patches for controlled release delivery' },
            { name: 'Liquid Shots', desc: 'Ready-to-drink ampoules and shots' },
          ],
        },
        { id: 'nutraCtaLabel', label: 'Nutraceutical link label', type: 'text', default: 'Explore Nutraceuticals' },
        { id: 'nutraCtaHref', label: 'Nutraceutical link', type: 'url', default: '/nutraceuticals' },
        { id: 'cosmeticsHeading', label: 'Cosmetics formats heading', type: 'text', default: 'Cosmetics Formats' },
        {
          id: 'cosmeticsFormats',
          label: 'Cosmetics formats',
          type: 'list',
          itemLabel: 'Format',
          titleField: 'name',
          fields: [
            { id: 'name', label: 'Name', type: 'text', default: '' },
            { id: 'desc', label: 'Description', type: 'text', default: '' },
          ],
          default: [
            { name: 'Creams & Lotions', desc: 'Emulsions for skin application' },
            { name: 'Serums', desc: 'High-concentration active formulations' },
            { name: 'Sun Care', desc: 'SPF formulations and after-sun products' },
            { name: 'Hair Care', desc: 'Shampoos, conditioners, and treatments' },
            { name: 'Body Care', desc: 'Body lotions, butters, and oils' },
            { name: 'Facial Masks', desc: 'Sheet masks and wash-off formulations' },
            { name: 'Topical Oils', desc: 'Essential oil blends and massage oils' },
            { name: 'Soaps', desc: 'Liquid and solid soap formulations' },
          ],
        },
        { id: 'cosmeticsCtaLabel', label: 'Cosmetics link label', type: 'text', default: 'Explore Cosmetics' },
        { id: 'cosmeticsCtaHref', label: 'Cosmetics link', type: 'url', default: '/cosmetics' },
      ],
    },
    {
      id: 'process',
      label: 'Process',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'How we work' },
        { id: 'heading', label: 'Heading', type: 'textarea', default: 'From brief to shelf, in eight steps.' },
        {
          id: 'intro',
          label: 'Intro paragraph',
          type: 'textarea',
          default:
            'Scroll to move through our process — from first consultation to the finished product ready for shelf.',
        },
        {
          id: 'steps',
          label: 'Process steps',
          type: 'list',
          itemLabel: 'Step',
          titleField: 'title',
          fields: [
            { id: 'title', label: 'Title', type: 'text', default: '' },
            { id: 'description', label: 'Description', type: 'textarea', default: '' },
            { id: 'image', label: 'Image', type: 'image', default: '' },
          ],
          default: [
            {
              title: 'Consultation',
              description:
                "Goal, audience and format. We start by understanding what the product needs to do, who it's for, and what format is to be built.",
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868035/Consultation.png',
            },
            {
              title: 'Formulation',
              description:
                "In-house R&D builds an evidence-based formula with particle engineering when standard raw materials won't do the job.",
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868039/Formulation.png',
            },
            {
              title: 'Ingredient Selection',
              description: 'Choosing which ingredients and forms meet our potency and bioavailability standards.',
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787869644/Ingredient_Selection.png',
            },
            {
              title: 'PO & Kickoff',
              description:
                'Production begins once the order is confirmed. Procurement, scheduling and production planning all start at the same time.',
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868037/PO_Kickoff.png',
            },
            {
              title: 'Procurement',
              description:
                'Ordering and shipping the ingredients chosen, including made-to-order and temperature-sensitive actives.',
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868039/Procurement.png',
            },
            {
              title: 'Manufacturing',
              description: 'The production run itself, across the chosen format — granulating, encapsulating, or emulsifying.',
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868037/Manufacturing.png',
            },
            {
              title: 'QC & Testing',
              description: 'Every batch is tested against the original formula and for long-term stability, through ZQA.',
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868058/QC_Testing.png',
            },
            {
              title: 'Packaging & Delivery',
              description: 'The final step is labelling, packaging and shipping the finished product ready for shelf.',
              image: 'https://res.cloudinary.com/ac74hfe9/image/upload/v1787868037/Packaging_Delivery.png',
            },
          ],
        },
      ],
    },
    {
      id: 'qualityPromise',
      label: 'Quality Promise',
      description: 'Two-column section: the QC checklist on the left, the ZQA quality & certifications story on the right.',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'promiseHeadingLead', label: 'Promise heading — line 1', type: 'text', default: 'Our promise,' },
        { id: 'promiseHeadingAccent', label: 'Promise heading — line 2 (accent)', type: 'text', default: 'made tangible.' },
        { id: 'promiseBadge', label: 'Promise badge label', type: 'text', default: 'Quality Assurance' },
        { id: 'promiseWatermark', label: 'Background watermark text', type: 'text', default: 'ZQA' },
        {
          id: 'promiseIntro',
          label: 'Promise intro',
          type: 'textarea',
          default: 'Every Zeovus product undergoes a rigorous quality-control process before it is approved for release.',
        },
        {
          id: 'checks',
          label: 'Quality-control checklist',
          type: 'stringList',
          itemLabel: 'Check',
          default: [
            'Supplier qualification and audit',
            'Raw material identity testing',
            'Microbial contamination screening',
            'Heavy metal analysis',
            'Pesticide residue testing',
            'In-process quality checks',
            'Stability and shelf-life studies',
            'Final product verification',
            'Packaging integrity testing',
            'Storage condition monitoring',
          ],
        },
        { id: 'qualityEyebrow', label: 'Quality eyebrow', type: 'text', default: 'Excellence through verification' },
        { id: 'qualityHeadingLead', label: 'Quality heading — line 1', type: 'text', default: 'Quality &' },
        { id: 'qualityHeadingAccent', label: 'Quality heading — line 2 (accent)', type: 'text', default: 'certifications' },
        {
          id: 'qualityParagraphs',
          label: 'Quality paragraphs',
          type: 'stringList',
          itemLabel: 'Paragraph',
          multiline: true,
          default: [
            'Every product we create earns the Zeovus Quality Assurance Seal only after passing our proprietary 12-step quality architecture built on 825 verified and validated testing parameters. From supplier audits to raw-material authentication, every stage is verified, validated and proven.',
            'Our triple-layer testing protocol, covering incoming materials, in-process monitoring and in-house certified finished goods, ensures unmatched safety, purity and consistency.',
          ],
        },
        {
          id: 'stats',
          label: 'Quality stats',
          type: 'list',
          itemLabel: 'Stat',
          titleField: 'label',
          fields: [
            { id: 'value', label: 'Value', type: 'text', default: '' },
            { id: 'label', label: 'Label', type: 'text', default: '' },
          ],
          default: [
            { value: '12', label: 'Step quality architecture' },
            { value: '825', label: 'Verified testing parameters' },
            { value: '3', label: 'Layer testing protocol' },
          ],
        },
        {
          id: 'quote',
          label: 'Closing quote',
          type: 'textarea',
          default: "When you see the ZQA mark, you're not just holding a product that meets global standards, you're holding one that defines them.",
        },
        { id: 'sealImage', label: 'ZQA seal image', type: 'image', default: '/zqa/seal5.png' },
        { id: 'sealAlt', label: 'Seal alt text', type: 'text', default: 'Zeovus Quality Assurance Seal' },
      ],
    },
    {
      id: 'certifications',
      label: 'Certifications Marquee',
      description: 'The certification list itself is managed under Global & Layout → Certifications.',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'Certified excellence' },
        {
          id: 'heading',
          label: 'Heading',
          type: 'textarea',
          default: 'Every certification behind Zeovus manufacturing.',
        },
      ],
    },
    {
      id: 'seo',
      label: 'SEO',
      fields: [
        { id: 'title', label: 'Page title', type: 'text', default: 'Capabilities — Zeovus Life' },
        {
          id: 'description',
          label: 'Meta description',
          type: 'textarea',
          default:
            'Formulation R&D, delivery science and certified manufacturing across every major nutraceutical and cosmetic format.',
        },
      ],
    },
  ],
};

export default capabilities;
