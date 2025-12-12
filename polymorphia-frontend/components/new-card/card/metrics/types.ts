import { NewCardMode } from "@/components/new-card/types";

export interface BaseCardMetrics {
  height: number;
  baseMinWidth: number;
  baseMaxWidth: number;
  widthStep: number;
  textClassName: string;
}

export interface EvaluatedCardMetrics {
  height: number;
  minWidth: number;
  maxWidth: number;
  textClassName: string;
}

export interface GetCardMetricsProps {
  mode: NewCardMode;
  stepCount: number;
}

export interface GetCardClassNameProps {
  cardMetrics: EvaluatedCardMetrics;
}
