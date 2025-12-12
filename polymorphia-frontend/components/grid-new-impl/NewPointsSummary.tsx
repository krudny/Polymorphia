import {
  PointsSummaryDetailsResponseDTO,
  PointsSummaryResponseDTO,
} from "@/interfaces/api/points-summary";
import { useState } from "react";
import { NewCardMode, NewCardModes } from "./NewCard";
import clsx from "clsx";
import ErrorComponent from "../error";

export interface NewPointsSummaryProps {
  pointsSummary?: PointsSummaryResponseDTO;
  mode: NewCardMode;
}

interface PointsSummaryMetrics {
  width: number;
  minHeight: number;
  maxHeight: number;
}

export const POINTS_SUMMARY_METRICS: Record<NewCardMode, PointsSummaryMetrics> =
  {
    [NewCardModes.NORMAL]: {
      width: 280,
      minHeight: 525,
      maxHeight: 720,
    },
    [NewCardModes.COMPACT]: {
      width: 240,
      minHeight: 425,
      maxHeight: 620,
    },
  };

interface GetPointsSummaryClassNameProps {
  mode: NewCardMode;
}

function getPointsSummaryClassName({ mode }: GetPointsSummaryClassNameProps) {
  return `w-[${POINTS_SUMMARY_METRICS[mode].width}px] max-h-[${POINTS_SUMMARY_METRICS[mode].maxHeight}px]`;
}

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
