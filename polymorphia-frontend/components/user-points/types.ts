export interface UserPointsProps {
  separators?: boolean;
  titleSize?: "xs" | "sm" | "md" | "lg" | "xl";
  xpSize?: "xs" | "sm" | "md" | "lg" | "xl";
  maxCols?: number;
  xpDetails: Record<string, string>;
}
