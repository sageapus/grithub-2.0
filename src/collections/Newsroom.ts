import type { CollectionConfig } from 'payload'
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'

export const Newsroom: CollectionConfig = {
  slug: 'newsroom',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      required: true,
    },
    // 👇 New field — auto-generates a clean URL-safe slug from the title
    {
      type: 'text',
      name: 'slug',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from the title. Leave blank to auto-fill.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value // don't overwrite if manually set
            return data?.title
              ?.toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '') // strip punctuation (apostrophes, commas, colons, etc.)
              .replace(/\s+/g, '-')     // spaces → dashes
          },
        ],
      },
    },
    {
      type: 'select',
      name: 'Author',
      options: [
        'Garden Route Innovation & Technology Hub','Udy Obi','Marshall Grant'
      ],
      hasMany: true
    },
    {
      type: 'group',
      fields: [
        {
          type: 'upload',
          name: 'Main Image',
          relationTo: 'media',
        },
        {
          type: 'text',
          name: 'Alternative Text',
        },
        {
          type: 'text',
          name: 'Image Caption',
        },
      ],
    },
    {
      type: 'relationship',
      name: 'Category',
      relationTo: 'category',
      hasMany: true,
    },
    {
      type: 'date',
      name: 'publishedDate',
    },
    {
      type: 'richText',
      name: 'Body',
      required: true,
      editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      UploadFeature({
        collections: {
          media: {
            fields: [
              { name: 'caption', type: 'text' },
            ],
          },
        },
      }),
    ],
  }),
},

  ],
}