"use client";

import "./index.css";
import { useScaleShow } from "@/animations/ScaleShow";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Search from "@/components/search";
import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import HallOfFamePagination from "@/components/hall-of-fame/general/HallOfFamePagination";
import HallOfFameList from "@/components/hall-of-fame/general/HallOfFameList";

export default function HallOfFameMobile() {
  const wrapperRef = useScaleShow();
  const { setIsModalOpen, search, setSearch } = useHallOfFameContext();

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
          className="!mx-0 !py-0 !border-0 !border-b-2 !rounded-none"
          size="sm"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <HallOfFameList />
      <HallOfFamePagination />
    </div>
  );
}
