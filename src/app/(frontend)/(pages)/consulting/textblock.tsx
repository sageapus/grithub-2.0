
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import ButtonBlock from './buttonblock'

type TextBlockProps=Extract<Page['layout'][0],{blockType:'text'}>

export default function TextBlock({block}:{block: TextBlockProps})
{
    return(
        <RichText data= {block.description} className="fs-4" />
    )
}