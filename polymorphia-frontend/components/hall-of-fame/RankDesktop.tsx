import { useScaleShow } from "@/animations/General";
import RankPodium from "@/components/hall-of-fame/RankPodium";
import RankSearch from "@/components/hall-of-fame/RankSearch";
import RankSort from "@/components/hall-of-fame/RankSort";
import RankCardDesktop from "@/components/hall-of-fame/RankCardDesktop";
import Pagination from "@/components/general/Pagination";
import "../../styles/hall-of-fame.css";
import {useContext} from "react";
import { HallOfFameContext } from "@/components/providers/HallOfFameContext";
import { HallOfFameRecordDTO } from "@/interfaces/api/DTO";
import { handlePageChange } from "@/services/hall-of-fame/Helpers";
import Loading from "@/components/general/Loading";

export default function RankDesktop() {
  const wrapperRef = useScaleShow();

  const { data, setPage, isLoading } = useContext(HallOfFameContext);

  return (
    <div ref={wrapperRef} className="hall-of-fame-desktop">
      <div className="hall-of-fame-desktop-wrapper">
        <div className="hall-of-fame-desktop-podium-wrapper">
          <div className="hall-of-fame-desktop-podium-text">
            <h2>Podium</h2>
          </div>
          <div className="hall-of-fame-desktop-podium">
              <RankPodium />
          </div>
        </div>
        <div className="hall-of-fame-desktop-content-wrapper">
          <div className="hall-of-fame-desktop-search-wrapper">
            <RankSearch />
            <RankSort />
          </div>
          <div className="hall-of-fame-desktop-rank-wrapper">
            {isLoading ? (
              <div className="relative w-full h-full flex-centered ">
                <Loading />
              </div>
            ) : (
              data.content.map((record: HallOfFameRecordDTO) => (
                <RankCardDesktop
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
        {!isLoading && (
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
