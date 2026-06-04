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
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
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
      type: 'color'
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
  ],
}
