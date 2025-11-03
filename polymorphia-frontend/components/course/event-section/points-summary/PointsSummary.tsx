import { PointsSummaryProps } from "@/components/course/event-section/points-summary/types";
import { useState } from "react";
import "./index.css";
import Loading from "@/components/loading";
import BonusInfoModal from "@/components/course/event-section/points-summary/BonusInfoModal";
import PointsSummaryElement from "@/components/course/event-section/points-summary/PointsSummaryElement";
import { PointsSummaryDetailsResponseDTO } from "@/interfaces/api/course/points-summary";
import usePointsSummary from "@/hooks/course/usePointsSummary";
import ErrorState from "@/components/error-state";

export default function PointsSummary({ ref }: PointsSummaryProps) {
  const { data: pointsSummary, isLoading, isError } = usePointsSummary();
  const [currentBonusInfoModal, setCurrentBonusInfoModal] =
    useState<PointsSummaryDetailsResponseDTO | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorState message="Nie udało się załadować podsumowania punktów." />
    );
  }

  if (!pointsSummary) {
    return (
      <ErrorState
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
