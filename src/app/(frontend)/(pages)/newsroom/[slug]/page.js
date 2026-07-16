// This brings in a special "Image" tool from Next.js that makes pictures load faster and look sharp.
import Image from "next/image";

// This import is commented out, so it does nothing right now — it's not active in the file.
//import { getPostBySlug } from "services/sanity/sanity.service";

// This brings in the CSS style rules (like colors, spacing, fonts) made specifically for this page.
import Style from "../newsroom.module.scss";

// This brings in a special "Link" tool so you can make clickable links that move between pages WITHOUT reloading the whole website.
import Link from "next/link";

// This import is commented out, so it does nothing right now.
//import { toHTML } from '@portabletext/to-html';

// This brings in a small helper tool that makes it easy to combine multiple CSS class names together.
import clsx from "clsx";

// This brings in a component that creates hidden "structured data" for search engines.
import NewsRoomSchema from "components/schema/NewsRoomSchema";

// This brings in Payload's real rich text renderer, plus its default "cookbook" of rendering rules (defaultJSXConverters), from the actual Payload package.
import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'
// This brings in a helper that turns Payload's rich text JSON into plain readable text (used later for meta descriptions).
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'


// This brings in your custom-made social share buttons component.
import ShareButtons from "components/newsroom/ShareButtons";

// This brings in ONE helper value (a blurry placeholder image) from your constants file. (voidPortableText was removed from this import.)
import { blurImage} from "lib/constants";

// This brings in your custom component that displays images placed INSIDE the article's body text.
import BodyImage from "components/newsroom/BodyImage";

// This brings in the actual "getPayload" function from the real Payload package.
import {getPayload} from 'payload';
// This brings in your actual Payload config file.
import config from '@payload-config'


