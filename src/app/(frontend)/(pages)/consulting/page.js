import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderBlocks } from './renderpage'

export const metadata = {
    title: "Consulting & Solutions",
    description: "We offer custom tailored technology consulting and development solutions to fit your organizations online and digital needs.",    
    openGraph:{
        title: "Consulting & Solutions",
        description: "We offer custom tailored technology consulting and development solutions to fit your organizations online and digital needs.",
        url: "https://grithub.co.za/consulting",
        siteName: "GRIT Hub",
    },
    alternates: {
        canonical: "https://grithub.co.za/consulting"
    }
}

export default async function ConsultingPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'consulting' }
    },
    depth: 2,
  })

  const page = docs[0]

  if (!page) return <div>Page not found</div>

  return (                                      
    <section className="container-fluid d-flex justify-content-center align-items-center flex-column" id="programs-workshops">
      <RenderBlocks blocks={page.layout} />     
    </section>
  )
}