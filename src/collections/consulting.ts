// collections/CoworkingSpaces.ts
import {
  MainHeadingBlock,
  TextBlock,
} from '../app/blocks/cowork' 

import {
    ProductsBlock,
    ButtonBlock
}
from'../app/blocks/consulting'

import {CollectionConfig} from 'payload'

export const Consulting: CollectionConfig = {
  slug: 'consulting',
  fields: [{
      name: 'layout',
      type: 'blocks',
      blocks: [
        MainHeadingBlock,
        TextBlock,
        ProductsBlock,
        ButtonBlock
      ],
    },
  ],
}