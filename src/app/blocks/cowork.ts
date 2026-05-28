import type { CollectionConfig } from 'payload'
//import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { lexicalEditor, ParagraphFeature, BoldFeature, HeadingFeature } from '@payloadcms/richtext-lexical'
import {Block} from 'payload'



const headingField = {
  name: 'heading',
  type: 'text' as const,
}

const headingSizeField = {
  name: 'headingSize',
  type: 'select' as const,
  defaultValue: 'h2',
  options: [
    { label: 'Large (H1)',  value: 'h1' },
    { label: 'Medium (H2)', value: 'h2' },
    { label: 'Small (H3)',  value: 'h3' },
  ],
}

export const MainHeadingBlock: Block={
    slug:'MainHeading',
    fields: [
    {
      ...headingField,
      required:true,
    },
    {
      name:'tagline',
      type:'richText',
      required:true,
    //   editor: lexicalEditor({
    //     features: [ParagraphFeature(), BoldFeature()],
    //   }),
    }
]
}

export const TextBlock: Block={
    slug:'text',
    fields:[
        {
      name:'description',
      type:'richText',
      required:true,
    }
    ]
}
export const AddressBlock: Block={
    slug:'address',
    fields:[
    {
      ...headingField,
      required:true,
    },
    {
      type: 'group',
      label: 'Address',
      fields: [
        { name: 'line1', type: 'text', label: 'Line 1' },
        { name: 'line2', type: 'text', label: 'Line 2' },
        { name: 'line3', type: 'text', label: 'Line 3' },
        { name: 'city', type: 'text', label: 'City' },
        { name: 'province', type: 'text', label: 'Province' },
        { name: 'postalCode', type: 'text', label: 'Postal Code' },
        { name: 'country', type: 'text', label: 'Country' },
      ],
    }
]
}
export const BookingBlock: Block={
    slug:'booking',
    fields:[
        {
            ...headingField,
            required:true,
        },
      {
      name:'description',
      type:'richText',
      label:'booking',
      required:true,
    }
    ]
}
export const CancelBlock: Block={
    slug:'cancel',
    fields:[
    {
      ...headingField,
      required:true,
    },
    {
        name:'types',
        type:'array',
        label:'Policy',
        fields:[
            {
                name:'cancelTypes',
                type:'text',
                required:true
            }
        ]
    }
]
}
export const GalleryBlock: Block={
    slug:'gallery',
    fields:[
    { name:'gallery',
      type:'array',
      label:'gallery images',
      fields:[
        {
          name:'gallery',
          type:'upload',
          relationTo:'media',
          required:true
        },
        {
          name:'alt',
          type:'text',
          label:'Alt Text'
        }
      ]
     
    }
   ]
}

export const FacilityBlock:Block={
    slug:'facility',
    fields:[
        {
           ...headingField,
           required:true 
        },
        {
            name:'facilityHiglights',
            type:'array',
            required:true,
            label:'Highlights',
            fields:[
                {
                    name:'icon',
                    type: 'upload',
                    relationTo:'media',
                    required:true,

                },
                {
                    name:'description',
                    type:'textarea',
                    required:true
                }
               
            ]
        }
    ]
}

export const JoinBlock:Block={
    slug:'join',
    fields:[
        {
            ...headingField,
            required:true,
        },
        {
            name:'description',
            type:'textarea',
            required:true,
        },
        {
            name:'button',
            type:'group',
            required:true,
            fields:[
                {
                    name:'label',
                    type:'text',
                    required:true
                },
                {
                    name:'icon',
                    type:'upload',
                    relationTo:'media'
                },
                {
                    name:'url',
                    type:'text',
                    required:true
                }

            ]
        }
    ]
}

export const ButtonBlock:Block={
    slug:'contact',
    fields:[
        {
            name:'button',
            type:'group',
            required:true,
            fields:[
                {
                    name:'label',
                    type:'text',
                    required:true
                },
                {
                    name:'url',
                    type:'text',
                    required:true
                }
                ]
            }
    ]
}

export const WorkspaceBlock: Block = {
    slug: 'form',
    fields: [
        {
            name: 'image',
            type: 'array',
            label: 'gallery images',
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true
                },
                {
                    name: 'alt',
                    type: 'text',
                    label: 'Alt Text'
                }
            ]   // <-- this closing bracket was missing
        },      // <-- and this closing brace
        {
            name: 'price',
            type: 'number'
        },
        {
            name: 'workspace',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true
                },
                {
                    name: 'types',
                    type: 'richText',
                    required: true,
                },
            ],
        },
        {
            name: 'button',
            type: 'group',
            required: true,
            fields: [
                {
                    name: 'icon',
                    type: 'upload',
                    relationTo: 'media'
                },
                {
                    name: 'label',
                    type: 'text',
                    required: true
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true
                }
            ]
        },
        {
            name: 'info',
            type: 'richText',
            required: true
        }
    ]
}