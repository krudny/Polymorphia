import { PointsSummaryProps } from "@/components/course/event-section/points-summary/types";
import { useState } from "react";
import "./index.css";
import BonusInfoModal from "@/components/course/event-section/points-summary/BonusInfoModal";
import PointsSummaryElement from "@/components/course/event-section/points-summary/PointsSummaryElement";
import { PointsSummaryDetailsResponseDTO } from "@/interfaces/api/course/points-summary";
import usePointsSummary from "@/hooks/course/usePointsSummary";
import ErrorComponent from "@/components/error";

export default function PointsSummary({
  pointsSummary,
  ref,
}: PointsSummaryProps) {
  const [currentBonusInfoModal, setCurrentBonusInfoModal] =
    useState<PointsSummaryDetailsResponseDTO | null>(null);

  if (!pointsSummary) {
    return (
      <ErrorComponent
        title="Brak danych"
        message="Nie znaleziono punktów podsumowania."
      />
    );
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
