import { useScaleShow } from "@/animations/ScaleShow";
import Pagination from "@/components/pagination/Pagination";
import "./index.css";
import "../general/index.css";
import { handlePageChange } from "@/components/providers/hall-of-fame/utils/handlePageChange";
import HallOfFamePodium from "@/components/hall-of-fame/desktop/HallOfFamePodium";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Loading from "@/components/loading/Loading";
import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";
import HallOfFameCardDesktop from "@/components/hall-of-fame/desktop/HallOfFameCardDesktop";
import Search from "@/components/search";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";

export default function HallOfFameDesktop() {
  const wrapperRef = useScaleShow();
  const { hallOfFame, setPage, isLoading, setIsModalOpen, search, setSearch } = useHallOfFameContext();

  if (isLoading || !hallOfFame) {
    return <Loading />;
  }

  return (
    <div ref={wrapperRef} className="hall-of-fame-desktop">
      <div className="hall-of-fame-desktop-wrapper">
        <div className="hall-of-fame-desktop-podium-wrapper">
          <div className="hall-of-fame-desktop-podium-text">
            <h2>Podium</h2>
          </div>
          <div className="hall-of-fame-desktop-podium">
            <HallOfFamePodium />
          </div>
        </div>
        <div className="hall-of-fame-desktop-content-wrapper">
          <div className="hall-of-fame-desktop-search-wrapper">
            <Search
              search={search}
              setSearch={setSearch}
              placeholder="Znajdź zwierzaka..."
            />
            <ButtonWithBorder
              text="Filtry"
              className="!mx-0 !py-0 !border-0 !border-b-2"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div className="hall-of-fame-desktop-rank-wrapper">
            {
              hallOfFame.content.map((record: HallOfFameRecordDTO) => (
                <HallOfFameCardDesktop
                  key={`rank-${record.userDetails.position}`}
                  userDetails={record.userDetails}
                  xpDetails={record.xpDetails}
                />
              ))
            }
          </div>
        </div>
      </div>
      <div className="hall-of-fame-pagination-wrapper justify-end">
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
