"use client";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import { HallOfFameProvider } from "@/components/providers/hall-of-fame/HallOfFameContext";
import HallOfFameMobile from "@/components/hall-of-fame/mobile/HallOfFameMobile";
import FiltersModal from "@/components/hall-of-fame/modals/FiltersModal";
import HallOfFameDesktop from "@/components/hall-of-fame/desktop/HallOfFameDesktop";

export default function HallOfFame() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Hall of Fame");
  }, [setTitle]);

  return (
    <HallOfFameProvider>
      <div className="w-full lg:hidden">
        <HallOfFameMobile />
      </div>
      <div className="w-full hidden lg:flex flex-col-centered flex-1">
        <HallOfFameDesktop />
      </div>
      <FiltersModal />
    </HallOfFameProvider>
  );
}
