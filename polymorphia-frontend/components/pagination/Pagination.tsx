"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import "./index.css";

export default function Pagination(props: ReactPaginateProps) {
  return (
    <ReactPaginate
      {...props}
      pageRangeDisplayed={props.pageRangeDisplayed ?? 3}
      marginPagesDisplayed={props.marginPagesDisplayed ?? 3}
      containerClassName={`${props.containerClassName} pagination-container`}
      pageClassName={props.pageClassName ?? "pagination-page"}
      previousLabel={props.previousLabel ?? <ChevronLeft />}
      nextLabel={props.nextLabel ?? <ChevronRight />}
      breakLabel={props.breakLabel ?? "..."}
    />
  );
}
