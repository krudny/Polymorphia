"use client";
import "../../../styles/paginate.css";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import RankDesktop from "@/components/hall-of-fame/RankDesktop";
import RankMobile from "@/components/hall-of-fame/RankMobile";

export default function HallOfFame() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Hall of Fame");
  }, [setTitle]);

  return (
    <>
      <div className="lg:hidden w-full">
        <RankMobile />
      </div>
      <div className="w-full hidden lg:block">
        <RankDesktop />
      </div>
    </>
  );
}
