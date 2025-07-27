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
  isHorizontal?: boolean;
}

export interface ProgressBarLineProps {
  size: string;
  position: number;
  lineFill: number;
  isHorizontal: boolean;
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

export interface ProgressBarSquareProps {
  squareFill: number;
  position: number;
}
