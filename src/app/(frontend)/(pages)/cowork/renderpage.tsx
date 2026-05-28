// components/RenderBlocks.tsx
import { Page } from '@/payload-types'
import MainHeadingBlock from './mainheadingblock'
import TextBlock from './textblock'
import GalleryBlock from './galleryblock'
import AddressBlock from './addressblock'
import BookingBlock from './bookingblock'
import CancelBlock from './cancellationBlock'
import FacilityBlock from './facilityBlock'
import JoinBlock from './joinBlock'
import WorkspaceBlock from './column-panel'

type Props = {
  blocks: Page['layout']
}

export function RenderBlocks({ blocks }: Props) {
  if (!blocks) return null

  return (
    <>
    <div  className="col-12 d-flex flex-column flex-md-row">
      <div className="col-12 col-md-8 pe-md-5 mb-4">
      {blocks.map((block, i) => {
        switch (block.blockType) {

          case 'MainHeading':
            return <MainHeadingBlock key={i} block={block} />

          case 'text':
            return <TextBlock key={i} block={block} />

          case 'address':
            return <AddressBlock key={i} block={block} />

          case 'booking':
            return <BookingBlock key={i} block={block} />

          case 'cancel':
            return <CancelBlock key={i} block={block} />
      default:
                return null
            }
          })}
        </div>
      
        <div className="col-12 col-md-4">
          {blocks.map((block, i) => {
            if (block.blockType === 'form') {
              return <WorkspaceBlock key={i} block={block} />
            }
            return null
          })}
        </div>

      </div> 
    
        {blocks.map((block, i) => {
        switch (block.blockType) {

          case 'gallery':
            return <GalleryBlock key={i} block={block} />  

          case 'facility':
            return <FacilityBlock key={i} block={block} />

          case 'join':
            return <JoinBlock key={i} block={block} />
        }})}
      
    </>
  )
}