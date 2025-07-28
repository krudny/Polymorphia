import { ProgressBarProps } from "@/components/progressbar/types";

export function FillsCalc(
  minXP: number,
  maxXP: number,
  currentXP: number,
  segmentSizes: number[]
): number[] {
  const totalXP = maxXP - minXP;
  const currentRelativeXP = currentXP - minXP;
  const percentage = Math.min(
    Math.max(0, (currentRelativeXP / totalXP) * 100),
    100
  );

  const fills: number[] = [];
  let accStart = 0;
  for (const size of segmentSizes) {
    const start = accStart;
    const end = start + size;
    let fill;
    if (percentage >= end) fill = 100;
    else if (percentage <= start) fill = 0;
    else fill = ((percentage - start) / size) * 100;

    fills.push(Math.min(Math.max(0, fill), 100));
    accStart = end;
  }

  return fills;
}

export function SquareFillCalc(squareFill: number): string {
  const p = squareFill;
  let x1, y1, x2, y2, x3, y3, x4, y4, x5, y5;

  if (p <= 50) {
    x1 = 0;
    y1 = 100 - 2 * p;
    x2 = 0;
    y2 = 100;
    x3 = 2 * p;
    y3 = 100;

    return `polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%`;
  } else {
    x1 = 100;
    y1 = -2 * p + 200;
    x2 = 2 * p - 100;
    y2 = 0;
    x3 = 0;
    y3 = 0;
    x4 = 0;
    y4 = 100;
    x5 = 100;
    y5 = 100;

    return `polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%, ${x4}% ${y4}%, ${x5}% ${y5}%)`;
  }
}

function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

export function isProgressBarInputValid({
  minXP,
  currentXP,
  maxXP,
  numSquares,
  segmentSizes,
}: ProgressBarProps): boolean {
  const hasMinSquares = numSquares >= 2;
  const hasValidXPRange =
    minXP <= maxXP && currentXP >= minXP && currentXP <= maxXP;
  const hasValidSegments = segmentSizes.length >= numSquares * 2 - 1;
  const isSegmentSumCloseTo100 = Math.abs(sum(segmentSizes) - 100) < 0.5;

  return (
    hasMinSquares &&
    hasValidXPRange &&
    hasValidSegments &&
    isSegmentSumCloseTo100
  );
}
