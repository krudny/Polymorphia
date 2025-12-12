"use client";

import useNavigationContext from "@/hooks/contexts/useNavigationContext";
import { RefObject, useLayoutEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDebouncedCallback } from "use-debounce";
import {
  getCardMetrics,
  getCardStepCount,
  NewCardMode,
  NewCardModes,
  NewCardProps,
} from "./NewCard";
import { PointsSummaryResponseDTO } from "@/interfaces/api/points-summary";
import NewXPCardGrid from "./NewXPCardGrid";
import { POINTS_SUMMARY_METRICS } from "./NewPointsSummary";

export interface GridParams {
  cols: number;
  rows: number;
  mode: NewCardMode;
  cardMaxWidth: number;
  isDesktop: boolean;
  isReady: boolean;
}

function areGridParamsEqual(prev: GridParams, next: GridParams): boolean {
  return (
    prev.cols === next.cols &&
    prev.rows === next.rows &&
    prev.mode === next.mode &&
    prev.isDesktop === next.isDesktop &&
    prev.isReady === next.isReady &&
    prev.cardMaxWidth === prev.cardMaxWidth
  );
}

function useXPCardGridParams(
  containerRef: RefObject<HTMLDivElement | null>,
  cardStepCount: number,
  usesPointsSummary: boolean
) {
  const { isSidebarLockedOpened, isSidebarExpanded } = useNavigationContext();
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const [gridParams, setGridParams] = useState<GridParams>({
    cols: 2,
    rows: 3,
    mode: NewCardModes.NORMAL,
    isDesktop: true,
    cardMaxWidth: 400,
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

    const rawWidth = containerRef.current.offsetWidth;
    const rawHeight = containerRef.current.offsetHeight;
    const width = rawWidth + sidebarCorrection;
    const height = rawHeight - paginationHeight;

    console.log("dimensions", rawWidth, rawHeight, width, height);

    const stats = Object.values(NewCardModes).map((cardMode) => {
      const cardMetrics = getCardMetrics({
        mode: cardMode,
        stepCount: cardStepCount,
      });
      const cardWidth = cardMetrics.minWidth;
      const cardHeight = cardMetrics.height;

      const pointsSummaryImpactsWidth = usesPointsSummary && isDesktop;

      const cardsWidth =
        width -
        (pointsSummaryImpactsWidth
          ? POINTS_SUMMARY_METRICS[cardMode].width + gap
          : 0);
      const cardsHeight = Math.min(
        height,
        POINTS_SUMMARY_METRICS[cardMode].maxHeight
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
        cardMaxWidth: cardMetrics.maxWidth,
      };
    });

    const bestLayout =
      stats.find((s) => s.rows >= 2 && s.cols >= 2) || stats[0];

    console.log("best", bestLayout);

    const nextParams: GridParams = {
      ...bestLayout,
      isDesktop,
      isReady: true,
    };

    setGridParams((prevParams) => {
      // Avoid re-renders (by using same reference) if evaluated params are the same
      if (areGridParamsEqual(prevParams, nextParams)) {
        return prevParams;
      }
      return nextParams;
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
  const cardStepCount = Math.max(
    ...cardConfigurations.map((cardConfig) => getCardStepCount(cardConfig))
  );

  const gridParams = useXPCardGridParams(ref, cardStepCount, usesPointsSummary);
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
