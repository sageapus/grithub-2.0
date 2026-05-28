import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

type ButtonProps = Extract<Page['layout'][0], { blockType: 'contact' }>

export default function ButtonBlock({ block }: { block: ButtonProps }) {
    return (
        <div>
    
                <a href={block.button.url} className="btn rounded-pill btn-primary btn-lg">
                 {block.button.label}
                </a>
            </div>
        
        
    )
}