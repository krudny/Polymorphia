export interface UserPointsProps {
  separators?: boolean;
  titleSize?: "xs" | "sm" | "md" | "lg" | "xl";
  xpSize?: "xs" | "sm" | "md" | "lg" | "xl";
  xpDetails: {
    [key: string]: number
  };
}