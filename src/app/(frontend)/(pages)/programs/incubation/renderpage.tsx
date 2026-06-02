// components/RenderBlocks.tsx
import { Page } from '@/payload-types'
import MainHeadingBlock from './mainheadingblock'
import TextBlock from './textblock'
//import GalleryBlock from './blocks/GalleryBlock'
import ProgramBlock from './programsBlock'
import SubHeadingBlock from './subheadingBlock'


type Props = {
  blocks: Page['layout']
}

export function RenderBlocks({ blocks }: Props) {
  if (!blocks) return null

  return (
    <>
    <section className="container-xxl text-center col-12 d-flex pt-5 flex-column mb-5" id="programs">
      {blocks.map((block, i) => {
        switch (block.blockType) {

          case 'MainHeading':
            return <MainHeadingBlock key={i} block={block} />

          case 'text':
            return <TextBlock key={i} block={block} />

          default:
              return null
        }})}
        </section>

        {blocks.map((block, i) => {
        switch (block.blockType) {

          case 'consulting':
            return <ProgramBlock key={i} block={block} />

          case 'subheading':
            return <SubHeadingBlock key={i} block={block} />

          default:
            return null
        }
      })}
    </>
  )
}