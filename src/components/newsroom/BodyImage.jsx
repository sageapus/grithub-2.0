import Image from "next/image";
import { blurImage } from "@/lib/constants";

function BodyImage({ mainImage, caption, Style }){
    if (!mainImage?.url) return null
    return (
        <figure className={Style.figure}>
            {typeof mainImage === 'object' && mainImage?.url && (
                <Image
                    className={Style.image}
                    src={mainImage.url}
                    width={800}
                    height={547}
                    alt={caption?.alt ?? mainImage?.alt ?? "image"}
                    placeholder="blur"
                    blurDataURL={blurImage}
                />
            )}

            {caption && <figcaption className={Style.caption}>{caption}</figcaption>}
        </figure>
    )
}

export default BodyImage
