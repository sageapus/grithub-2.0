// globals/Footer.ts
import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  fields: [
    // ── LEFT COLUMN ──────────────────
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Company Description',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'line1',    type: 'text' },
        { name: 'line2',    type: 'text' },
        { name: 'city',     type: 'text' },
        { name: 'country',  type: 'text' },
        { name: 'directionsUrl', type: 'text', label: 'Google Maps Link' },
      ],
    },

    // ── MIDDLE COLUMN ─────────────────
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'Facebook',  value: 'facebook' },
            { label: 'LinkedIn',  value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Patreon',   value: 'patreon' },
          ],
        },
        { name: 'url', type: 'text' },
      ],
    },

    // ── RIGHT COLUMN ──────────────────
    {
      name: 'newsletterHeading',
      type: 'text',
      defaultValue: 'Join Us.',
    },
    {
      name: 'newsletterDescription',
      type: 'textarea',
    },

    // ── BOTTOM BAR ────────────────────
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© 2017-2026 Garden Route Innovation & Technology Hub, NPC (GRIT Hub). All rights reserved.',
    },
    {
      name: 'bottomLinks',
      type: 'array',
      label: 'Bottom Links (About Us, Terms, Privacy...)',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url',   type: 'text' },
      ],
    },
  ],
}