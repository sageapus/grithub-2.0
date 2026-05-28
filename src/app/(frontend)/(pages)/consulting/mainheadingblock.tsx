import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

type MainHeadingProps = Extract<Page['layout'][0], { blockType: 'MainHeading' }>

export default function MainHeadingBlock({ block }: { block: MainHeadingProps }) {
    return (
        <div>
            <article className="container-xxl d-flex pt-5 flex-column" id="programs">
                <h1 className={`display-2 ${playfair.className}`}>
                    {block.heading}
                </h1>
                
                  <RichText data={block.tagline} className="lead text-muted fs-3"/>
                
            </article>
        </div>
    )
}