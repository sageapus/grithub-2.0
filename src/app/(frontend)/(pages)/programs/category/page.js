import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import { blurImage } from 'lib/constants'

export const metadata = {
  title: 'Programme Categories | GRIT Hub',
  description: 'Browse all GRIT Hub programme and course categories.',
  openGraph: {
    title: 'Programme Categories | GRIT Hub',
    description: 'Browse all GRIT Hub programme and course categories.',
    url: 'https://grithub.org.za/programs/category',
    siteName: 'GRIT Hub',
  },
  alternates: {
    canonical: 'https://grithub.org.za/programs/category',
  },
}

export default async function CategoryIndexPage() {
  const payload = await getPayload({ config })

  // Only fetch programme-type categories
  const { docs: categories } = await payload.find({
    collection: 'category',
    where: {
      or: [{ type: { equals: 'programme' } }, { type: { equals: 'general' } }],
    },
    depth: 1,
    limit: 100,
    sort: 'name',
  })

  return (
    <section className="container-xxl d-flex py-md-5 p-4 flex-column mb-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/programs">Programs</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Categories
          </li>
        </ol>
      </nav>

      <h1 className="display-3 fw-bold mb-2">Programme Categories</h1>
      <p className="lead text-muted fs-4 mb-5 col-md-8">
        Browse our courses and programmes by category.
      </p>

      {categories.length === 0 ? (
        <p className="text-muted">No categories found.</p>
      ) : (
        <div className="row g-4">
          {categories.map((cat) => (
            <div key={cat.id} className="col-md-4 col-sm-6 col-12">
              <Link
                href={`/programs/category/${cat.slug}`}
                className="text-decoration-none text-reset"
              >
                <div className="card shadow-sm h-100 border-0 overflow-hidden">
                  {cat.image?.url && (
                    <Image
                      src={cat.image.url}
                      alt={cat.image.alt ?? cat.name}
                      width={600}
                      height={200}
                      className="card-img-top object-fit-cover"
                      style={{ height: 180 }}
                      placeholder="blur"
                      blurDataURL={blurImage}
                    />
                  )}
                  <div className="card-body">
                    <h2 className="card-title fs-5 fw-bold mb-1">{cat.name}</h2>
                    {cat.description && (
                      <p className="card-text text-muted small line-clamp-2">{cat.description}</p>
                    )}
                  </div>
                  <div className="card-footer border-0 bg-transparent pb-3">
                    <span className="text-danger small fw-semibold">View courses &rsaquo;</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
