import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderBlocks } from './renderpage'

export const metadata = {
    title: "Business Incubator",
    description: "Our Incubator is custom designed for Small to Medium Enterprises to help grow digital skills, refine or create an online business model through masterclasses, workshops, events and direct mentorship.",
    openGraph:{
        title: "Business Incubator",
        description: "Our Incubator is custom designed for Small to Medium Enterprises to help grow digital skills, refine or create an online business model through masterclasses, workshops, events and direct mentorship.",
        url: "https://grithub.co.za/programs/incubation",
        siteName: "GRIT Hub",
    },
    alternates: {
        canonical: "https://grithub.co.za/programs/incubation"
    }
}

export default async function IncubationPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'incubation' }
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