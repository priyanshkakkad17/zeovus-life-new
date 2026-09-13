/** Contact page content, including every form label and placeholder. */
const contact = {
  id: 'contact',
  label: 'Contact Page',
  description: 'Hero, partnership options, response steps and every enquiry form label.',
  icon: 'mail',
  preview: '/contact',
  sections: [
    {
      id: 'hero',
      label: 'Hero',
      fields: [
        { id: 'titleLead', label: 'Title — line 1', type: 'text', default: 'Bring the brief.' },
        { id: 'titleAccent', label: 'Title — line 2 (accent)', type: 'text', default: "We'll bring the batch." },
        {
          id: 'subtitle',
          label: 'Subtitle',
          type: 'textarea',
          default:
            'Backed by decades of leadership experience across pharmaceuticals and nutraceuticals — now behind your next formula.',
        },
        { id: 'ctaLabel', label: 'Button label', type: 'text', default: 'START AN ENQUIRY' },
      ],
    },
    {
      id: 'options',
      label: 'Partnership Options',
      fields: [
        { id: 'enabled', label: 'Show this section', type: 'boolean', default: true },
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'How we work together' },
        { id: 'heading', label: 'Heading', type: 'textarea', default: "Choose how you'd like to partner." },
        {
          id: 'intro',
          label: 'Intro paragraph',
          type: 'textarea',
          default: 'Select the model that fits your business.',
        },
        {
          id: 'items',
          label: 'Options',
          type: 'list',
          itemLabel: 'Option',
          titleField: 'title',
          fields: [
            { id: 'id', label: 'Value (used in the form)', type: 'text', default: '' },
            { id: 'title', label: 'Title', type: 'text', default: '' },
            { id: 'description', label: 'Description', type: 'textarea', default: '' },
          ],
          default: [
            {
              id: 'co-development',
              title: 'Co-Development & Formulation Innovation',
              description:
                "Bring us a brief. Or bring us a problem nobody's solved yet. Either way, our formulation team builds it with you.",
            },
            {
              id: 'private-label',
              title: 'Private Label & White Label',
              description:
                'Launch under your name, built on our formulation and manufacturing standard from the first batch to the last.',
            },
            {
              id: 'bulk-ingredients',
              title: 'Bulk Ingredient & Raw Material Supply',
              description:
                'Actives and raw materials, sourced and supplied at the volume your production line actually needs.',
            },
            {
              id: 'distribution',
              title: 'Distribution & Regional Partnership',
              description: "Take Zeovus Life formulations into markets we haven't reached yet — together.",
            },
          ],
        },
      ],
    },
    {
      id: 'form',
      label: 'Enquiry Form',
      fields: [
        { id: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'Enquire now' },
        { id: 'heading', label: 'Heading', type: 'textarea', default: "Tell us what you're building." },
        {
          id: 'steps',
          label: 'What happens next',
          type: 'list',
          itemLabel: 'Step',
          titleField: 'title',
          fields: [
            { id: 'title', label: 'Title', type: 'text', default: '' },
            { id: 'description', label: 'Description', type: 'textarea', default: '' },
          ],
          default: [
            {
              title: "We'll Respond",
              description: "We'll get back to you within one business day by email or phone.",
            },
            {
              title: "We'll Discuss",
              description:
                "We'll understand your requirements and discuss the right formulation, ingredients and manufacturing approach for your product.",
            },
            {
              title: "We'll Quote",
              description: "We'll provide a clear, competitive quote tailored to your specific project needs.",
            },
          ],
        },
        { id: 'firstNameLabel', label: 'First name — label', type: 'text', default: 'First Name' },
        { id: 'firstNamePlaceholder', label: 'First name — placeholder', type: 'text', default: 'John' },
        { id: 'lastNameLabel', label: 'Last name — label', type: 'text', default: 'Last Name' },
        { id: 'lastNamePlaceholder', label: 'Last name — placeholder', type: 'text', default: 'Doe' },
        { id: 'companyLabel', label: 'Company — label', type: 'text', default: 'Company Name' },
        { id: 'companyPlaceholder', label: 'Company — placeholder', type: 'text', default: 'Your Company Ltd' },
        { id: 'emailLabel', label: 'Email — label', type: 'text', default: 'Email Address' },
        { id: 'emailPlaceholder', label: 'Email — placeholder', type: 'text', default: 'john@company.com' },
        { id: 'phoneLabel', label: 'Phone — label', type: 'text', default: 'Phone Number' },
        { id: 'phonePlaceholder', label: 'Phone — placeholder', type: 'text', default: '+1 (555) 000-0000' },
        { id: 'interestLabel', label: 'Interest — label', type: 'text', default: "I'm interested in" },
        { id: 'interestPlaceholder', label: 'Interest — empty option', type: 'text', default: 'Select an option' },
        { id: 'messageLabel', label: 'Message — label', type: 'text', default: 'Tell us about your project' },
        {
          id: 'messagePlaceholder',
          label: 'Message — placeholder',
          type: 'text',
          default: 'Product type, quantity, and any specific formulation needs...',
        },
        { id: 'submitLabel', label: 'Submit button label', type: 'text', default: 'Submit Enquiry' },
        {
          id: 'footnote',
          label: 'Form footnote',
          type: 'textarea',
          default: "We'll get back to you within one business day by email or phone.",
        },
        { id: 'successHeading', label: 'Success heading', type: 'text', default: 'Thank you.' },
        {
          id: 'successBody',
          label: 'Success message',
          type: 'textarea',
          default: "We've received your enquiry and will get back to you within one business day.",
        },
      ],
    },
    {
      id: 'seo',
      label: 'SEO',
      fields: [
        { id: 'title', label: 'Page title', type: 'text', default: 'Contact — Zeovus Life' },
        {
          id: 'description',
          label: 'Meta description',
          type: 'textarea',
          default: 'Start a product brief with Zeovus Life for private-label supplements, cosmetics, co-development, bulk supply and export manufacturing support. Contact us today.',
        },
      ],
    },
  ],
};

export default contact;
