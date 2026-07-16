// This is a client component because it renders a Next.js Script tag on the page.
"use client"

// Next.js component for safely adding script tags to a page.
import Script from "next/script"
// Converts Sanity Portable Text into HTML so it can be shortened into a description.
// Payload note: this is Sanity-specific and should be replaced if description is Payload Lexical rich text.
// import { toHTML } from '@portabletext/to-html'
// Portable Text options used when converting the article body into HTML.
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

import { voidPortableText } from "lib/constants"


// Renders JSON-LD structured data for a newsroom article.
export default function NewsRoomSchema({ path, title = "", description = "", image, author="", postDate="", dateUpdated="" }){
    // Converts the article description/body from Portable Text into HTML.
        const plainText = typeof description === 'string' ? description : description ? convertLexicalToPlaintext({ data: description }) : ''
    
    //const htmlBody = toHTML(description, voidPortableText)
    // Takes only the first 160 characters for the schema description.
    const metaDescription = plainText.slice(0, 160)

    // Removes HTML tags so the schema description is plain text.
    const newMetaDescription = metaDescription.replace(/(<([^>]+)>)/gi, "")

    // Builds the JSON-LD script content expected by Google and other search engines.
    const data = () => {
        return{
            __html: `{
                "@context": "https://schema.org/",
                "@type": "BlogPosting",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "${path}"
                },
                "headline": "${title}",
                "description": '${newMetaDescription}',
                "image": {
                    "@type": "ImageObject",
                    "url": "${image}"
                },
                "author": {
                    "@type": "Person",
                    "name": "${author}"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "Garden Route Innovation & Technology Hub",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://grithub.org.za/assets/grithub-logo-horz.svg"
                    }
                },
                "datePublished": "${postDate}",
                "dateModified": "${dateUpdated}"
            }`
        }
    }


    return(
        // Injects the BlogPosting JSON-LD into the page.
        <Script
            type="application/ld+json"
            id="newsroomSchema"
            dangerouslySetInnerHTML={data()}
            key="item-jsonld-blog"
        />
    )
}
