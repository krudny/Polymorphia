import { NewCardMode, NewCardModes } from "@/components/new-card/types";
import {
  GetPointsSummaryElementClassNameProps,
  PointsSummaryElementMetrics,
} from "@/components/new-card/grid/points-summary/element/metrics/types";

export const POINTS_SUMMARY_ELEMENT_METRICS: Record<
  NewCardMode,
  PointsSummaryElementMetrics
> = {
  [NewCardModes.NORMAL]: {
    height: 130,
  },
  [NewCardModes.COMPACT]: {
    height: 105,
  },
};

export function getPointsSummaryElementClassName({
  mode,
}: GetPointsSummaryElementClassNameProps) {
  return `h-[${POINTS_SUMMARY_ELEMENT_METRICS[mode].height}px] max-h-[${POINTS_SUMMARY_ELEMENT_METRICS[mode].height}px]`;
}
