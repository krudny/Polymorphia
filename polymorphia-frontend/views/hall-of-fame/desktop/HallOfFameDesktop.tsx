import {useScaleShow} from "@/animations/ScaleShow";
import "./index.css";
import "../general/index.css";
import HallOfFamePodium from "@/views/hall-of-fame/desktop/HallOfFamePodium";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Search from "@/components/search";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import HallOfFameList from "@/views/hall-of-fame/general/HallOfFameList";
import HallOfFamePagination from "@/views/hall-of-fame/general/HallOfFamePagination";

export default function HallOfFameDesktop() {
  const { search, setSearch, setIsModalOpen } = useHallOfFameContext();
  const wrapperRef = useScaleShow();

  return (
    <div ref={wrapperRef} className="hall-of-fame-desktop">
      <div className="hall-of-fame-desktop-wrapper">
        <div className="hall-of-fame-desktop-podium-wrapper">
          <div className="hall-of-fame-desktop-podium-text">
            <h2>Podium</h2>
          </div>
          <HallOfFamePodium />
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
              className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <HallOfFameList />
        </div>
      </div>
      <HallOfFamePagination />
    </div>
  );
}
