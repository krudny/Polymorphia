import useNavigationContext from "@/hooks/contexts/useNavigationContext";
import { RefObject, useLayoutEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { GridParams } from "@/hooks/new-card/useNewCardGridParams/types";
import { NewCardModes } from "@/components/new-card/types";
import { useDebouncedCallback } from "use-debounce";
import { getCardMetrics } from "@/components/new-card/card/metrics";
import { POINTS_SUMMARY_METRICS } from "@/components/new-card/grid/points-summary/metrics";
import { areGridParamsEqual } from "@/hooks/new-card/useNewCardGridParams/utils/are-grid-params-equal";

export default function useNewCardGridParams(
  containerRef: RefObject<HTMLDivElement | null>,
  cardStepCount: number,
  usesPointsSummary: boolean
): GridParams {
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
  const cardsHorizontalPadding = 12;

  const calculate = useDebouncedCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const rawWidth = containerRef.current.offsetWidth;
    const rawHeight = containerRef.current.offsetHeight;
    const width = rawWidth + sidebarCorrection - 2 * cardsHorizontalPadding;
    const height = rawHeight - paginationHeight - gap;

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

      return {
        mode: cardMode,
        rows: rows,
        cols: cols,
        cardMaxWidth: cardMetrics.maxWidth,
      };
    });

    const bestLayout =
      stats.find((s) => s.rows >= 2 && s.cols >= 2) || stats[0];

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
