// collections/category.ts
import type { CollectionConfig } from 'payload'

const Categories: CollectionConfig = {
  slug: 'category',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'updatedAt'],
    description: 'Categories shared by courses, newsroom articles, and programme areas.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from the name. Used for category page URLs.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            return data?.name
              ?.toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
          },
        ],
      },
    },
    {
      name: 'type',
      label: 'Category Type',
      type: 'select',
      required: true,
      defaultValue: 'programme',
      options: [
        { label: 'Programme / Course Area', value: 'programme' },
        { label: 'Newsroom / Editorial', value: 'newsroom' },
        { label: 'General', value: 'general' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Controls where this category appears.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Shown on the category listing page as an introduction.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero image displayed on the category page.',
      },
    },
  ],
}

export default Categories
