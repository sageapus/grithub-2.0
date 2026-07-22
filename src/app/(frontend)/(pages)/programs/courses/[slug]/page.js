import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { blurImage } from 'lib/constants'

/**
 * Map course type values to the ribbon label + colour used on the /programs page.
 */
const COURSE_TYPE_LABELS = {
  qcto: { label: 'QCTO', color: '#c00' },
  workforce: { label: 'Workforce', color: '#6f42c1' },
  stem: { label: 'STEM', color: '#198754' },
  workshop: { label: 'Workshop', color: '#0d6efd' },
  incubation: { label: 'Incubation', color: '#fd7e14' },
}

const STATUS_LABELS = {
  draft: null, // don't show a badge for drafts
  published: null,
  'registration-open': { label: 'Registration Open', variant: 'success' },
  'registration-closed': { label: 'Registration Closed', variant: 'secondary' },
  completed: { label: 'Completed', variant: 'secondary' },
}

function formatDate(iso) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function formatPrice(price) {
  if (price == null) return 'TBA'
  if (price === 0) return 'Free'
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(price)
}

export default async function CoursePage({ params }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'courses',
    where: {
      and: [
        { slug: { equals: slug } },
        {
          or: [
            { status: { equals: 'published' } },
            { status: { equals: 'registration-open' } },
            { status: { equals: 'registration-closed' } },
            { status: { equals: 'completed' } },
          ],
        },
      ],
    },
    depth: 2,
    limit: 1,
  })

  const course = docs[0]
  if (!course) notFound()

  const typeInfo = COURSE_TYPE_LABELS[course.courseType] ?? {
    label: course.courseType,
    color: '#6c757d',
  }
  const statusBadge = STATUS_LABELS[course.status]

  return (
    <section className="container-xxl py-md-5 p-4 mb-5">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/programs">Programs</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {course.title}
          </li>
        </ol>
      </nav>

      <div className="row g-5">
        {/* ── Main content ────────────────────────────── */}
        <article className="col-12 col-md-8">
          {/* Type badge */}
          <span
            className="badge rounded-pill mb-3 fs-6 px-3 py-2"
            style={{ backgroundColor: typeInfo.color }}
          >
            {typeInfo.label}
          </span>

          <h1 className="display-5 fw-bold mb-3">{course.title}</h1>

          {course.summary && <p className="lead text-muted mb-4">{course.summary}</p>}

          {/* Course image */}
          {course.image?.mainImage?.url && (
            <figure className="mb-4">
              <Image
                src={course.image.mainImage.url}
                alt={course.image.alt ?? course.title}
                width={900}
                height={450}
                className="img-fluid rounded"
                placeholder="blur"
                blurDataURL={blurImage}
              />
              {course.image.caption && (
                <figcaption className="text-muted small mt-2">{course.image.caption}</figcaption>
              )}
            </figure>
          )}

          {/* Full rich-text description */}
          {course.body && (
            <div className="prose">
              <RichText data={course.body} />
            </div>
          )}

          {/* Prerequisites */}
          {course.prerequisites && (
            <div className="mt-4">
              <h2 className="h5 fw-bold">Prerequisites</h2>
              <p>{course.prerequisites}</p>
            </div>
          )}
        </article>

        {/* ── Sidebar ──────────────────────────────────── */}
        <aside className="col-12 col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5 fw-bold mb-3">Course Details</h2>

              <ul className="list-unstyled mb-0">
                {/* Status */}
                {statusBadge && (
                  <li className="mb-3">
                    <span className={`badge bg-${statusBadge.variant} rounded-pill px-3 py-2`}>
                      {statusBadge.label}
                    </span>
                  </li>
                )}

                {/* Dates */}
                {(course.startDate || course.endDate) && (
                  <li className="mb-3">
                    <strong className="d-block text-muted small text-uppercase mb-1">Dates</strong>
                    {course.startDate && (
                      <span>
                        <span className="fw-semibold">Start:</span> {formatDate(course.startDate)}
                      </span>
                    )}
                    {course.startDate && course.endDate && <br />}
                    {course.endDate && (
                      <span>
                        <span className="fw-semibold">End:</span> {formatDate(course.endDate)}
                      </span>
                    )}
                  </li>
                )}

                {/* Duration */}
                {course.duration && (
                  <li className="mb-3">
                    <strong className="d-block text-muted small text-uppercase mb-1">
                      Duration
                    </strong>
                    {course.duration}
                  </li>
                )}

                {/* Schedule */}
                {course.schedule && (
                  <li className="mb-3">
                    <strong className="d-block text-muted small text-uppercase mb-1">
                      Schedule
                    </strong>
                    {course.schedule}
                  </li>
                )}

                {/* Delivery */}
                {course.deliveryMode && (
                  <li className="mb-3">
                    <strong className="d-block text-muted small text-uppercase mb-1">
                      Delivery
                    </strong>
                    {{
                      'in-person': 'In-Person – George, Western Cape',
                      online: 'Online via Zoom',
                      hybrid: 'Hybrid (In-Person + Online)',
                    }[course.deliveryMode] ?? course.deliveryMode}
                  </li>
                )}

                {/* Price */}
                <li className="mb-3">
                  <strong className="d-block text-muted small text-uppercase mb-1">Price</strong>
                  <span className="fw-bold fs-5">{formatPrice(course.price)}</span>
                </li>

                {/* Instructor */}
                {course.instructor && (
                  <li className="mb-3">
                    <strong className="d-block text-muted small text-uppercase mb-1">
                      Instructor
                    </strong>
                    {course.instructor}
                  </li>
                )}

                {/* Categories */}
                {course.categories?.length > 0 && (
                  <li className="mb-3">
                    <strong className="d-block text-muted small text-uppercase mb-1">
                      Categories
                    </strong>
                    <div className="d-flex flex-wrap gap-2 mt-1">
                      {course.categories.map((cat) => {
                        const name = typeof cat === 'string' ? cat : cat.name
                        const catSlug = typeof cat === 'string' ? null : cat.slug
                        return catSlug ? (
                          <Link
                            key={typeof cat === 'string' ? cat : cat.id}
                            href={`/programs/category/${catSlug}`}
                            className="badge bg-light text-dark text-decoration-none border"
                          >
                            {name}
                          </Link>
                        ) : (
                          <span
                            key={typeof cat === 'string' ? cat : cat.id}
                            className="badge bg-light text-dark border"
                          >
                            {name}
                          </span>
                        )
                      })}
                    </div>
                  </li>
                )}
              </ul>

              {/* CTA button */}
              {course.registrationUrl && course.status === 'registration-open' ? (
                <a
                  href={course.registrationUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn btn-danger rounded-pill btn-lg w-100 mt-3"
                >
                  Register Now &rsaquo;
                </a>
              ) : (
                <div
                  className="alert alert-secondary rounded-pill text-center mt-3 mb-0"
                  role="alert"
                >
                  {course.status === 'completed'
                    ? 'This course has completed'
                    : 'Registration Opens Soon'}
                </div>
              )}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-4">
            <Link href="/programs" className="text-decoration-none text-muted small">
              &larr; Back to Programs
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'courses',
    where: {
      or: [
        { status: { equals: 'published' } },
        { status: { equals: 'registration-open' } },
        { status: { equals: 'registration-closed' } },
        { status: { equals: 'completed' } },
      ],
    },
    limit: 200,
    select: { slug: true },
  })
  return docs.filter((d) => d.slug).map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'courses',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  const course = docs[0]
  if (!course) return {}

  const description = course.summary ?? `${course.title} — GRIT Hub programme.`

  return {
    title: `${course.title} | GRIT Hub Programs`,
    description,
    openGraph: {
      title: course.title,
      description,
      url: `https://grithub.org.za/programs/courses/${slug}`,
      siteName: 'GRIT Hub',
      images: course.image?.mainImage?.url
        ? [{ url: course.image.mainImage.url, alt: course.image.alt ?? course.title }]
        : [],
    },
    alternates: {
      canonical: `https://grithub.org.za/programs/courses/${slug}`,
    },
  }
}
