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
import HallOfFameTopBar from "@/views/hall-of-fame/general/HallOfFameTopBar";

export default function HallOfFameMobile() {
  const wrapperRef = useScaleShow();

  return (
    <div ref={wrapperRef} className="hall-of-fame-mobile">
      <div className="hall-of-fame-mobile-search-wrapper">
        <HallOfFameTopBar />
      </div>
      <HallOfFameList />
      <HallOfFamePagination />
    </div>
  );
}
