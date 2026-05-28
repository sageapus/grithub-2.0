// collections/CoworkingSpaces.ts
import {
  MainHeadingBlock,
  TextBlock,
  GalleryBlock,
  AddressBlock,
  BookingBlock,
  CancelBlock,
  FacilityBlock,
  JoinBlock
} from '../app/blocks/cowork' 
import {CollectionConfig} from 'payload'

export const CoworkingSpaces: CollectionConfig = {
  slug: 'coworking-spaces',
  fields: [
    { name: 'city',           type: 'text', required: true },
    { name: 'price',          type: 'number' },
    { name: 'whatsappNumber', type: 'text' },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        MainHeadingBlock,
        TextBlock,
        GalleryBlock,
        AddressBlock,
        BookingBlock,
       CancelBlock,
       FacilityBlock,
       JoinBlock

      ],
    },
  ],
}