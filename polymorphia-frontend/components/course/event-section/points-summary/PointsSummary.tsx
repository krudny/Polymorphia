import { PointsSummaryProps } from "@/components/course/event-section/points-summary/types";
import { Fragment, useState } from "react";
import { BonusInfo } from "@/components/course/event-section/types";
import "./index.css";
import { useQuery } from "@tanstack/react-query";
import { BetterEventSectionService } from "@/app/(logged-in)/course/[eventSectionType]/BetterEventSectionService";
import Loading from "@/components/loading/Loading";

export default function PointsSummary({
  eventSectionId,
  ref,
}: PointsSummaryProps) {
  const [currentBonusInfoModal, setCurrentBonusInfoModal] =
    useState<BonusInfo | null>(null);

  const {
    data: pointsSummary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pointsSummary", eventSectionId],
    queryFn: () => BetterEventSectionService.getPointsSummary(eventSectionId),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading points summary {error.message}</div>;
  }

  if (!pointsSummary) {
    return <div>No points summary</div>;
  }

  return (
    <>
      {/*<div ref={ref} className="points-summary">*/}
      {/*  {pointsSummary.map((element, index) => (*/}
      {/*    <Fragment key={element.bonus.name}>*/}
      {/*      <PointsSummaryElement*/}
      {/*        {...element}*/}
      {/*        horizontal={index === elements.length - 1}*/}
      {/*        onClick={*/}
      {/*          element.bonus.items.length > 0*/}
      {/*            ? () => {*/}
      {/*                setCurrentBonusInfoModal(element.bonus);*/}
      {/*              }*/}
      {/*            : undefined*/}
      {/*        }*/}
      {/*      />*/}
      {/*      {index === elements.length - 2 && (*/}
      {/*        <div className="points-summary-divider" />*/}
      {/*      )}*/}
      {/*    </Fragment>*/}
      {/*  ))}*/}
      {/*</div>*/}
      {/*<BonusInfoModal*/}
      {/*  bonusInfo={currentBonusInfoModal}*/}
      {/*  onClosed={() => setCurrentBonusInfoModal(null)}*/}
      {/*/>*/}
    </>
  );
}
