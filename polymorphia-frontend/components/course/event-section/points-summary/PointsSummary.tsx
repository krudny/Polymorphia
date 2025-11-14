import { PointsSummaryProps } from "@/components/course/event-section/points-summary/types";
import { useState } from "react";
import "./index.css";
import BonusInfoModal from "@/components/course/event-section/points-summary/BonusInfoModal";
import PointsSummaryElement from "@/components/course/event-section/points-summary/PointsSummaryElement";
import { PointsSummaryDetailsResponseDTO } from "@/interfaces/api/course/points-summary";

export default function PointsSummary({
  pointsSummary,
  ref,
}: PointsSummaryProps) {
  const [currentBonusInfoModal, setCurrentBonusInfoModal] =
    useState<PointsSummaryDetailsResponseDTO | null>(null);

  if (!pointsSummary) {
    return <div>No points summary</div>;
  }

  return (
    <>
      <div ref={ref} className="points-summary">
        {pointsSummary && (
          <>
            <PointsSummaryElement bonus={pointsSummary.gained} />
            <PointsSummaryElement
              bonus={pointsSummary.flatBonus}
              onClick={
                pointsSummary.flatBonus.assignedItems?.length
                  ? () => setCurrentBonusInfoModal(pointsSummary.flatBonus)
                  : undefined
              }
            />
            <PointsSummaryElement
              bonus={pointsSummary.percentageBonus}
              onClick={
                pointsSummary.percentageBonus.assignedItems?.length
                  ? () =>
                      setCurrentBonusInfoModal(pointsSummary.percentageBonus)
                  : undefined
              }
            />
            <div className="points-summary-divider" />
            <PointsSummaryElement
              bonus={pointsSummary.total}
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
