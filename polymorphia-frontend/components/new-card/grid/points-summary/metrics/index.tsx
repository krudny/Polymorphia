import { NewCardMode, NewCardModes } from "@/components/new-card/types";
import {
  GetPointsSummaryClassNameProps,
  PointsSummaryMetrics,
} from "@/components/new-card/grid/points-summary/metrics/types";

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

export function getPointsSummaryClassName({
  mode,
}: GetPointsSummaryClassNameProps) {
  return `w-[${POINTS_SUMMARY_METRICS[mode].width}px] max-h-[${POINTS_SUMMARY_METRICS[mode].maxHeight}px]`;
}
