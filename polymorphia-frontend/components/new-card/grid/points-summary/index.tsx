import { PointsSummaryDetailsResponseDTO } from "@/interfaces/api/points-summary";
import { useState } from "react";
import clsx from "clsx";
import { NewPointsSummaryProps } from "@/components/new-card/grid/points-summary/types";
import { getPointsSummaryStyles } from "@/components/new-card/grid/points-summary/metrics";
import ErrorComponent from "@/components/error";
import NewPointsSummaryElement from "@/components/new-card/grid/points-summary/element";
import { NewCardModes } from "../../types";

export default function NewPointsSummary({
  mode,
  pointsSummary,
  isDesktop,
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

  const effectiveMode = isDesktop ? mode : NewCardModes.NORMAL;

  return (
    <div
      className={clsx("h-full flex flex-col justify-between")}
      style={getPointsSummaryStyles({
        mode: effectiveMode,
      })}
    >
      {pointsSummary !== undefined ? (
        <>
          <NewPointsSummaryElement
            mode={effectiveMode}
            isDesktop={isDesktop}
            bonus={pointsSummary.gained}
          />
          {invisibleDivider}
          <NewPointsSummaryElement
            mode={effectiveMode}
            isDesktop={isDesktop}
            bonus={pointsSummary.flatBonus}
          />
          {invisibleDivider}
          <NewPointsSummaryElement
            mode={effectiveMode}
            isDesktop={isDesktop}
            bonus={pointsSummary.percentageBonus}
            onClick={() => {}}
          />
          {divider}
          <NewPointsSummaryElement
            mode={effectiveMode}
            isDesktop={isDesktop}
            bonus={pointsSummary.total}
            inline={true}
          />
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
