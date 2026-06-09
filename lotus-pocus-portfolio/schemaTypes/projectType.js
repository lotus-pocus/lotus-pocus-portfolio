export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Recommended: 50–60 characters.',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Recommended: 150–160 characters.',
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL Override',
      type: 'url',
      description: 'Optional. Leave blank to use the automatically generated project URL.',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'socialImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Optional. Recommended: 1200×630 for LinkedIn, Facebook and search previews.',
      options: {hotspot: true},
    },
    {
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
    },
    {
      name: 'repo',
      title: 'Repository URL',
      type: 'url',
    },
    {
      name: 'cardBackgroundColor',
      title: 'Card Background Color',
      type: 'color',
    },
    {
      name: 'cardTextColor',
      title: 'Card Text Color',
      type: 'color',
      description: 'Optional. Leave blank to auto-adjust text colour based on background.',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Case Study Hero Image',
      type: 'image',
      description: 'Recommended: 1920×1080 JPG or WebP. Keep file size under 500KB where possible.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'caseStudyIntro',
      title: 'Case Study Intro',
      type: 'text',
    },
    {
      name: 'challenge',
      title: 'Challenge / Brief',
      type: 'text',
    },
    {
      name: 'challengeImages',
      title: 'Challenge Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description:
        'Optional. Add 1–3 images to support the Challenge section. Recommended: 1600×900 JPG/WebP under 500KB.',
    },
    {
      name: 'solution',
      title: 'What I Built',
      type: 'text',
    },
    {
      name: 'solutionImages',
      title: 'What I Built Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description:
        'Optional. Add 1–3 images to support the What I Built section. Recommended: 1600×900 JPG/WebP under 500KB.',
    },
    {
      name: 'outcome',
      title: 'Outcome / What It Shows',
      type: 'text',
    },
    {
      name: 'outcomeImages',
      title: 'Outcome Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description:
        'Optional. Add 1–3 images to support the Outcome section. Recommended: 1600×900 JPG/WebP under 500KB.',
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
    },
  ],
}
