import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import ribbon from '@/styles/ribbon.module.scss'
import Style from '../../../page.module.scss'
import { blurImage } from 'lib/constants'

// ── Course type → ribbon label + colour class ──────────────────────────────
const COURSE_TYPE_RIBBON = {
  qcto: { label: 'QCTO', colorClass: null }, // default blue
  workforce: { label: 'Workforce', colorClass: ribbon.ribbon__purple },
  stem: { label: 'STEM', colorClass: ribbon.ribbon__green },
  workshop: { label: 'Workshop', colorClass: null },
  incubation: { label: 'Incubation', colorClass: null },
}

// ── Status → CTA display ───────────────────────────────────────────────────
function CourseCardCTA({ course }) {
  if (course.status === 'registration-open' && course.registrationUrl) {
    return (
      <a
        href={course.registrationUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="btn rounded-pill btn-danger btn-lg w-100"
      >
        Register Now &rsaquo;
      </a>
    )
  }
  if (course.status === 'completed') {
    return (
      <div className="alert rounded-pill alert-secondary text-center mb-0" role="alert">
        Course Completed
      </div>
    )
  }
  return (
    <div className="alert rounded-pill alert-secondary text-center mb-0" role="alert">
      Registration Opens Soon
    </div>
  )
}

function formatDate(iso) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// ── Course card ────────────────────────────────────────────────────────────
function CourseCard({ course }) {
  const typeInfo = COURSE_TYPE_RIBBON[course.courseType] ?? {
    label: course.courseType,
    colorClass: null,
  }
  const hasPage = Boolean(course.slug)

  const cardContent = (
    <div className="card shadow-sm position-relative h-100">
      {/* Ribbon badge */}
      <div className={`${ribbon.ribbon_top_right} ${typeInfo.colorClass ?? ''}`}>
        <span>{typeInfo.label}</span>
      </div>

      {/* Course image or placeholder */}
      {course.image?.mainImage?.url ? (
        <Image
          src={course.image.mainImage.url}
          alt={course.image.alt ?? course.title}
          width={600}
          height={300}
          className={Style.cardTopImg}
          placeholder="blur"
          blurDataURL={blurImage}
        />
      ) : (
        <div
          className="d-flex align-items-center justify-content-center bg-light"
          style={{ height: 160 }}
          aria-hidden="true"
        >
          <span className="text-muted fs-1">📚</span>
        </div>
      )}

      <div className="card-body d-flex flex-column justify-content-between p-4">
        <div>
          <h2 className="card-title fs-5 fw-bold mb-2">{course.title}</h2>

          {/* Dates */}
          {(course.startDate || course.endDate) && (
            <p className="text-muted small mb-1">
              {course.startDate && <>Starts {formatDate(course.startDate)}</>}
              {course.startDate && course.endDate && ' · '}
              {course.endDate && <>Ends {formatDate(course.endDate)}</>}
            </p>
          )}

          {/* Duration / schedule */}
          {course.duration && <p className="text-muted small mb-1">{course.duration}</p>}

          {course.summary && <p className="card-text text-muted mt-2">{course.summary}</p>}
        </div>

        <div className="mt-3 d-flex flex-column gap-2">
          <CourseCardCTA course={course} />
          {hasPage && (
            <Link
              href={`/programs/courses/${course.slug}`}
              className="btn rounded-pill btn-outline-secondary btn-sm"
            >
              View Details &rsaquo;
            </Link>
          )}
        </div>
      </div>
    </div>
  )

  return <div className="col-xl-4 col-md-6 col-12 p-3">{cardContent}</div>
}

// ── Page ───────────────────────────────────────────────────────────────────
export default async function CategoryPage({ params }) {
  const { categorySlug } = await params
  const payload = await getPayload({ config })

  // 1. Resolve the category
  const { docs: categoryDocs } = await payload.find({
    collection: 'category',
    where: { slug: { equals: categorySlug } },
    depth: 0,
    limit: 1,
  })

  const category = categoryDocs[0]
  if (!category) notFound()

  // 2. Fetch all published courses in this category
  const { docs: courses, totalDocs } = await payload.find({
    collection: 'courses',
    where: {
      and: [
        { categories: { in: [category.id] } },
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
    limit: 100,
    sort: 'startDate',
  })

  return (
    <>
      {/* ── Hero / header ───────────────────────────────────────── */}
      <section className="container-xxl d-flex pt-5 flex-column mb-4" id="category-header">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/programs">Programs</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {category.name}
            </li>
          </ol>
        </nav>

        {/* Category hero image */}
        {category.image?.url && (
          <div className="mb-4 rounded overflow-hidden" style={{ maxHeight: 320 }}>
            <Image
              src={category.image.url}
              alt={category.image.alt ?? category.name}
              width={1200}
              height={320}
              className="w-100 object-fit-cover"
              placeholder="blur"
              blurDataURL={blurImage}
              priority
            />
          </div>
        )}

        <h1 className="display-3 fw-bold">{category.name}</h1>

        {category.description && (
          <p className="lead text-muted fs-4 col-md-8">{category.description}</p>
        )}
      </section>

      {/* ── Course grid ─────────────────────────────────────────── */}
      <section className="container-xxl pb-5" aria-label={`Courses in ${category.name}`}>
        {totalDocs === 0 ? (
          <div className="py-5 text-center text-muted">
            <p className="fs-4">No courses are currently listed in this category.</p>
            <Link href="/programs" className="btn btn-outline-danger rounded-pill mt-2">
              Browse all programs &rsaquo;
            </Link>
          </div>
        ) : (
          <>
            <p className="text-muted mb-4">
              Showing {totalDocs} course{totalDocs !== 1 ? 's' : ''}
            </p>
            <div className="row g-0">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  )
}

// ── Static params ──────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'category',
    limit: 200,
    select: { slug: true },
  })
  return docs.filter((c) => c.slug).map((c) => ({ categorySlug: c.slug }))
}

// ── Metadata ───────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { categorySlug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'category',
    where: { slug: { equals: categorySlug } },
    depth: 1,
    limit: 1,
  })

  const category = docs[0]
  if (!category) return {}

  const description =
    category.description ?? `Browse ${category.name} courses and programmes at GRIT Hub.`

  return {
    title: `${category.name} | GRIT Hub Programs`,
    description,
    openGraph: {
      title: `${category.name} | GRIT Hub`,
      description,
      url: `https://grithub.org.za/programs/category/${categorySlug}`,
      siteName: 'GRIT Hub',
      images: category.image?.url
        ? [{ url: category.image.url, alt: category.image.alt ?? category.name }]
        : [],
    },
    alternates: {
      canonical: `https://grithub.org.za/programs/category/${categorySlug}`,
    },
  }
}
