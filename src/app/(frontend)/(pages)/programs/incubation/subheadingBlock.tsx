import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

type SubHeadingProps = Extract<Page['layout'][0], { blockType: 'MainHeading' }>

export default function SubHeadingBlock({ block }: { block: SubHeadingProps }) {
    return (
        <div>
            <section className="container-xxl text-center col-12">
              <hr className="hr my-5" />
              <h2 className="display-6 mt-5 mb-0">{block.heading}</h2>
              <div className="text-center p-md-3 p-3">
                <RichText data={block.tagline} className="lead" />
              </div>
            </section>
        </div>
    )
}