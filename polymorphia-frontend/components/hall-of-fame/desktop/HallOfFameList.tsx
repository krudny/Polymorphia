import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";
import HallOfFameCardDesktop from "@/components/hall-of-fame/desktop/HallOfFameCardDesktop";
import Loading from "@/components/loading/Loading";
import { useScaleShow } from "@/animations/ScaleShow";

export default function HallOfFameList() {
  const { hallOfFame, isLoading, areFiltersReady } = useHallOfFameContext();
  const wrapperRef = useScaleShow(!isLoading);

  if (isLoading || !hallOfFame || !areFiltersReady) {
    return (
      <div className="hall-of-fame-loading-wrapper">
        <Loading />
      </div>
    );
  }

  return (
    <div className="hall-of-fame-desktop-rank-wrapper" ref={wrapperRef}>
      {
        hallOfFame.content.map((record: HallOfFameRecordDTO) => (
          <HallOfFameCardDesktop
            key={`rank-${record.userDetails.position}`}
            userDetails={record.userDetails}
            xpDetails={record.xpDetails}
          />
        ))
      }
    </div>
  );
}