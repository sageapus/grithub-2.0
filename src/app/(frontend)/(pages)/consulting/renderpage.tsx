// components/RenderBlocks.tsx
import { Page } from '@/payload-types'
import MainHeadingBlock from './mainheadingblock'
import TextBlock from './textblock'
//import GalleryBlock from './blocks/GalleryBlock'
import ProductBlock from './productBlock'
import ButtonBlock from './buttonblock'


type Props = {
  blocks: Page['layout']
}

export function RenderBlocks({ blocks }: Props) {
  if (!blocks) return null

  return (
    <>
    <div>
      {blocks.map((block, i) => {
        switch (block.blockType) {

          case 'MainHeading':
            return <MainHeadingBlock key={i} block={block} />

          
          case 'consulting':
            return <ProductBlock key={i} block={block} />
        }})}
        </div>
        <div className="text-center col-md-9 col-12 p-md-5 p-3">
      {blocks.map((block, i) => {
        switch (block.blockType) {

            case 'text':
            return <TextBlock key={i} block={block} />


          case 'contact':
            return <ButtonBlock key={i} block={block} />

          default:
            return null
        }
      })}
      </div>
    </>
  )
}