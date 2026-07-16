// Fallback blur image used by Next/Image while the real image is loading.
import { blurImage } from "@/lib/constants";
// Shared frontend page styles. This supplies the card image class.
import Style from "@frontend/(pages)/page.module.scss";
// Next.js image component for optimized images.
import Image from "next/image";
// Next.js link component for client-side navigation to the article page.
import Link from "next/link";



// Renders one newsroom article card in the newsroom grid.
function NewsroomPod({ slug, "Main Image":mainImage, title, "Published Date":publishedAt }){
    // Payload is using the title as the article slug, so encode it before putting it in the URL.
    const articleSlug = encodeURIComponent(slug || title || '')

    return(
        // Bootstrap grid wrapper that controls the card width on desktop, tablet, and mobile.
        <div className="col-xl-4 col-md-6 col-12 p-2 mb-4">
            {/* Links the whole card to the article page. Possible failure: title changes will also change the URL. */}
            <Link className="card shadow-sm h-100 text-decoration-none card-link" href={`/newsroom/${articleSlug}`} title='Read More'>
                {/* Shows the article image. Possible failure: `mainImage` must be a valid image URL or imported image object for Next/Image. */}
                {typeof mainImage=== 'object' && mainImage?.url && (
                <Image
                    // Image source for the card thumbnail.
                    src={mainImage.url}
                    // Fixed image width used by Next/Image for sizing.
                    width={500}
                    // Fixed image height used by Next/Image for sizing.
                    height={333}
                    // Enables a blur placeholder before the image loads.
                    placeholder="blur"
                    // Supplies the tiny placeholder image data.
                    blurDataURL={blurImage}
                    // Applies shared card image styling.
                    className={Style.cardTopImg}
                    // Sets accessible alt text. Possible issue: if title is missing, this becomes "undefined image".
                    alt={title + " image"}
                />
                )}

                {/* Card body containing the article title, date, and read-more button text. */}
                <div className="card-body d-flex flex-column justify-content-between">
                    {/* Article title shown on the card. */}
                    <h2 className="card-title fs-5 fw-bold">
                        {title}
                    </h2>
                    {/* Formats the published date for display. Possible failure: invalid or missing `publishedAt` becomes "Invalid Date". */}
                    <small className="text-muted fs-7 mb-3">
                        {new Date(publishedAt).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </small>

                    {/* Visual read-more button inside the card link. */}
                    <p className="mb-0">
                        <span className="rounded-pill btn-danger px-4 btn btn-sm fw-bold" >
                            Read more &nbsp;&rsaquo;
                        </span>
                    </p>
                </div>
            </Link>
        </div>
    )
}

// Makes this card component available to the newsroom listing and homepage sections.
export default NewsroomPod;
