// collections/Categories.ts
import type { CollectionConfig } from 'payload'

const Categories: CollectionConfig = {
  slug: 'category', 
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}
export default Categories