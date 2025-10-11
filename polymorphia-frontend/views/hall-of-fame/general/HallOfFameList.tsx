import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";
import HallOfFameCardDesktop from "@/views/hall-of-fame/desktop/HallOfFameCardDesktop";
import Loading from "@/components/loading";
import { useScaleShow } from "@/animations/ScaleShow";
import { useMediaQuery } from "react-responsive";
import HallOfFameError from "@/views/hall-of-fame/general/HallOfFameError";
import { useLayoutEffect } from "react";
import HallOfFameCardMobile from "@/views/hall-of-fame/mobile/HallOfFameCardMobile";

export default function HallOfFameList() {
  const {
    page,
    hallOfFame,
    isLoading,
    isFiltersLoading,
    isFiltersError,
    recordRefs,
  } = useHallOfFameContext();
  const wrapperRef = useScaleShow(!isLoading);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useLayoutEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  const setRecordRef =
    (position: number) =>
    (record: HTMLElement | null): void => {
      if (record) {
        recordRefs.current[position] = record;
      }
    };

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
        <HallOfFameError />
      ) : (
        hallOfFame.content.map((record: HallOfFameRecordDTO) => (
          <HallOfFameCardDesktop
            ref={setRecordRef(record.userDetails.position)}
            key={`rank-${record.userDetails.position}`}
            userDetails={record.userDetails}
            xpDetails={record.xpDetails}
          />
        ))
      )}
    </div>
  );

  const mobileComponent = (
    <div className="hall-of-fame-mobile-rank-wrapper" ref={wrapperRef}>
      {hallOfFame.content.length === 0 ? (
        <HallOfFameError />
      ) : (
        hallOfFame.content.map((record: HallOfFameRecordDTO) => (
          <HallOfFameCardMobile
            ref={setRecordRef(record.userDetails.position)}
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
