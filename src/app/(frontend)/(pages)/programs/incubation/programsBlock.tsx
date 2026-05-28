
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Style from "../../page.module.scss"


type ProgramBlockProps=Extract<Page['layout'][0],{blockType:'consulting'}>

export default function ProgramBlock({block}:{block: ProgramBlockProps})
{
    const {consultingProducts}= block;
    return(
        <section className="container-xxl p-0 d-flex justify-content-center align-items-center flex-column mb-5" id="incubator">
         <div className="col-12 d-flex justify-content-between flex-wrap">
            {consultingProducts?.map((item)=>(
                <div key ={item.id} className="col-xl-4 col-md-6 col-12 p-3">
                    <div className="card shadow h-100 align-items-center">
                        {/* <div className="card-body d-flex flex-column justify-content-between text-center">
                            <div className="text-center" > */}
                            {typeof item?.icon === 'object' && item.icon.url && (
                            <Image className={Style.cardTopOverflow}
                                
                                src={item.icon.url}
                                 width={100} 
                                height={100} 
                                alt={item.icon.alt || 'icon'} 
                            />
                        )}  
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h3 className="card-title fs-4 fw-bold">{item.subheading}</h3>
                                <RichText className="card-text" data={item.description} />
                                
                            </div>
                        

                    </div>
                </div>
            ))}
        </div>
    </section>
    )
}