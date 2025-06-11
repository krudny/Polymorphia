"use client";
import "../../../styles/paginate.css";
import { useTitle } from "@/components/navigation/TitleContext";
import { useEffect } from "react";
import RankDesktop from "@/components/hall-of-fame/RankDesktop";
import RankMobile from "@/components/hall-of-fame/RankMobile";
import "../../../styles/hall-of-fame.css"

export default function HallOfFame() {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Hall of Fame");
  }, [setTitle]);

  return (
    <>
      <div className="w-full lg:hidden">
        <RankMobile />
      </div>
      <div className="w-full hidden lg:block">
        <RankDesktop />
      </div>
    </>
  );
}
