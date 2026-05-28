
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type BookingBlockProps=Extract<Page['layout'][0],{blockType:'booking'}>

export default function BookingBlock({block}:{block: BookingBlockProps})
{
    return(
    <div>
        <hr className="my-5"/>
        <h4 className="fw-bold">{block.heading}</h4>
        <RichText data= {block.description} />
        
     </div>
    )
}