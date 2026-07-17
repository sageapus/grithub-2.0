import Image from "next/image";
import Style from "../newsroom.module.scss";
import Link from "next/link";
import clsx from "clsx";
import NewsRoomSchema from "components/schema/NewsRoomSchema";
import { defaultJSXConverters, RichText } from '@payloadcms/richtext-lexical/react'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import ShareButtons from "components/newsroom/ShareButtons";
import { blurImage} from "lib/constants";
import BodyImage from "components/newsroom/BodyImage";
import {getPayload} from 'payload';
import config from '@payload-config'

async function NewsArticle({ params }) {
    const end=9
    const payload= await getPayload({config})
    const latest = await payload.find({ collection:'newsroom',limit: end ,sort:'-publishedDate'})
    const { slug } = await params;
    const articleSlug = encodeURIComponent(slug || '')
    const post = await payload.find({collection:'newsroom',where:{slug:{equals:articleSlug}}})
    const latestPost=post.docs[0]
    const date = new Date(latestPost["publishedDate"]).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    const customComponents = ({ defaultConverters }) => ({
    ...defaultConverters,
    upload: ({ node }) => (
    <BodyImage 
        mainImage={node.value} 
        caption={node.fields?.caption} 
        Style={Style} 
    />
),
    marks:{
        hr: () => <hr className="my-4" />,
        link: ({ children, node }) => {
       const rel = !node.fields.url.startsWith('/') ? 'noreferrer noopener' : undefined

    return (
        <a href={node.fields.url} rel={rel} target={node.fields.newTab ? "_blank" : undefined}>
            {children}
        </a>
    )
}}
})

    return(
        <>
            <section className="container-xxl d-flex py-md-5 p-4 flex-column flex-md-row mb-5">
                <article className="col-12 col-md-8 pe-md-5 mb-4">
                    <header className="mb-4">
                        <h1 className="display-6 fw-bold mb-3">
                            {latestPost["title"]}
                        </h1>

                        <ul className={clsx(Style.headerList, "text-muted fs-6")}>
                            <li className={Style.headerListItem}>
                                <ul className={Style.metaList}>
                                    <li className={Style.metaListItem}>
                                        Published on: {date}
                                    </li>
                                    <li className={Style.metaListItem}>
                                        By: {latestPost["Author"]?? "Garden Route Innovation & Technology Hub"}
                                    </li>
                                </ul>
                            </li>
                           
                            <li className={Style.headerListItem}>
                                <ShareButtons  
                                    body={latestPost["Body"]}
                                    title={latestPost["title"]}
                                    url={`https://grithub.org.za/newsroom/${slug}`}
                                />
                            </li>
                        </ul>
                    </header>

                    <figure className={Style.figure}>
                        {latestPost["Main Image"]?.url && (
                        <Image 
                            className={Style.image} 
                            placeholder="blur"
                            blurDataURL={blurImage}
                            src={latestPost["Main Image"].url} 
                            alt={latestPost["Main Image"].alt ?? latestPost["title"]} 
                            width={900}
                            height={450}
                        />
                         )}
                        {latestPost["Image Caption"]&& (
                            <figcaption className={Style.caption}>
                                {latestPost["Image Caption"]}
                            </figcaption>
                        )}
                    </figure>

                    <div className={Style.body}>
                        <RichText data={latestPost["Body"]}
                            converters={customComponents}/>
                    </div>
                </article>

                <aside className="col-12 col-md-4">
                    <h3>Latest</h3>
                    <hr className="my-3"/>

                    <ul className="list-unstyled">
                        {latest.docs.map((post) => {
                            return(
                                <li key={post?.slug} className="mb-4">
                                    <Link href={`/newsroom/${post?.slug}`} title={post['title']}>
                                        <h4 className="fs-6 mb-1">
                                            {post['title']}
                                        </h4>
                                    </Link>
                                    <small className="text-muted fs-7">
                                        {new Date(post["publishedDate"]).toLocaleDateString('en-GB', {
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

            <NewsRoomSchema
                path={`https://grithub.org.za/newsroom/${slug}`}
                title={latestPost["title"]}
                description={latestPost["Body"]}
                image={latestPost["Main Image"]}
                author={latestPost["Author"] ?? "GRIT Hub Staff Writer"}
                postDate={latestPost["publishedDate"]}
                dateUpdated={latestPost["updatedAt"]}
            />
        </>
    )
}

export async function generateMetadata(props, parent) {
    const { slug } = await props.params;
    const articleSlug = encodeURIComponent(slug || '')
    const payload= await getPayload({config})
    const post = await payload.find({collection:'newsroom',where:{slug:{equals:articleSlug}}})
    const latestPost=post.docs[0]
    const body=latestPost.Body
    const htmlBody = typeof body === 'string' ? body : body ? convertLexicalToPlaintext({ data: body }) : ''
    const newMetaDescription = htmlBody.slice(0, 160).replace(/(<([^>]+)>)/gi, "")

    return {
        title: latestPost?.title,
        description: htmlBody.slice(0, 160),
        alternates: {
            canonical: `https://grithub.org.za/newsroom/${slug}`
        },
        openGraph: {
            url: `https://grithub.org.za/newsroom/${slug}`,
            title: latestPost?.title,
            description: newMetaDescription,
            type: "website",
            images:[{
                url: latestPost["Main Image"]?.url,
                alt: latestPost["title"],
                width: 800,
                height: 800,
            }]
        }
    }
}

export default NewsArticle