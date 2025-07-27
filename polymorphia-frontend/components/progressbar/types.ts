import { ReactNode } from "react";

type sizeVariants = "sm" | "md" | "lg";

export interface ProgressBarProps {
  minXP: number;
  currentXP: number;
  maxXP: number;
  numSquares: number;
  segmentSizes: number[];
  upperTextLabels?: string[];
  elements?: ReactNode[];
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
  isHorizontal: boolean;
}

export interface ProgressBarTextLabelsProps {
  textLabels: string[];
  size?: sizeVariants;
  isHorizontal: boolean;
}

export interface ProgressBarElementsProps {
  elements: ReactNode[];
  size?: sizeVariants;
  isHorizontal: boolean;
  isUpper: boolean;
}

export interface ProgressBarSquareProps {
  squareFill: number;
  position: number;
  isHorizontal: boolean;
}
