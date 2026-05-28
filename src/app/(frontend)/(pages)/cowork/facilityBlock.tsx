
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'


type FacilityBlockProps=Extract<Page['layout'][0],{blockType:'facility'}>

const playfair = Playfair_Display({ subsets: ['latin'] })

export default function FacilityBlock({block}:{block: FacilityBlockProps})
{
    console.log('Facility Block Data:', block)
    const {facilityHiglights,heading}= block;
    return(
        <div className="col-12 d-flex align-items-center flex-column mt-5">
            <h2 className= {`display-4 ${playfair.className}`}>{heading}</h2>
            <div className="col-12 d-flex flex-wrap ">
             {facilityHiglights?.map((item)=>(
                   <div key={item.id} className="col-xl-4 col-md-6 col-12 d-flex flex-column align-items-center p-4">
                        {typeof item?.icon === 'object' && item.icon.url && (
                            <Image 
                                src={item.icon.url}
                                width={50} 
                                height={50} 
                                alt={item.icon.alt || 'facility icon'} 
                            />
                        )}
                        <p className="lead pt-3 text-center" > {item.description}
                        </p>
                        
                    </div>
             ))}
             </div>
             </div>
    )
}