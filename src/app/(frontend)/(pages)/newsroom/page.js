import PageHeader from "components/layout/PageHeader";
import { getLatestPosts, getPosts } from "services/sanity/sanity.service";
import NewsroomPod from "components/newsroom/NewsroomPod";
import Paginate from "components/navigation/Paginate";
import Style from "./newsroom.module.scss";
import {getPayload} from 'payload';
import config from '@payload-config'

async function NewsHomePage({ searchParams}){
    const pageRange = 9;
    const { page } = await searchParams ?? null;
    const currentPage=Number(page) || 1
    const payload= await getPayload({config})

    const latest = await payload.find({
        collection:'newsroom',
        limit: pageRange,
        page: currentPage,
        sort:'-publishedDate'
    })

    const totalPosts = latest.totalDocs
    let totalPages = Math.ceil(totalPosts/ pageRange)
    totalPages = totalPages === 1 ? 0 : totalPages

    return(
        <section className="container-xxl d-flex py-md-5 p-4 flex-column mb-5">
            <PageHeader title="Newsroom" />
            
            <div className="col-12 d-flex flex-wrap">
                {latest.docs.map((post) => {
                    return(
                        <NewsroomPod key= {post.id} {...post} />
                    )
                })}
            </div>

            <Paginate 
                range={pageRange}
                pageCount={totalPages}
                pathName="/newsroom"
                containerClassName={Style.paginateBlock}
                pageClassName={Style.pageItem}
                pageLinkClassName={Style.pageItemLink}
                previousLinkClassName={Style.pageItemLink}
                nextLinkClassName={Style.pageItemLink}
                activeLinkClassName={Style.activePage}
                btnClassName={Style.pageBtn}
                disabledClassName={Style.disabled}
                nextClassName={Style.pageBtnItem}
                previousClassName={Style.pageBtnItem}
            />
        </section>
    )
}

export default NewsHomePage

export async function generateMetadata({ params, searchParams }) {
    const { previous, next } = await searchParams
    const canonical = previous ? `https://grithub.org.za/newsroom?previous=${previous}&next=${next}` : `https://grithub.org.za/newsroom`
    
    return {
        title: "Newsroom",
        description: "Innovating the Future: Stories, Insights, and Opportunities from GRIT Hub's Tech Ecosystem",
        keywords: "news, garden route, technology, innovation, ecosystem, insights, stories",
        openGraph:{
            title: "Newsroom",
            description: "Innovating the Future: Stories, Insights, and Opportunities from GRIT Hub's Tech Ecosystem",
            url: "https://grithub.co.za/newsroom",
            siteName: "GRIT Hub",
        },
        alternates: {
            canonical
        }
    }
}
