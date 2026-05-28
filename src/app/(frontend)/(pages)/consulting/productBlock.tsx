
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

type ProductBlockProps=Extract<Page['layout'][0],{blockType:'consulting'}>

export default function ProductBlock({block}:{block: ProductBlockProps})
{
    const {consultingProducts}= block;
    return(
         <div className="container-xxl col-12 d-flex justify-content-between flex-wrap">
            {consultingProducts?.map((item)=>(
                <div key ={item.id} className="col-xl-3 col-md-6 col-12 p-3">
                    <div className="card shadow-sm position-relative h-100">
                        <div className="card-body d-flex flex-column justify-content-between text-center">
                            <div className="text-center" >
                            {typeof item?.icon === 'object' && item.icon.url && (
                            <Image 
                                
                                src={item.icon.url}
                                 width={100} 
                                height={100} 
                                alt={item.icon.alt || 'icon'} 
                            />
                        )}  
                            <h3 className="card-title fs-4 fw-bold">
                                {item.subheading}
                            </h3>
                            <RichText data={item.description}/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
    )
}