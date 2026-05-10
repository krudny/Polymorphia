import useHallOfFameContext from "@/hooks/contexts/useHallOfFameContext";
import { HallOfFameRecordDTO } from "@/interfaces/api/hall-of-fame";
import HallOfFameCardDesktop from "@/components/hall-of-fame/desktop/card";
import Loading from "@/components/loading";
import { useScaleShow } from "@/animations/ScaleShow";
import { useMediaQuery } from "react-responsive";
import HallOfFameError from "@/components/hall-of-fame/general/error";
import { useLayoutEffect } from "react";
import HallOfFameCardMobile from "@/components/hall-of-fame/mobile/card";
import "./index.css";

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
    if (wrapperRef.current && !isLoading) {
      wrapperRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page, wrapperRef, isLoading, hallOfFame]);

  const setRecordRef =
    (position: number) =>
    (record: HTMLElement | null): void => {
      if (record) {
        recordRefs.current[position] = record;
      }
    };

  if (isLoading || !hallOfFame || isFiltersLoading || isFiltersError) {
    return (
      <div className="hof-loading-wrapper">
        <Loading />
      </div>
    );
  }

  const desktopComponent = (
    <div className="hof-list-desktop-rank-wrapper" ref={wrapperRef}>
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
    <div className="hof-list-mobile-rank-wrapper" ref={wrapperRef}>
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
