import { getPayload } from 'payload'
import config from '@payload-config'
import { RenderBlocks } from './renderpage'

export const metadata = {
  title: "Coworking Space in George",
  description: "Join our modern coworking and meeting spaces in George, Western Cape, South Africa to inspire creativity and promote cluster collaboration.",
  openGraph: {
    title: "Coworking Space in George",
    description: "Join our modern coworking and meeting spaces in George, Western Cape, South Africa to inspire creativity and promote cluster collaboration.",
    url: "https://grithub.co.za/cowork",
    siteName: "GRIT Hub",
  },
  alternates: {
    canonical: "https://grithub.co.za/cowork"
  }
}

export default async function CoworkPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'coworking' }
    },
    depth: 2,
  })

  const page = docs[0]

  if (!page) return <div>Page not found</div>

  return (                                     
    <section className="container-xxl d-flex  pt-5 flex-column mb-5" id="coworking">
      <RenderBlocks blocks={page.layout} />    
    </section>
  )
}