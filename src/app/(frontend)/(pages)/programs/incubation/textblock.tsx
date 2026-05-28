
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type TextBlockProps=Extract<Page['layout'][0],{blockType:'text'}>

export default function TextBlock({block}:{block: TextBlockProps})
{
    return(
    <div >
        <section className="container-xxl text-center col-12">
            <RichText data= {block.description} className="fs-3 m-0" />
            </section>
        
    </div>
    )
}