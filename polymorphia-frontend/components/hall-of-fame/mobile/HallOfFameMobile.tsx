"use client";

import Pagination from "@/components/pagination/Pagination";
import RankCardMobile from "@/components/hall-of-fame/mobile/HallOfFameCardMobile";
import "./index.css";
import { useScaleShow } from "@/animations/ScaleShow";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";
import { handlePageChange } from "@/components/providers/hall-of-fame/utils/handlePageChange";
import Loading from "@/components/loading/Loading";
import Search from "@/components/search";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";

export default function HallOfFameMobile() {
  const wrapperRef = useScaleShow();
  const { hallOfFame, setPage, isLoading, setIsModalOpen, search, setSearch } = useHallOfFameContext();

  if (isLoading || !hallOfFame) {
    return <Loading />;
  }

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
        {
          hallOfFame.content.map((record: HallOfFameRecordDTO) => (
            <RankCardMobile
              key={`rank-${record.userDetails.position}`}
              userDetails={record.userDetails}
              xpDetails={record.xpDetails}
            />
          ))
        }
      </div>

      <div className="hall-of-fame-pagination-wrapper">
        {!isLoading && hallOfFame.page.totalPages > 0 && (
          <Pagination
            pageCount={hallOfFame.page.totalPages}
            forcePage={hallOfFame.page.pageNumber}
            onPageChange={handlePageChange(setPage)}
          />
        )}
      </div>
    </div>
  );
}
