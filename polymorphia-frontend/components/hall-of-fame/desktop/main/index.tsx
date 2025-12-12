import { useScaleShow } from "@/animations/ScaleShow";
import "./index.css";
import "@/components/hall-of-fame/index.css";
import HallOfFamePodium from "@/components/hall-of-fame/desktop/podium";
import HallOfFameList from "@/components/hall-of-fame/general/list";
import HallOfFamePagination from "@/components/hall-of-fame/general/pagination";
import HallOfFameTopBar from "@/components/hall-of-fame/general/top-bar";

export default function HallOfFameDesktop() {
  const wrapperRef = useScaleShow();

  return (
    <div ref={wrapperRef} className="hof-main-desktop">
      <div className="hof-main-desktop-wrapper">
        <div className="hof-main-desktop-podium-wrapper">
          <div className="hof-main-desktop-podium-text">
            <h2>Podium</h2>
          </div>
          <HallOfFamePodium />
        </div>
        <div className="hof-main-desktop-content-wrapper">
          <div className="hof-main-desktop-search-wrapper">
            <HallOfFameTopBar />
          </div>
          <HallOfFameList />
        </div>
      </div>
      <HallOfFamePagination />
    </div>
  );
}
