"use client";

import HallOfFameSearch from "@/components/hall-of-fame/general/HallOfFameSearch";
import Pagination from "@/components/pagination/Pagination";
import RankCardMobile from "@/components/hall-of-fame/mobile/HallOfFameCardMobile";
import { useContext } from "react";
import "./index.css";
import { useScaleShow } from "@/animations/General";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { HallOfFameContext } from "@/components/providers/hall-of-fame/HallOfFameContext";
import Loading from "@/components/general/Loading";
import { HallOfFameRecordDTO } from "@/interfaces/api/DTO";
import { handlePageChange } from "@/components/providers/hall-of-fame/utils/handlePageChange";

export default function HallOfFameMobile() {
  const wrapperRef = useScaleShow();
  const { data, setPage, isLoading, setIsModalOpen } =
    useContext(HallOfFameContext);

  return (
    <div ref={wrapperRef} className="hall-of-fame-mobile">
      <div className="hall-of-fame-mobile-search-wrapper">
        <HallOfFameSearch />
        <ButtonWithBorder
          text="Filtry"
          className="!mx-0 !py-0 !border-0 !border-b-2"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div className="hall-of-fame-mobile-rank-wrapper">
        {isLoading ? (
          <div className="hall-of-fame-loading-wrapper">
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
            totalPages={data.page.totalPages}
            forcePage={data.page.pageNumber}
            onPageChangeAction={handlePageChange(setPage)}
          />
        )}
      </div>
    </div>
  );
}
