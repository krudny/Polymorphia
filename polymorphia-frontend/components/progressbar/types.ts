import { ReactNode } from "react";

type sizeVariants = "xs" | "sm" | "md" | "lg";

export interface ProgressBarProps {
  minXP: number;
  currentXP: number;
  maxXP: number;
  numSquares: number;
  segmentSizes: number[];
  upperElement?: ReactNode;
  lowerElement?: ReactNode;
  isHorizontal?: boolean;
}

export interface ProgressBarLineProps {
  size: string;
  position: number;
  lineFill: number;
  isHorizontal?: boolean;
}

export interface ProgressBarRangeLabelsProps {
  minXP: number;
  currentXP?: number;
  maxXP: number;
  isHorizontal?: boolean;
}

export interface ProgressBarTextLabelsProps {
  textLabels: string[];
  size?: sizeVariants;
  isHorizontal?: boolean;
  className?: string;
}

export interface ProgressBarElementProps {
  elements: ReactNode[];
  isUpper: boolean;
  isHorizontal: boolean;
  alternate: boolean;
}

export interface ProgressBarSquareProps {
  squareFill: number;
  position: number;
  isHorizontal: boolean;
}
