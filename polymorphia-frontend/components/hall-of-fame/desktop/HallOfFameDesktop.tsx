import { useScaleShow } from "@/animations/General";
import HallOfFameSearch from "@/components/hall-of-fame/general/HallOfFameSearch";
import HallOfFameCardDesktop from "@/components/hall-of-fame/desktop/HallOfFameCardDesktop";
import Pagination from "@/components/pagination/Pagination";
import "./index.css";
import { useContext } from "react";
import { HallOfFameContext } from "@/components/providers/hall-of-fame/HallOfFameContext";
import { HallOfFameRecordDTO } from "@/interfaces/api/DTO";
import Loading from "@/components/loading/Loading";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import HallOfFamePodium from "@/components/hall-of-fame/desktop/HallOfFamePodium";
import { handlePageChange } from "@/components/providers/hall-of-fame/utils/handlePageChange";

export default function HallOfFameDesktop() {
  const wrapperRef = useScaleShow();

  const { data, setPage, isLoading, setIsModalOpen } =
    useContext(HallOfFameContext);

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
            <HallOfFameSearch />
            <ButtonWithBorder
              text="Filtry"
              className="!mx-0 !py-0 !border-0 !border-b-2"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <div className="hall-of-fame-desktop-rank-wrapper">
            {isLoading ? (
              <div className="hall-of-fame-loading-wrapper">
                <Loading />
              </div>
            ) : (
              data.content.map((record: HallOfFameRecordDTO) => (
                <HallOfFameCardDesktop
                  key={`rank-${record.userDetails.position}`}
                  userDetails={record.userDetails}
                  xpDetails={record.xpDetails}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="hall-of-fame-pagination-wrapper justify-end">
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
