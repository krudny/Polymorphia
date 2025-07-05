"use client";

import RankSearch from "@/components/hall-of-fame/RankSearch";
import Pagination from "@/components/general/Pagination";
import RankCardMobile from "@/components/hall-of-fame/RankCardMobile";
import { useContext } from "react";
import "../../styles/hall-of-fame.css";
import { useScaleShow } from "@/animations/General";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { HallOfFameContext } from "@/components/providers/HallOfFameContext";
import { handlePageChange } from "@/services/hall-of-fame/Helpers";
import FiltersModal from "@/components/hall-of-fame/modals/FiltersModal";
import Loading from "@/components/general/Loading";
import { HallOfFameRecordDTO } from "@/interfaces/api/DTO";

export default function RankMobile() {
  const wrapperRef = useScaleShow();
  const { data, setPage, isLoading, setIsModalOpen } =
    useContext(HallOfFameContext);

  return (
    <div ref={wrapperRef} className="hall-of-fame-mobile">
      <div className="hall-of-fame-mobile-search-wrapper">
        <RankSearch />
        <ButtonWithBorder
          text="Filtry"
          className="!mx-0 !py-0 !border-0 !border-b-2"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div className="hall-of-fame-mobile-rank-wrapper">
        {isLoading ? (
          <div className="relative w-full h-full flex-centered ">
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
