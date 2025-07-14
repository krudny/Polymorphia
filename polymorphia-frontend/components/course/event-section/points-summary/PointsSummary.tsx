import { PointsSummaryProps } from "@/components/course/event-section/points-summary/types";
import { Fragment, useState } from "react";
import { BonusInfo } from "@/components/course/event-section/types";
import "./index.css";
import { useQuery } from "@tanstack/react-query";
import { BetterEventSectionService } from "@/app/(logged-in)/course/[eventSectionType]/BetterEventSectionService";
import Loading from "@/components/loading/Loading";
import BonusInfoModal from "@/components/course/event-section/points-summary/BonusInfoModal";
import PointsSummaryElement from "@/components/course/event-section/points-summary/PointsSummaryElement";

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

  const flatBonus = {
    name: "Bonusy punktkowe",
    bonusXp: `${pointsSummary.flatBonus.xp.toFixed(1)} xp`,
    items: pointsSummary.flatBonus.items,
  };

  const percentageBonus = {
    name: "Bonusy procentowe",
    bonusXp: `${pointsSummary.percentageBonus.xp.toFixed(1)} xp`,
    items: pointsSummary.percentageBonus.items,
  };

  console.log(percentageBonus);

  return (
    <>
      <div ref={ref} className="points-summary">
        {pointsSummary && (
          <>
            <PointsSummaryElement
              bonus={{
                name: "Zdobyte xp",
                bonusXp: `${pointsSummary.gainedXp.toFixed(1)} xp`,
                items: [],
              }}
            />
            <PointsSummaryElement
              bonus={flatBonus}
              onClick={
                flatBonus.items.length > 0
                  ? () => setCurrentBonusInfoModal(flatBonus)
                  : undefined
              }
            />
            <PointsSummaryElement
              bonus={flatBonus}
              onClick={
                percentageBonus.items.length > 0
                  ? () => setCurrentBonusInfoModal(percentageBonus)
                  : undefined
              }
            />
            <div className="points-summary-divider" />
            <PointsSummaryElement
              bonus={{
                name: "Łącznie",
                bonusXp: `${pointsSummary.totalXp.toFixed(1)} xp`,
                items: [],
              }}
              horizontal={true}
            />
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
