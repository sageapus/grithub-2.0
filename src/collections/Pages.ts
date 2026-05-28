import type { CollectionConfig } from 'payload'
// import {CoworkingSpaces} from '../collections/coworking'
import {
  MainHeadingBlock,
  TextBlock,
  GalleryBlock,
  AddressBlock,
  BookingBlock,
  CancelBlock,
  FacilityBlock,
  JoinBlock,
  WorkspaceBlock
} from '../app/blocks/cowork' 

import {
    ProductsBlock,
    ButtonBlock
}
from'../app/blocks/consulting'

const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
       blocks: [
        MainHeadingBlock,
        TextBlock,
        GalleryBlock,
        AddressBlock,
        BookingBlock,
       CancelBlock,
       FacilityBlock,
       JoinBlock,
       ButtonBlock,
       ProductsBlock,
       WorkspaceBlock
       ]
    },
  ],
  
}

export default Pages

