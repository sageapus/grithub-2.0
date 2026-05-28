
import { Page } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

type AddressBlockProps=Extract<Page['layout'][0],{blockType:'address'}>

export default function AddressBlock({block}:{block: AddressBlockProps})
{
    return(
    <div>
            {/* <div className="col-12 d-flex flex-column flex-md-row">
                        <div className="col-12 col-md-8 pe-md-5 mb-4"> */}
                        <h2 className={`mb-2 mt-5 display-5 ${playfair.className}`}>
                            {block.heading}
                        </h2>
                        <address className="vcard">
						<span className="fn">{block.line1}</span><br />
						<span className="adr">
							<span className="street-address">{block.line2}<br />{block.line3}</span> <br />
							<span className="locality">{block.city} </span> 
							<span className="region">{block.province}</span>
							<span className="postal-code">{block.postalCode}</span><br />
							<span className="country-name">{block.country}</span>
						</span>
					</address>
                            
                            {/* </div> */}
            </div>
    )
}