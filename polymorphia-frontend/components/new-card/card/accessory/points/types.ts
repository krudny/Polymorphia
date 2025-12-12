import { XPCardColor } from "@/components/xp-card/types";

export interface NewCardPointsAccessoryProps {
  points?: string;
  isSumLabelVisible?: boolean;
  isXPLabelVisible?: boolean;
  hasChest?: boolean;
  shouldGrayOutReward?: boolean;
  backgroundColor: XPCardColor;
}
