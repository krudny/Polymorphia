"use client";
import "../../../styles/paginate.css";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect, useState } from "react";
import RankDesktop from "@/components/hall-of-fame/RankDesktop";
import RankMobile from "@/components/hall-of-fame/RankMobile";
import "../../../styles/hall-of-fame.css";
import { useQuery } from "@tanstack/react-query";
import HallOfFameService from "@/services/HallOfFameService";
import Loading from "@/components/general/Loading";
import { useScaleShow } from "@/animations/General";
import { HallOfFameProvider } from "@/components/providers/HallOfFameContext";

export default function HallOfFame() {
  const { setTitle } = useTitle();
  const wrapperRef = useScaleShow();

  useEffect(() => {
    setTitle("Hall of Fame");
  }, [setTitle]);

  return (
    <HallOfFameProvider>
      <div className="" ref={wrapperRef}>
        <div className="w-full lg:hidden">{/*<RankMobile />*/}</div>
        <div className="w-full hidden lg:block">
          <RankDesktop />
        </div>
      </div>
    </HallOfFameProvider>
  );
}
