import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";
import HallOfFameCardDesktop from "@/views/hall-of-fame/desktop/HallOfFameCardDesktop";
import Loading from "@/components/loading";
import { useScaleShow } from "@/animations/ScaleShow";
import { useMediaQuery } from "react-responsive";
import RankCardMobile from "@/views/hall-of-fame/mobile/HallOfFameCardMobile";

export default function HallOfFameList() {
  const { hallOfFame, isLoading, isFiltersLoading, isFiltersError } =
    useHallOfFameContext();
  const wrapperRef = useScaleShow(!isLoading);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  if (isLoading || !hallOfFame || isFiltersLoading || isFiltersError) {
    return (
      <div className="hall-of-fame-loading-wrapper">
        <Loading />
      </div>
    );
  }

  const desktopComponent = (
    <div className="hall-of-fame-desktop-rank-wrapper" ref={wrapperRef}>
      {hallOfFame.content.length === 0 ? (
        <div className="hall-of-fame-no-data-wrapper">
          <h1>Nie znaleziono danych</h1>
        </div>
      ) : (
        hallOfFame.content.map((record: HallOfFameRecordDTO) => (
          <HallOfFameCardDesktop
            key={`rank-${record.userDetails.position}`}
            userDetails={record.userDetails}
            xpDetails={record.xpDetails}
          />
        ))
      )}
    </div>
  );

  const mobileComponent = (
    <div className="hall-of-fame-mobile-rank-wrapper">
      {hallOfFame.content.length === 0 ? (
        <div className="hall-of-fame-no-data-wrapper">
          <h1>Nie znaleziono danych</h1>
        </div>
      ) : (
        hallOfFame.content.map((record: HallOfFameRecordDTO) => (
          <RankCardMobile
            key={`rank-${record.userDetails.position}`}
            userDetails={record.userDetails}
            xpDetails={record.xpDetails}
          />
        ))
      )}
    </div>
  );

  return <>{isDesktop ? desktopComponent : mobileComponent}</>;
}
