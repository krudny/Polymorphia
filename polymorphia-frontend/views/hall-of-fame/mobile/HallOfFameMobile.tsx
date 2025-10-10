"use client";

import "./index.css";
import "../general/index.css";
import { useScaleShow } from "@/animations/ScaleShow";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Search from "@/components/search";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import HallOfFamePagination from "@/views/hall-of-fame/general/HallOfFamePagination";
import HallOfFameList from "@/views/hall-of-fame/general/HallOfFameList";
import { Roles } from "@/interfaces/api/user";
import useUserContext from "@/hooks/contexts/useUserContext";

export default function HallOfFameMobile() {
  const wrapperRef = useScaleShow();
  const { setAreFiltersOpen, search, setSearch, setShouldScrollToMe } =
    useHallOfFameContext();
  const { userRole } = useUserContext();

  return (
    <div ref={wrapperRef} className="hall-of-fame-mobile">
      <div className="hall-of-fame-mobile-search-wrapper">
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
      <HallOfFamePagination />
    </div>
  );
}
