import { useScaleShow } from "@/animations/General";
import RankPodium from "@/components/hall-of-fame/RankPodium";
import RankSearch from "@/components/hall-of-fame/RankSearch";
import RankSort from "@/components/hall-of-fame/RankSort";
import RankCardDesktop from "@/components/hall-of-fame/RankCardDesktop";
import Pagination from "@/components/general/Pagination";
import "../../styles/hall-of-fame.css";

export default function RankDesktop() {
  const wrapperRef = useScaleShow();

  return (
    <div ref={wrapperRef} className="hall-of-fame-desktop">
      <div className="hall-of-fame-desktop-wrapper">
        <div className="hall-of-fame-desktop-podium-wrapper">
          <div className="hall-of-fame-desktop-podium-text">
            <h2>Podium</h2>
          </div>
          <div className="hall-of-fame-desktop-podium">
            {([1, 2, 3] as const).map((position) => (
              <RankPodium key={position} position={position} />
            ))}
          </div>
        </div>
        <div className="hall-of-fame-desktop-content-wrapper">
          <div className="hall-of-fame-desktop-search-wrapper">
            <RankSearch />
            <RankSort />
          </div>
          <div className="hall-of-fame-desktop-rank-wrapper">
            {Array.from({ length: 10 - 4 + 1 }, (_, i) => (
              <RankCardDesktop key={i} position={i + 3} />
            ))}
          </div>
        </div>
      </div>
      <div className="hall-of-fame-pagination-wrapper justify-end">
        <Pagination
          totalPages={250 / 20}
          onPageChangeAction={() => {}}
          forcePage={0}
        />
      </div>
    </div>
  );
}
