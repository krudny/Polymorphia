import { useScaleShow } from "@/animations/ScaleShow";
import "./index.css";
import "../general/index.css";
import HallOfFamePodium from "@/views/hall-of-fame/desktop/HallOfFamePodium";
import HallOfFameList from "@/views/hall-of-fame/general/HallOfFameList";
import HallOfFamePagination from "@/views/hall-of-fame/general/HallOfFamePagination";
import HallOfFameTopBar from "@/views/hall-of-fame/general/HallOfFameTopBar";

export default function HallOfFameDesktop() {
  const wrapperRef = useScaleShow();

  return (
    <div ref={wrapperRef} className="hall-of-fame-desktop">
      <div className="hall-of-fame-desktop-wrapper">
        <div className="hall-of-fame-desktop-podium-wrapper">
          <div className="hall-of-fame-desktop-podium-text">
            <h2>Podium</h2>
          </div>
          <HallOfFamePodium />
        </div>
        <div className="hall-of-fame-desktop-content-wrapper">
          <div className="hall-of-fame-desktop-search-wrapper">
            <HallOfFameTopBar />
          </div>
          <HallOfFameList />
        </div>
      </div>
      <HallOfFamePagination />
    </div>
  );
}
