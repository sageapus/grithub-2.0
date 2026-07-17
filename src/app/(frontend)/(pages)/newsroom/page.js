// Imports the reusable page heading component used at the top of the newsroom page.
import PageHeader from "components/layout/PageHeader";
// Imports Sanity helper functions that fetch newsroom posts from the current Sanity backend.
import { getLatestPosts, getPosts } from "services/sanity/sanity.service";//change this to payload one
// Imports the card component used to display one newsroom post in the grid.
import NewsroomPod from "components/newsroom/NewsroomPod";
// Imports the pagination component shown below the newsroom cards.
import Paginate from "components/navigation/Paginate";
// Imports scoped SCSS module classes for newsroom pagination styling.
import Style from "./newsroom.module.scss";
import {getPayload} from 'payload';
import config from '@payload-config'


// Defines the async server component that renders the main /newsroom page.
async function NewsHomePage({ searchParams}){
    // Sets how many newsroom posts should be shown on one page.
    const pageRange = 9;

    // Reads the previous and next query string values used by pagination.
    const { page } = await searchParams ?? null;
    const currentPage=Number(page) || 1
    // Fetches the visible posts for the current page range from Sanity.
    const payload= await getPayload({config})

    const latest = await payload.find({
        collection:'newsroom',
        limit: pageRange,
        page: currentPage,
        sort:'-publishedDate'
    })

    // Fetches all posts so the page can calculate how many pagination pages exist.
    const totalPosts = latest.totalDocs
    // Divides the total number of posts by the amount shown per page.
    let totalPages = Math.ceil(totalPosts/ pageRange)
    // Hides pagination when there is only one page of posts.
    totalPages = totalPages === 1 ? 0 : totalPages

    // Returns the JSX that builds the visible newsroom listing page.
    return(
        // Main layout wrapper for the newsroom content.
        <section className="container-xxl d-flex py-md-5 p-4 flex-column mb-5">
            {/* Renders the page title at the top. */}
            <PageHeader title="Newsroom" />
            
            {/* Wraps all newsroom article cards in a flexible grid row. */}
            <div className="col-12 d-flex flex-wrap">
                {/* Loops through each fetched post and renders one card for it. */}
                {latest.docs.map((post) => {
                    
                    // Returns a single newsroom card for this post.
                    return(
                        // Passes the post data into NewsroomPod and uses the slug as the React key.
                        <NewsroomPod key= {post.id} {...post} />
                    )
                })}
            </div>

            {/* Renders pagination controls for moving between newsroom pages. */}
            <Paginate 
                // Tells Paginate how many posts belong in each page range.
                range={pageRange}
                // Tells Paginate how many pages are available.
                pageCount={totalPages}
                // Sets the base URL path used by pagination links.
                pathName="/newsroom"
                // Applies the wrapper CSS class for the pagination block.
                containerClassName={Style.paginateBlock}
                // Applies the CSS class for each pagination item.
                pageClassName={Style.pageItem}
                // Applies the CSS class for each numbered page link.
                pageLinkClassName={Style.pageItemLink}
                // Applies the CSS class for the previous link.
                previousLinkClassName={Style.pageItemLink}
                // Applies the CSS class for the next link.
                nextLinkClassName={Style.pageItemLink}
                // Applies the CSS class for the active page link.
                activeLinkClassName={Style.activePage}
                // Applies the CSS class for the previous and next button icons.
                btnClassName={Style.pageBtn}
                // Applies the CSS class when a pagination button is disabled.
                disabledClassName={Style.disabled}
                // Applies the CSS class for the next button container.
                nextClassName={Style.pageBtnItem}
                // Applies the CSS class for the previous button container.
                previousClassName={Style.pageBtnItem}
            />
        </section>
    )
}

// Exports the newsroom listing page as the default route component.
export default NewsHomePage


// Defines metadata for the /newsroom page, including SEO and social sharing details.
export async function generateMetadata({ params, searchParams }) {
    // Reads pagination query values so the canonical URL can match the current page.
    const { previous, next } = await searchParams
    // Builds the canonical URL, including pagination values when present.
    const canonical = previous ? `https://grithub.org.za/newsroom?previous=${previous}&next=${next}` : `https://grithub.org.za/newsroom`
    
    // Returns the metadata object used by Next.js for this route.
    return {
        // Sets the browser and SEO title.
        title: "Newsroom",
        // Sets the SEO description for search engines and previews.
        description: "Innovating the Future: Stories, Insights, and Opportunities from GRIT Hub's Tech Ecosystem",
        // Sets SEO keywords for the newsroom page.
        keywords: "news, garden route, technology, innovation, ecosystem, insights, stories",
        // Sets Open Graph data used by social media link previews.
        openGraph:{
            // Sets the Open Graph preview title.
            title: "Newsroom",
            // Sets the Open Graph preview description.
            description: "Innovating the Future: Stories, Insights, and Opportunities from GRIT Hub's Tech Ecosystem",
            // Sets the Open Graph URL for the newsroom page.
            url: "https://grithub.co.za/newsroom",
            // Sets the site name shown in social previews.
            siteName: "GRIT Hub",
        },
        // Sets alternate link metadata for search engines.
        alternates: {
            // Sets the canonical URL for this page.
            canonical
        }
    }
}
