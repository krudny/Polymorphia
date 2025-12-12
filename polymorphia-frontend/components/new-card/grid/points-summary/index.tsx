import { PointsSummaryDetailsResponseDTO } from "@/interfaces/api/points-summary";
import { useState } from "react";
import clsx from "clsx";
import { NewPointsSummaryProps } from "@/components/new-card/grid/points-summary/types";
import { getPointsSummaryClassName } from "@/components/new-card/grid/points-summary/metrics";
import ErrorComponent from "@/components/error";
import NewPointsSummaryElement from "@/components/new-card/grid/points-summary/element";

export default function NewPointsSummary({
  mode,
  pointsSummary,
}: NewPointsSummaryProps) {
  const [currentBonusInfoModal, setCurrentBonusInfoModal] =
    useState<PointsSummaryDetailsResponseDTO | null>(null);

  const divider = (
    <div className="border-t-2 border-primary-dark dark:border-secondary-light w-full" />
  );
  const invisibleDivider = (
    <div className="border-t-2 border-primary-dark dark:border-secondary-light w-full opacity-0" />
  );

  // todo: handle undef

  return (
    <div
      className={clsx(
        "h-full flex flex-col justify-between",
        getPointsSummaryClassName({ mode })
      )}
    >
      {pointsSummary !== undefined ? (
        <>
          <NewPointsSummaryElement mode={mode} bonus={pointsSummary.gained} />
          {invisibleDivider}
          <NewPointsSummaryElement
            mode={mode}
            bonus={pointsSummary.flatBonus}
          />
          {invisibleDivider}
          <NewPointsSummaryElement
            mode={mode}
            bonus={pointsSummary.percentageBonus}
          />
          {divider}
          <NewPointsSummaryElement mode={mode} bonus={pointsSummary.total} />
        </>
      ) : (
        <ErrorComponent
          title="Brak danych"
          message="Nie znaleziono punktów podsumowania."
        />
      )}
    </div>
  );
}
