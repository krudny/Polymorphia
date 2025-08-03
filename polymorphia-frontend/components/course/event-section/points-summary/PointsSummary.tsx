import {
  PointsSummaryBonus,
  PointsSummaryProps,
} from "@/components/course/event-section/points-summary/types";
import { useState } from "react";
import "./index.css";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import Loading from "@/components/loading/Loading";
import BonusInfoModal from "@/components/course/event-section/points-summary/BonusInfoModal";
import PointsSummaryElement from "@/components/course/event-section/points-summary/PointsSummaryElement";

export default function PointsSummary({
  eventSectionId,
  ref,
}: PointsSummaryProps) {
  const [currentBonusInfoModal, setCurrentBonusInfoModal] =
    useState<PointsSummaryBonus | null>(null);

  const {
    data: pointsSummary,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pointsSummary", eventSectionId],
    queryFn: () => EventSectionService.getPointsSummary(eventSectionId),
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

  const gainedXpElement: PointsSummaryBonus = {
    title: "Zdobyte xp",
    data: {
      xp: pointsSummary.gainedXp,
      assignedItems: [],
    },
  };

  const flatBonusElement: PointsSummaryBonus = {
    title: "Bonusy punktowe",
    data: pointsSummary.flatBonus,
  };

  const percentageBonusElement: PointsSummaryBonus = {
    title: "Bonusy procentowe",
    data: pointsSummary.percentageBonus,
  };

  const totalXpElement: PointsSummaryBonus = {
    title: "Łącznie",
    data: {
      xp: pointsSummary.totalXp,
      assignedItems: [],
    },
  };

  return (
    <>
      <div ref={ref} className="points-summary">
        {pointsSummary && (
          <>
            <PointsSummaryElement bonus={gainedXpElement} />
            <PointsSummaryElement
              bonus={flatBonusElement}
              onClick={
                pointsSummary.flatBonus.assignedItems.length > 0
                  ? () => setCurrentBonusInfoModal(flatBonusElement)
                  : undefined
              }
            />
            <PointsSummaryElement
              bonus={percentageBonusElement}
              onClick={
                pointsSummary.percentageBonus.assignedItems.length > 0
                  ? () => setCurrentBonusInfoModal(percentageBonusElement)
                  : undefined
              }
            />
            <div className="points-summary-divider" />
            <PointsSummaryElement bonus={totalXpElement} horizontal={true} />
          </>
        )}
      </div>
      <BonusInfoModal
        bonusInfo={currentBonusInfoModal}
        onClosed={() => setCurrentBonusInfoModal(null)}
      />
    </>
  );
}
