export default {
  name: 'announcementBanner',
  title: 'Announcement Banner',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For your reference only. Example: Biofuels Forum Banner.',
    },
    {
      name: 'message',
      title: 'Message',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Optional. Add a URL if the banner should be clickable.',
    },
    {
      name: 'backgroundColour',
      title: 'Background Colour',
      type: 'color',
    },
    {
      name: 'textColour',
      title: 'Text Colour',
      type: 'color',
    },
    {
      name: 'displayStyle',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Static', value: 'static' },
          { title: 'Ticker', value: 'ticker' },
        ],
        layout: 'radio',
      },
      initialValue: 'static',
    },
    {
      name: 'bannerType',
      title: 'Banner Type',
      type: 'string',
      options: {
        list: [
          { title: 'Global Banner', value: 'global' },
          { title: 'Page Banner', value: 'page' },
        ],
        layout: 'radio',
      },
      initialValue: 'global',
      description:
        'Global banners are used as the fallback. Page banners override the global banner.',
    },
    {
      name: 'displayScope',
      title: 'Display Scope',
      type: 'string',
      hidden: ({ parent }) => parent?.bannerType !== 'page',
      options: {
        list: [
          { title: 'All Pages', value: 'all' },
          { title: 'Selected Pages', value: 'selected' },
        ],
        layout: 'radio',
      },
      initialValue: 'all',
    },
    {
      name: 'showOnPages',
      title: 'Show On Pages',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) =>
        parent?.bannerType !== 'page' || parent?.displayScope !== 'selected',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'Contact', value: 'contact' },
          { title: 'Projects', value: 'projects' },
          { title: 'Experiments', value: 'experiments' },
        ],
      },
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    },
  ],

  preview: {
    select: {
      title: 'title',
      message: 'message',
      bannerType: 'bannerType',
      displayStyle: 'displayStyle',
    },
    prepare({ title, message, bannerType, displayStyle }) {
      return {
        title: title || message || 'Untitled Banner',
        subtitle: `${bannerType || 'banner'} · ${displayStyle || 'static'}`,
      }
    },
  },
}