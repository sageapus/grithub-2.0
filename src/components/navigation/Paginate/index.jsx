"use client"

import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import PaginateBtn from "./PaginateBtn";
import { useSearchParams } from "next/navigation"

function Paginate({
    range = 3,
    pageCount,
    pathName = "/",
    containerClassName,
    pageClassName,
    pageLinkClassName,
    previousLinkClassName,
    nextLinkClassName,
    activeLinkClassName,
    btnClassName,
    disabledClassName,
    previousClassName,
    nextClassName
}){
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    function pageChanged(event){
    const { selected } = event;
    
    const newPage = selected + 1;

    router.push(`${pathName}?page=${newPage}`)
}


    return(
        <ReactPaginate 
            pageRangeDisplayed={range}
            onPageChange={pageChanged}
            {...{ 
                containerClassName,
                renderOnZeroPageCount: null,
                breakLabel: "...",
                nextLabel: <PaginateBtn className={btnClassName} direction="next" />,
                previousLabel: <PaginateBtn className={btnClassName} />,
                pageCount,
                pageClassName,
                pageLinkClassName,
                previousLinkClassName,
                nextLinkClassName,
                activeLinkClassName,
                disabledClassName,
                previousClassName,
                nextClassName
            }}
        />
    )
}

export default Paginate;