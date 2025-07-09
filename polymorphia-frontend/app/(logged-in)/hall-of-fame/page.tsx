"use client";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import HallOfFameDesktop from "@/components/hall-of-fame/desktop/HallOfFameDesktop";
import { HallOfFameProvider } from "@/components/providers/hall-of-fame/HallOfFameContext";
import HallOfFameMobile from "@/components/hall-of-fame/mobile/HallOfFameMobile";
import FiltersModal from "@/components/hall-of-fame/modals/FiltersModal";

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
      <div className="w-full hidden lg:flex flex-col flex-1">
        <HallOfFameDesktop />
      </div>
      <FiltersModal />
    </HallOfFameProvider>
  );
}
