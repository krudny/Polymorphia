"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate from "react-paginate";
import { PaginationProps } from "@/interfaces/general/PaginationInterfaces";
import "../../styles/paginate.css";

export default function Pagination({
  totalPages,
  onPageChangeAction,
  forcePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      onPageChange={onPageChangeAction}
      forcePage={forcePage}
      pageRangeDisplayed={3}
      marginPagesDisplayed={3}
      containerClassName="pagination-container"
      pageClassName="pagination-page"
      previousLabel={<ChevronLeft />}
      nextLabel={<ChevronRight />}
      breakLabel="..."
    />
  );
}
