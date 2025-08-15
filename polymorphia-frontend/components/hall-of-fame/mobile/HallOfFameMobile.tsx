"use client";

import Pagination from "@/components/pagination/Pagination";
import RankCardMobile from "@/components/hall-of-fame/mobile/HallOfFameCardMobile";
import { useContext } from "react";
import "./index.css";
import { useScaleShow } from "@/animations/ScaleShow";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { HallOfFameContext } from "@/components/providers/hall-of-fame/HallOfFameContext";
import { HallOfFameRecordDTO } from "@/interfaces/api/DTO";
import { handlePageChange } from "@/components/providers/hall-of-fame/utils/handlePageChange";
import Loading from "@/components/loading/Loading";
import Search from "@/components/search";

export default function HallOfFameMobile() {
  const wrapperRef = useScaleShow();
  const { data, setPage, isLoading, setIsModalOpen, search, setSearch } =
    useContext(HallOfFameContext);

  return (
    <div ref={wrapperRef} className="hall-of-fame-mobile">
      <div className="hall-of-fame-mobile-search-wrapper">
        <Search
          search={search}
          setSearch={setSearch}
          placeholder="Znajdź zwierzaka..."
        />
        <ButtonWithBorder
          text="Filtry"
          className="!mx-0 !py-0 !border-0 !border-b-2"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div className="hall-of-fame-mobile-rank-wrapper">
        {isLoading ? (
          <div className="hall-of-fame-loading-wrapper lg:hidden">
            <Loading />
          </div>
        ) : (
          data.content.map((record: HallOfFameRecordDTO) => (
            <RankCardMobile
              key={`rank-${record.userDetails.position}`}
              userDetails={record.userDetails}
              xpDetails={record.xpDetails}
            />
          ))
        )}{" "}
      </div>

      <div className="hall-of-fame-pagination-wrapper">
        {!isLoading && data.page.totalPages > 0 && (
          <Pagination
            pageCount={data.page.totalPages}
            forcePage={data.page.pageNumber}
            onPageChange={handlePageChange(setPage)}
          />
        )}
      </div>
    </div>
  );
}
