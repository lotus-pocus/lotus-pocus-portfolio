import { defineField, defineType } from "sanity";

export const learningType = defineType({
  name: "learning",
  title: "Learning",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "UX", value: "ux" },
          { title: "SEO", value: "seo" },
          { title: "Development", value: "development" },
          { title: "CMS", value: "cms" },
          { title: "Performance", value: "performance" },
          { title: "Client Work", value: "client-work" },
        ],
        layout: "dropdown",
      },
    }),

    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description:
        "A short introduction shown on the Learnings listing page.",
      validation: (Rule) => Rule.max(240),
    }),

    defineField({
      name: "body",
      title: "Article",
      type: "array",
      of: [
        {
          type: "block",
        },
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alternative text",
              type: "string",
            },
          ],
        },
      ],
    }),

    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      description:
        "Optional. Lower numbers appear first.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});