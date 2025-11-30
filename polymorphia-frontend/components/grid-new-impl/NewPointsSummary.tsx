import {
  PointsSummaryDetailsResponseDTO,
  PointsSummaryResponseDTO,
} from "@/interfaces/api/points-summary";
import { RefObject, useState } from "react";
import { NewCardMode } from "./NewCard";
import clsx from "clsx";
import ErrorComponent from "../error";

export interface NewPointsSummaryProps {
  pointsSummary?: PointsSummaryResponseDTO;
  mode: NewCardMode;
}

export const pointsSummarySizes = {
  NORMAL: {
    width: {
      value: 280,
      className: "w-[280px]",
    },
    height: {
      min: 525,
      max: 720,
      className: "max-h-[720px]",
    },
  },
  COMPACT: {
    height: {
      min: 425,
      max: 620,
      className: "max-h-[620px]",
    },
    width: {
      value: 240,
      className: "w-[240px]",
    },
  },
};

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
        "h-full flex flex-col justify-between shrink-0",
        pointsSummarySizes[mode].width.className,
        pointsSummarySizes[mode].height.className
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

export interface NewPointsSummaryElementProps {
  mode: NewCardMode;
  bonus: PointsSummaryDetailsResponseDTO;
  onClick?: () => void;
  horizontal?: boolean;
}

const pointsSummaryElementSizes = {
  NORMAL: {
    height: {
      value: 130,
      className: "h-[130px] max-h-[130px]",
    },
  },
  COMPACT: {
    height: {
      value: 105,
      className: "h-[105px] max-h-[105px]",
    },
  },
};

function NewPointsSummaryElement({
  bonus,
  mode,
}: NewPointsSummaryElementProps) {
  return (
    <div
      className={clsx(
        "flex-centered bg-purple-300 w-full h-full",
        pointsSummaryElementSizes[mode].height.className
      )}
    >
      {bonus.gainedXp} xp
    </div>
  );
}
