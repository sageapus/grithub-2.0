
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type CancelBlockProps=Extract<Page['layout'][0],{blockType:'cancel'}>


export default function CancelBlock({block}:{block: CancelBlockProps})
{ 
    const {types} = block;
    return(
        
    <div>
         <h4 className="mt-5 fw-bold">{block.heading}</h4>
        <ul 
          className="d-flex m-0 p-0 justify-content-between list-unstyled border-bottom py-2">
          {types?.map((item,index) => (
          <li 
            key={item.id} 
              className={`fw-medium ${index === 1 ? 'px-4' : ''}`}
              >{item.cancelTypes}</li>
        ))}
        </ul>
    </div>
    )
}