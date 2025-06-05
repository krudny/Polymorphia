"use client"
import {ChevronLeft, ChevronRight} from "lucide-react";
import ReactPaginate from "react-paginate";

export default function Pagination({totalPages, onPageChange, forcePage}) {
    return (
        <ReactPaginate
            pageCount={totalPages}
            onPageChange={onPageChange}
            forcePage={forcePage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={3}
            containerClassName="pagination-container"
            pageClassName="pagination-page"
            previousLabel={<ChevronLeft />}
            nextLabel={<ChevronRight />}
            breakLabel="..."
        />
    )
}