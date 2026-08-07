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
      name: 'workCategory',
      title: 'Portfolio Section',
      type: 'string',
      options: {
        list: [
          {title: 'Client Work', value: 'client'},
          {title: 'Projects & Experiments', value: 'project'},
        ],
        layout: 'radio',
      },
      initialValue: 'project',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'homepageSummary',
      title: 'Homepage Summary',
      type: 'text',
      rows: 3,
      description: 'Short summary used on homepage project cards. Aim for one concise sentence.',
      validation: (Rule) =>
        Rule.max(180).warning('Keep the homepage summary to 180 characters or fewer.'),
    },
    {
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      description:
        'Optional. Used on Client Work cards. Upload a transparent PNG, SVG or WebP where possible.',
      options: {
        hotspot: false,
      },
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
      validation: (Rule) => Rule.required(),
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
      title: 'Legacy: Challenge / Brief',
      type: 'text',
      description:
        'Temporary legacy field. Move this content into Case Study Sections before removing.',
      readOnly: true,
    },
    {
      name: 'challengeImages',
      title: 'Legacy: Challenge Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description:
        'Temporary legacy field. Move these images into Case Study Sections before removing.',
      readOnly: true,
    },
    {
      name: 'solution',
      title: 'Legacy: What I Built',
      type: 'text',
      description:
        'Temporary legacy field. Move this content into Case Study Sections before removing.',
      readOnly: true,
    },
    {
      name: 'solutionImages',
      title: 'Legacy: What I Built Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description:
        'Temporary legacy field. Move these images into Case Study Sections before removing.',
      readOnly: true,
    },
    {
      name: 'outcome',
      title: 'Legacy: Outcome / What It Shows',
      type: 'text',
      description:
        'Temporary legacy field. Move this content into Case Study Sections before removing.',
      readOnly: true,
    },
    {
      name: 'outcomeImages',
      title: 'Legacy: Outcome Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      description:
        'Temporary legacy field. Move these images into Case Study Sections before removing.',
      readOnly: true,
    },
    {
      name: 'caseStudySections',
      title: 'Case Study Sections',
      type: 'array',
      description:
        'Build the case study using flexible sections. Add text, images and choose a layout for each section.',
      of: [
        {
          name: 'caseStudySection',
          title: 'Case Study Section',
          type: 'object',
          fields: [
            {
              name: 'heading',
              title: 'Section Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'body',
              title: 'Section Copy',
              type: 'text',
              rows: 6,
            },
            {
              name: 'bodyRich',
              title: 'Section Copy — Rich Text',
              type: 'array',
              description:
                'Optional rich-text version of the section copy. Use this when you need inline links. If empty, the existing Section Copy will continue to be used.',
              of: [
                {
                  type: 'block',
                  styles: [
                    {
                      title: 'Normal',
                      value: 'normal',
                    },
                  ],
                  lists: [],
                  marks: {
                    decorators: [
                      {
                        title: 'Strong',
                        value: 'strong',
                      },
                      {
                        title: 'Emphasis',
                        value: 'em',
                      },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        title: 'Link',
                        type: 'object',
                        fields: [
                          {
                            name: 'href',
                            title: 'URL',
                            type: 'url',
                            validation: (Rule) =>
                              Rule.uri({
                                scheme: ['http', 'https', 'mailto'],
                              }),
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
            {
              name: 'images',
              title: 'Section Images',
              type: 'array',
              of: [
                {
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alternative Text',
                      type: 'string',
                      description: 'Describe the image for accessibility.',
                    },
                    {
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                      description: 'Optional caption shown below the image.',
                    },
                    {
                      name: 'linkUrl',
                      title: 'Image Link',
                      type: 'url',
                      description:
                        'Optional. If added, clicking the image will open this page in a new tab.',
                    },
                  ],
                },
              ],
            },
            {
              name: 'imageLayout',
              title: 'Image Layout',
              type: 'string',
              options: {
                list: [
                  {
                    title: 'Single image',
                    value: 'single',
                  },
                  {
                    title: 'Two columns',
                    value: 'two-column',
                  },
                  {
                    title: 'Gallery',
                    value: 'gallery',
                  },
                ],
                layout: 'radio',
              },
              initialValue: 'two-column',
            },
          ],
          preview: {
            select: {
              title: 'heading',
              images: 'images',
              layout: 'imageLayout',
            },
            prepare({title, images, layout}) {
              const imageCount = images?.length || 0

              return {
                title: title || 'Untitled section',
                subtitle: `${imageCount} image${
                  imageCount === 1 ? '' : 's'
                } · ${layout || 'two-column'}`,
              }
            },
          },
        },
      ],
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
    },
  ],
}