// This starts the page component. It's "async" so it can wait for data to load before finishing.
async function NewsArticle({ params }) {
    // Sets a variable called "end" to 9 — meant to limit the sidebar list to 9 posts.
    const end=9
    
    // Creates a working connection to Payload using your config, so you can run queries against your database.
    const payload= await getPayload({config})
    
    // Asks Payload for up to 9 documents from the "newsroom" collection. This result is a WRAPPER object — it contains a .docs array plus pagination info, not a plain list of posts by itself.
    const latest = await payload.find({ collection:'newsroom',limit: end })
    
    // Pulls "slug" out of the page's route parameters (from the URL).
    const { slug } = await params;
    
    
    // Tries to build a safe, URL-encoded slug from either "slug" or "title" — BUT "title" was never defined anywhere above this line, so this will throw a ReferenceError and crash the page.
     const articleSlug = encodeURIComponent(slug || '')
    
    // Asks Payload to find newsroom documents where the "slug" field exactly matches "articleSlug". This returns the WRAPPER object again (with .docs inside), not the article itself directly.
    const post = await payload.find({collection:'newsroom',where:{slug:{equals:articleSlug}}})
    // Pulls the first (and presumably only) matching document out of the .docs array — this IS the actual single article object.
    const latestPost=post.docs[0]
    // Tries to build a readable date. This reaches into "Published Date" and then looks for a FURTHER nested ".publishedAt" inside it — but "Published Date" is already a plain date string, so this nested lookup returns undefined, making the whole date invalid ("Invalid Date").
    const date = new Date(latestPost["Published Date"]).toLocaleDateString('en-GB', {
        year: 'numeric',   // shows the full year, like "2026"
        month: 'long',     // shows the full month name, like "July" instead of "07"
        day: 'numeric'     // shows the day number, like "13"
    })

    // Defines a "converters" function for RichText — it receives Payload's built-in default converters and is meant to add/override specific ones.
    const customComponents = ({ defaultConverters }) => ({
    ...defaultConverters,
    upload: ({ node }) => <BodyImage value={node.value} />,
    horizontalrule: () => <hr className="my-4" />,
    link: ({ children, node }) => {
    // Handle both "custom" (external URL) and "internal" (linked document) link types
    const href = node.fields.linkType === 'internal'
        ? `/${node.fields.doc?.value?.slug ?? ''}`
        : node.fields.url

    const rel = href && !href.startsWith('/') ? 'noreferrer noopener' : undefined

    return (
        <a href={href} rel={rel} target={node.fields.newTab ? "_blank" : undefined}>
            {children}
        </a>
    )
}
})
  

    // Everything below this point is what actually gets displayed on the page.
    return(
        <>
            {/* Wraps the whole article section in a responsive flex container. */}
            <section className="container-xxl d-flex py-md-5 p-4 flex-column flex-md-row mb-5">
                {/* Main article column, 8/12 columns wide on medium+ screens. */}
                <article className="col-12 col-md-8 pe-md-5 mb-4">
                    {/* Top section holding the title and article meta info. */}
                    <header className="mb-4">
                        {/* Shows the article title. Reaches into "title", then looks for ANOTHER nested ".title" inside that — but "title" is already the plain string itself, so this nested lookup returns undefined. Nothing will show here. */}
                        <h1 className="display-6 fw-bold mb-3">
                            {latestPost["title"]}
                        </h1>

                        {/* List holding date, author, and share buttons. */}
                        <ul className={clsx(Style.headerList, "text-muted fs-6")}>
                            <li className={Style.headerListItem}>
                                {/* Inner list just for date + author. */}
                                <ul className={Style.metaList}>
                                    <li className={Style.metaListItem}>
                                        {/* Shows the (currently broken/invalid) date calculated above. */}
                                        Published on: {date}
                                    </li>
                                    <li className={Style.metaListItem}>
                                        {/* Same double-lookup bug — "Author" is already the plain string, so ?.author looks for a field that doesn't exist, meaning this ALWAYS falls back to the default org name, even when an author IS set. */}
                                        By: {latestPost["Author"]?? "Garden Route Innovation & Technology Hub"}
                                    </li>
                                </ul>
                            </li>
                           
                            <li className={Style.headerListItem}>
                                {/* Passes props to ShareButtons — but both "Body"?.body and "title"?.title have the same double-lookup bug, so both will be undefined. */}
                                <ShareButtons  
                                    body={latestPost["Body"]}
                                    title={latestPost["title"]}
                                    url={`https://grithub.org.za/newsroom/${slug}`}
                                />
                            </li>
                        </ul>
                    </header>

                    {/* Groups the main image and its caption together. */}
                    <figure className={Style.figure}>
                        {/* Checks if "Main Image" has a .url — this check is actually written CORRECTLY here. */}
                        {latestPost["Main Image"]?.url && (
                        <Image 
                            className={Style.image} 
                            placeholder="blur"  // shows a blurry version of the image while the real one loads
                            // Uses your static generic blur placeholder — this line works fine.
                            blurDataURL={blurImage}
                            // Bug: reaches into "Main Image", then looks for ANOTHER nested field called "mainImage" inside it, then tries to get .url off THAT. But "Main Image" already IS the image object with .url directly on it — there's no extra "mainImage" layer. This will crash with "Cannot read properties of undefined."
                            src={latestPost["Main Image"].url} 
                            // Same bug here — tries to reach a non-existent nested "mainImage" field for the alt text too.
                            alt={latestPost["Main Image"].alt ?? latestPost["title"]} 
                            width={900}   // reserves image width space
                            height={450}  // reserves image height space
                        />
                         )}
                        {/* Same double-lookup bug — "Image Caption" is already the plain caption string, so ?.mainImageCaption looks for a field that isn't there. This caption will never show, even when one is saved. */}
                        {latestPost["Image Caption"]&& (
                            <figcaption className={Style.caption}>
                                {latestPost["Image Caption"]}
                            </figcaption>
                        )}
                    </figure>

                    {/* Wraps the main article body content. */}
                    <div className={Style.body}>
                        {/* Renders the article body using Payload's real RichText component — BUT: (1) same double-lookup bug on "Body"?.body means the data passed in is undefined, and (2) the prop is called "components" here, but Payload's RichText expects a prop called "converters" — so even the customComponents function above never actually gets used by RichText at all. */}
                        <RichText data={latestPost["Body"]}
                            converters={customComponents}/>
                    </div>
                </article>

                {/* Sidebar column, 4/12 columns wide, for the "latest articles" list. */}
                <aside className="col-12 col-md-4">
                    <h3>Latest</h3>
                    <hr className="my-3"/>

                    <ul className="list-unstyled">
                        {/* Major bug: tries to call .docs.map() on "latestPost" — but latestPost is the SINGLE current article object (from post.docs[0] above), it has no .docs property at all. This will crash with "Cannot read properties of undefined (reading 'map')". The variable you actually want here is "latest" (fetched near the top), not "latestPost". On top of that, the loop variable is ALSO named "latestPost", which would shadow/hide the outer "latestPost" variable for the rest of this block, causing further confusion even if the crash weren't happening first. */}
                        {latest.docs.map((post) => {
                            return(
                                // Uses the (shadowed, inner) latestPost's .slug directly as the React key — this particular line is actually written correctly, assuming the .docs.map() bug above gets fixed.
                                <li key={post?.slug} className="mb-4">
                                    {/* Builds a link to each sidebar article using its slug — also correct in isolation. */}
                                    <Link href={`/newsroom/${post?.slug}`} title={post['title']}>
                                        <h4 className="fs-6 mb-1">
                                            {post['title']}
                                        </h4>
                                    </Link>
                                    {/* Same nested-lookup bug as the main date above — "Published Date" is already the plain date string, so ?.publishedAt returns undefined, giving "Invalid Date" for every sidebar item too. */}
                                    <small className="text-muted fs-7">
                                        {new Date(post["Published Date"]).toLocaleDateString('en-GB', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </small>
                                </li>
                            )
                        })}
                    </ul>
                </aside>
            </section>
        
            {/* Adds hidden structured data for search engines/social previews. Every prop here repeats the same nested-lookup bug pattern seen above, so all of these will be undefined. */}
            <NewsRoomSchema
                path={`https://grithub.org.za/newsroom/${slug}`}
                title={latestPost["title"]}
                description={latestPost["Body"]}
                image={latestPost["Main Image"]}
                author={latestPost["Author"] ?? "GRIT Hub Staff Writer"}
                postDate={latestPost["Published Date"]}
                dateUpdated={latestPost["updatedAt"]}
            />
        </>
    )
}

// This builds the SEO/social preview metadata for the page. Runs completely separately from the component above — it does NOT share any variables with it.
export async function generateMetadata(props, parent) {
    // Pulls "slug" from the route params, same as above.
    const { slug } = await props.params;
    
    // Same bug as before: "title" was never defined in THIS function either — this will crash with a ReferenceError the moment this function runs.
     const articleSlug = encodeURIComponent(slug || '')
     
    const payload= await getPayload({config})
    
    // Bug: uses "payload" here, but "payload" was only ever created INSIDE the NewsArticle component above — it does NOT exist in this separate function's scope. This will crash with "payload is not defined."
    const post = await payload.find({collection:'newsroom',where:{slug:{equals:articleSlug}}})
    const latestPost=post.docs[0]
    const body=latestPost.Body

    // Bug: uses "body" here, but "body" was never defined anywhere in this function — you likely meant "latestPost.Body" or similar. This will crash with "body is not defined."
    const htmlBody = typeof body === 'string' ? body : body ? convertLexicalToPlaintext({ data: body }) : ''
    
    
    // Grabs the first 160 characters of the (currently broken) htmlBody, then strips out any HTML tags.
    const newMetaDescription = htmlBody.slice(0, 160).replace(/(<([^>]+)>)/gi, "")

    // Returns the metadata object Next.js uses for SEO tags and social preview cards.
    return {
        title: latestPost?.title,  // This one is written correctly — no double-lookup bug here.
        description: htmlBody.slice(0, 160),
        alternates: {
            canonical: `https://grithub.org.za/newsroom/${slug}`
        },
        openGraph: {
            url: `https://grithub.org.za/newsroom/${slug}`,
            // Bug: uses "post?.title" here — "post" is the WRAPPER object (with .docs inside), not the article itself, so this is undefined even though the line right above it (using "latestPost") is correct.
            title: latestPost?.title,
            description: newMetaDescription,
            type: "website",
            images:[{
                url: latestPost["Main Image"]?.url,  // This one is correct — "Main Image" really does have .url directly on it.
                alt: latestPost["title"],  // Same double-lookup bug as elsewhere — "title" is already the plain string, so ?.title returns undefined.
                width: 800,
                height: 800,
            }]
        }
    }
}

// Makes NewsArticle the default export, so Next.js treats this as the page for this route.
export default NewsArticle