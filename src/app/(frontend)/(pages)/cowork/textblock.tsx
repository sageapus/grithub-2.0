
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type TextBlockProps=Extract<Page['layout'][0],{blockType:'text'}>

export default function TextBlock({block}:{block: TextBlockProps})
{
    return(
    <div>
        <RichText data={block.description}
        />
    </div>
    )
}