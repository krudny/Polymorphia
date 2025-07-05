"use client";
import "../../../styles/paginate.css";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import RankDesktop from "@/components/hall-of-fame/RankDesktop";
import "../../../styles/hall-of-fame.css";
import { HallOfFameProvider } from "@/components/providers/HallOfFameContext";
import RankMobile from "@/components/hall-of-fame/RankMobile";

export default function HallOfFame() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Hall of Fame");
  }, [setTitle]);

  return (
    <HallOfFameProvider>
      <div className="w-full lg:hidden">
          <RankMobile />
      </div>
      <div className="w-full hidden lg:block">
        <RankDesktop />
      </div>
    </HallOfFameProvider>
  );
}
