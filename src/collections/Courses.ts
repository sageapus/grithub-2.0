import type { CollectionConfig } from 'payload'
import { lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'courseType', 'status', 'startDate', 'updatedAt'],
    description: 'Manage all GRIT Hub courses and programmes.',
  },
  fields: [
    // ── Core identity ──────────────────────────────────────────────
    {
      name: 'title',
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
        description: 'Auto-generated from the title. Leave blank to auto-fill.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            return data?.title
              ?.toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
          },
        ],
      },
    },

    // ── Programme type & classification ───────────────────────────
    {
      name: 'courseType',
      label: 'Programme Type',
      type: 'select',
      required: true,
      defaultValue: 'workforce',
      options: [
        { label: 'QCTO (Accredited)', value: 'qcto' },
        { label: 'Workforce Training', value: 'workforce' },
        { label: 'STEM Education', value: 'stem' },
        { label: 'Community Workshop', value: 'workshop' },
        { label: 'Incubation Programme', value: 'incubation' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Registration Open', value: 'registration-open' },
        { label: 'Registration Closed', value: 'registration-closed' },
        { label: 'Completed', value: 'completed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'categories',
      label: 'Categories',
      type: 'relationship',
      relationTo: 'category',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },

    // ── Schedule ──────────────────────────────────────────────────
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          label: 'Start Date',
          type: 'date',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'endDate',
          label: 'End Date',
          type: 'date',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
    {
      name: 'duration',
      label: 'Duration (e.g. "6 weeks", "12 hours")',
      type: 'text',
      admin: {
        description: 'Human-readable duration for display on the site.',
      },
    },
    {
      name: 'schedule',
      label: 'Schedule Details',
      type: 'text',
      admin: {
        description: 'e.g. "Saturdays 9am–12pm" or "Self-paced online"',
      },
    },

    // ── Delivery & pricing ────────────────────────────────────────
    {
      name: 'deliveryMode',
      label: 'Delivery Mode',
      type: 'select',
      defaultValue: 'in-person',
      options: [
        { label: 'In-Person (George, WC)', value: 'in-person' },
        { label: 'Online (Zoom)', value: 'online' },
        { label: 'Hybrid', value: 'hybrid' },
      ],
    },
    {
      name: 'price',
      label: 'Price (ZAR)',
      type: 'number',
      admin: {
        description: 'Leave blank for free / TBA courses.',
      },
    },
    {
      name: 'registrationUrl',
      label: 'Registration URL',
      type: 'text',
      admin: {
        description:
          'External registration link (HubSpot, etc.). Leave blank if registration is closed or TBA.',
      },
    },

    // ── Media ─────────────────────────────────────────────────────
    {
      type: 'group',
      name: 'image',
      label: 'Course Image',
      fields: [
        {
          name: 'mainImage',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'alt',
          label: 'Alternative Text',
          type: 'text',
        },
        {
          name: 'caption',
          label: 'Caption',
          type: 'text',
        },
      ],
    },

    // ── Description ───────────────────────────────────────────────
    {
      name: 'summary',
      label: 'Short Summary',
      type: 'textarea',
      admin: {
        description: 'Used in course listing cards (1–2 sentences).',
      },
    },
    {
      name: 'prerequisites',
      label: 'Prerequisites',
      type: 'textarea',
      admin: {
        description: 'Describe any requirements before attending this course.',
      },
    },
    {
      name: 'body',
      label: 'Full Description',
      type: 'richText',
      // Not required — courses can exist without a dedicated page
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          UploadFeature({
            collections: {
              media: {
                fields: [{ name: 'caption', type: 'text' }],
              },
            },
          }),
        ],
      }),
    },

    // ── Instructor ────────────────────────────────────────────────
    {
      name: 'instructor',
      label: 'Instructor',
      type: 'text',
      admin: {
        description: 'Name of the lead instructor or facilitator.',
      },
    },
    {
      name: 'featured',
      label: 'Feature on Homepage / Programs Page',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
