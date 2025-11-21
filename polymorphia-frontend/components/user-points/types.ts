import { Size } from "@/interfaces/general";

export interface UserPointsProps {
  separators?: boolean;
  titleSize?: Size;
  xpSize?: Size;
  maxCols?: number;
  xpDetails: Record<string, string>;
}
