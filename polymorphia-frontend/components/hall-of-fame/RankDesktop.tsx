"use client";
import RankPodium from "@/components/hall-of-fame/RankPodium";
import RankSearch from "@/components/hall-of-fame/RankSearch";
import RankCardDesktop from "@/components/hall-of-fame/RankCardDesktop";
import Pagination from "@/components/general/Pagination";
import "../../styles/hall-of-fame.css";
import { useContext } from "react";
import Loading from "@/components/general/Loading";
import { HallOfFameContext } from "@/components/providers/HallOfFameContext";
import ButtonWithBorder from "@/components/general/ButtonWithBorder";
import FiltersModal from "@/components/hall-of-fame/modals/FiltersModal";

export default function RankDesktop() {
  const { data, page, setPage, isLoading, filtersState, appliedFiltersState, getAllCategories, filtersDispatch } =
    useContext(HallOfFameContext);

  const rankingOptions = appliedFiltersState.categories.find((cat) => cat.id === "rankingOptions")?.selectedOptions;

  return (
    <div className="hall-of-fame-desktop">
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
            <ButtonWithBorder
              text="Filtry"
              className="!mx-0 !py-0 !border-0 !border-b-2"
              onClick={() => filtersDispatch({ type: "TOGGLE_MODAL" })}
            />
          </div>
          <div className="hall-of-fame-desktop-rank-wrapper">
            {isLoading ? (
              <div className="relative w-full h-full flex-centered ">
                <Loading />
              </div>
            ) : (
              data.content.map((item, index) => {
                const filteredXpDetails = Object.fromEntries(
                  Object.entries(item.xpDetails).filter(([key]) =>
                    rankingOptions.includes(key)
                  )
                );

                return (
                  <RankCardDesktop
                    key={`rank-${index}-${item.userDetails.studentName}`}
                    userDetails={item.userDetails}
                    xpDetails={filteredXpDetails}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="hall-of-fame-pagination-wrapper justify-end">
        {!isLoading && (
          <Pagination
            totalPages={data.page.totalPages}
            forcePage={page}
            onPageChangeAction={setPage}
          />
        )}
      </div>

      {filtersState.isModalOpen && <FiltersModal />}
    </div>
  );
}
