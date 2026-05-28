import type { CollectionConfig } from 'payload'
//import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { lexicalEditor, ParagraphFeature, BoldFeature, HeadingFeature } from '@payloadcms/richtext-lexical'
import {Block} from 'payload'

const headingField = {
  name: 'heading',
  type: 'text' as const,
}

// const headingSizeField = {
//   name: 'headingSize',
//   type: 'select' as const,
//   defaultValue: 'h2',
//   options: [
//     { label: 'Large (H1)',  value: 'h1' },
//     { label: 'Medium (H2)', value: 'h2' },
//     { label: 'Small (H3)',  value: 'h3' },
//   ],
// }

export const ProductsBlock:Block={
    slug:'consulting',
    fields:[
        {
            name:'consultingProducts',
            type:'array',
            required:true,
            label:'Products',
            fields:[
                {
                    name:'icon',
                    type: 'upload',
                    relationTo:'media',
                    required:true,

                },
                {
                    name:'subheading',
                    type:'text',
                    required:true
                },
                {
                    name:'description',
                    type:'richText',
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
