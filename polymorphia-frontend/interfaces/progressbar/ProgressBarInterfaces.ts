type sizeVariants = "sm" | "md" | "lg";

export interface ProgressBarProps {
  minXP: number;
  currentXP: number;
  maxXP: number;
  numSquares: number;
  segmentSizes: number[];
  upperTextLabels?: string[];
  bottomTextLabels?: string[];
  labelsSize?: sizeVariants;
}

export interface ProgressBarLineProps {
  width: string;
  position: number;
  lineFill: number;
}

export interface ProgressBarRangeLabelsProps {
  minXP: number;
  currentXP: number;
  maxXP: number;
}

export interface ProgressBarTextLabelsProps {
  textLabels: string[];
  size?: sizeVariants;
}
