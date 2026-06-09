export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {name: 'siteTitle', title: 'Site Title', type: 'string'},
    {name: 'contactEmail', title: 'Contact Email', type: 'string'},
    {name: 'phone', title: 'Phone Number', type: 'string'},
    {name: 'address', title: 'Address', type: 'text'},

    {name: 'githubUrl', title: 'GitHub URL', type: 'url'},
    {name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url'},
    {name: 'instagramUrl', title: 'Instagram URL', type: 'url'},

    {name: 'footerText', title: 'Footer Text', type: 'string'},
    {
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'projectsAccordionTitle',
      title: 'Projects Accordion Title',
      type: 'string',
    },
    {
      name: 'projectsAccordionContent',
      title: 'Projects Accordion Content',
      type: 'text',
    },
    {
      name: 'ContactCTA',
      title: 'Contact CTA',
      type: 'text',
    },
    {
      name: 'ContactCTAButtonLabel',
      title: 'Contact CTA Button Label',
      type: 'string',
    },
    {
      name: 'GoogleMapsURL',
      title: 'Google Maps URL',
      type: 'url',
    },
    {
      name: 'heroBackgroundColor',
      title: 'Hero Background Colour',
      type: 'color',
    },
    {
      name: 'projectsBackgroundColor',
      title: 'Projects Background Colour',
      type: 'color',
    },
    {
      name: 'experimentsBackgroundColor',
      title: 'Experiments Background Colour',
      type: 'color',
    },
    {
      name: 'aboutBackgroundColor',
      title: 'About Background Colour',
      type: 'color',
    },
    {
      name: 'contactBackgroundColor',
      title: 'Contact Background Colour',
      type: 'color',
    },
    {
      name: 'projectsPageBackgroundColor',
      title: 'Projects Page Background Color',
      type: 'color',
    },
    {
      name: 'defaultMetaTitle',
      title: 'Default Meta Title',
      type: 'string',
    },
    {
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'defaultSocialImage',
      title: 'Default Social Share Image',
      type: 'image',
      description: 'Recommended: 1200×630 JPG/PNG for social previews.',
      options: {hotspot: true},
    },
    {
      name: 'projectsPageMetaTitle',
      title: 'Projects Page Meta Title',
      type: 'string',
    },
    {
      name: 'projectsPageMetaDescription',
      title: 'Projects Page Meta Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'aboutPageMetaTitle',
      title: 'About Page Meta Title',
      type: 'string',
    },
    {
      name: 'aboutPageMetaDescription',
      title: 'About Page Meta Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'contactPageMetaTitle',
      title: 'Contact Page Meta Title',
      type: 'string',
    },
    {
      name: 'contactPageMetaDescription',
      title: 'Contact Page Meta Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'insightsPageMetaTitle',
      title: 'Insights Page Meta Title',
      type: 'string',
    },
    {
      name: 'insightsPageMetaDescription',
      title: 'Insights Page Meta Description',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
    },
  ],
}
