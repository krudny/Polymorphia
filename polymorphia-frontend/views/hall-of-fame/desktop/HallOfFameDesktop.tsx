import { useScaleShow } from "@/animations/ScaleShow";
import "./index.css";
import "../general/index.css";
import HallOfFamePodium from "@/views/hall-of-fame/desktop/HallOfFamePodium";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Search from "@/components/search";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import HallOfFameList from "@/views/hall-of-fame/general/HallOfFameList";
import HallOfFamePagination from "@/views/hall-of-fame/general/HallOfFamePagination";
import useUserContext from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";

export default function HallOfFameDesktop() {
  const { search, setSearch, setAreFiltersOpen, setShouldScrollToMe } =
    useHallOfFameContext();
  const { userRole } = useUserContext();
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
            <div className="hall-of-fame-search-buttons">
              {userRole === Roles.STUDENT && (
                <ButtonWithBorder
                  text="Znajdź mnie"
                  className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none"
                  onClick={() => setShouldScrollToMe(true)}
                />
              )}
              <ButtonWithBorder
                text="Filtry"
                className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none"
                onClick={() => setAreFiltersOpen(true)}
              />
            </div>
          </div>
          <HallOfFameList />
        </div>
      </div>
      <HallOfFamePagination />
    </div>
  );
}
