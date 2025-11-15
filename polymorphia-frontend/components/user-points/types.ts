import { XPCardSize } from "@/components/xp-card/types";
import { Size } from "@/interfaces/general";

export interface UserPointsProps {
  separators?: boolean;
  titleSize?: Size;
  xpSize?: XPCardSize;
  maxCols?: number;
  xpDetails: Record<string, string>;
}
