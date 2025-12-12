"use client";

import "./index.css";
import "@/components/hall-of-fame/index.css";
import { useScaleShow } from "@/animations/ScaleShow";
import HallOfFamePagination from "@/components/hall-of-fame/general/pagination";
import HallOfFameList from "@/components/hall-of-fame/general/list";
import HallOfFameTopBar from "@/components/hall-of-fame/general/top-bar";

export default function HallOfFameMobile() {
  const wrapperRef = useScaleShow();

  return (
    <div ref={wrapperRef} className="main-mobile">
      <div className="main-mobile-search-wrapper">
        <HallOfFameTopBar />
      </div>
      <HallOfFameList />
      <HallOfFamePagination />
    </div>
  );
}
