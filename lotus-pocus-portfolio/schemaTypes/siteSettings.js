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
    }
  ],
}
