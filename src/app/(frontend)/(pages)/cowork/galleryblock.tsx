import { Page } from '@/payload-types'
import Image from 'next/image'
import styles from './cowork.module.scss'

type GalleryBlockProps = Extract<Page['layout'][0], { blockType: 'gallery' }>

export default function GalleryBlock({ block }: { block: GalleryBlockProps }) {
  const { gallery } = block
  const secondItem = gallery?.[1]

  return (
    <div className={styles.gallery}>
      
        {gallery?.map((item, index) =>
          typeof item.gallery === 'object' && item.gallery.url ? (
            <Image
              key={index}
              src={item.gallery.url}
              width={350}
              height={275}
              alt={item.gallery.alt || 'gallery image'}
            />
          ) : null
        )}
      </div>
  )
}