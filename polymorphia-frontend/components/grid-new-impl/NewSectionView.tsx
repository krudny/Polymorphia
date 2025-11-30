"use client";

import useNavigationContext from "@/hooks/contexts/useNavigationContext";
import { RefObject, useLayoutEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDebouncedCallback } from "use-debounce";
import {
  NewCardMode,
  NewCardModes,
  NewCardProps,
  newCardSizes,
} from "./NewCard";
import { pointsSummarySizes } from "./NewPointsSummary";
import { PointsSummaryResponseDTO } from "@/interfaces/api/points-summary";
import NewXPCardGrid from "./NewXPCardGrid";

export interface GridParams {
  cols: number;
  rows: number;
  mode: NewCardMode;
  cardWidth: {
    min: number;
    max: number;
  };
  isDesktop: boolean;
  isReady: boolean;
}

function useXPCardGridParams(
  containerRef: RefObject<HTMLDivElement | null>,
  cardAccessoriesNumber: 0 | 1 | 2,
  usesPointsSummary: boolean
) {
  const { isSidebarLockedOpened, isSidebarExpanded } = useNavigationContext();
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const [gridParams, setGridParams] = useState<GridParams>({
    cols: 2,
    rows: 3,
    mode: NewCardModes.NORMAL,
    isDesktop: true,
    cardWidth: {
      min: 0,
      max: 400,
    },
    isReady: false,
  });

  const sidebarCorrection =
    isDesktop && !isSidebarLockedOpened && isSidebarExpanded ? 288 - 96 : 0;
  const paginationHeight = 48;
  const gap = 20;

  const calculate = useDebouncedCallback(() => {
    if (!containerRef.current) {
      return;
    }

    // const { width: rawWidth, height: rawHeight } =
    //   containerRef.current.getBoundingClientRect();
    const rawWidth = containerRef.current.offsetWidth;
    const rawHeight = containerRef.current.offsetHeight;
    const width = rawWidth - sidebarCorrection;
    const height = rawHeight - paginationHeight;

    console.log("dimensions", rawWidth, rawHeight, width, height);

    const stats = Object.values(NewCardModes).map((cardMode) => {
      const cardWidth = newCardSizes[cardMode].width[cardAccessoriesNumber].min;
      const cardHeight = newCardSizes[cardMode].height.value;

      const pointsSummaryImpactsWidth = usesPointsSummary && isDesktop;

      const cardsWidth =
        width -
        (pointsSummaryImpactsWidth
          ? pointsSummarySizes[cardMode].width.value + gap
          : 0);
      const cardsHeight = Math.min(
        height,
        pointsSummarySizes[cardMode].height.max
      );

      const rows = isDesktop
        ? Math.max(Math.floor((cardsHeight + gap) / (cardHeight + gap)), 1)
        : 5;
      const cols = Math.max(
        Math.floor((cardsWidth + gap) / (cardWidth + gap)),
        1
      );

      console.log(
        "statsCalc",
        cardMode,
        cardWidth,
        cardHeight,
        pointsSummaryImpactsWidth,
        cardsWidth,
        cardsHeight,
        rows,
        cols
      );

      return {
        mode: cardMode,
        rows: rows,
        cols: cols,
        cardWidth: newCardSizes[cardMode].width[cardAccessoriesNumber],
      };
    });

    const bestLayout =
      stats.find((s) => s.rows >= 2 && s.cols >= 2) || stats[0];

    console.log("best", bestLayout);

    setGridParams({
      ...bestLayout,
      isDesktop,
      isReady: true,
    });
  }, 100);

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      calculate();
    });

    resizeObserver.observe(element);

    // Initial calc
    calculate();

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, calculate]);

  return gridParams;
}

interface NewSectionViewProps {
  ref: RefObject<HTMLDivElement | null>;
  cardConfigurations: Omit<NewCardProps, "mode">[];
  usesPointsSummary: boolean;
  pointsSummaryConfiguration?: PointsSummaryResponseDTO;
}

export default function NewSectionView({
  cardConfigurations,
  usesPointsSummary,
  pointsSummaryConfiguration,
  ref,
}: NewSectionViewProps) {
  const cardAccessoriesNumber = Math.max(
    ...cardConfigurations.map((cardConfig) =>
      Math.min(
        (cardConfig.leftComponent !== undefined ? 1 : 0) +
          (cardConfig.rightComponent !== undefined ? 1 : 0) +
          (cardConfig.wide !== undefined ? 1 : 0),
        2
      )
    )
  ) as 0 | 1 | 2;
  const gridParams = useXPCardGridParams(
    ref,
    cardAccessoriesNumber,
    usesPointsSummary
  );
  return (
    <div className="w-full p-3 flex flex-col flex-1 mx-auto overflow-y-scroll custom-scrollbar lg:h-full lg:justify-center lg:overflow-hidden 3xl:extra-large-center bg-blue-500">
      <div
        ref={ref}
        className="bg-blue-400 lg:flex lg:flex-1 lg:items-center lg:justify-center lg:min-h-0 lg:h-full w-full"
      >
        <NewXPCardGrid
          gridParams={gridParams}
          cardConfigurations={cardConfigurations}
          usesPointsSummary={usesPointsSummary}
          pointsSummaryConfiguration={pointsSummaryConfiguration}
        />
      </div>
    </div>
  );
}
