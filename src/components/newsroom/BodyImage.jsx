// Next.js image component for optimized image rendering.
import Image from "next/image";
// Small fallback blur image shown while the real image is loading.
import { blurImage } from "@/lib/constants";


// Renders a Payload media image for the newsroom article body.
function BodyImage({ mainImage, value, Style }){
    return (
        // Wraps the image and caption in a semantic figure element.
        <figure className={Style.figure}>
            {/* Only render the image when Payload returns a populated media object with a URL. */}
            {typeof mainImage === 'object' && mainImage?.url && (
                <Image
                    className={Style.image}
                    src={mainImage.url}
                    width={800}
                    height={547}
                    alt={value?.alt ?? mainImage?.alt ?? "image"}
                    placeholder="blur"
                    blurDataURL={blurImage}
                />
            )}

            {/* Shows the caption when the caller provides one. */}
            <figcaption className={Style.caption}>
                {value?.caption}
            </figcaption>
        </figure>
    )
}

// Makes this image renderer available to newsroom article pages.
export default BodyImage
