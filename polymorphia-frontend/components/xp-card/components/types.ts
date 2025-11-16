import { XPCardColors } from "@/components/xp-card/types";

export interface XPCardPointsProps {
  points: string | undefined;
  isSumLabelVisible?: boolean;
  isXPLabelVisible?: boolean;
  hasChest?: boolean;
  shouldGreyOutReward?: boolean;
  color?: XPCardColors;
}

export interface XPCardTextProps {
  topText: string;
  bottomText: string;
  color?: XPCardColors;
}

export interface XPCardProjectVariantProps {
  shortCode: string;
  color?: XPCardColors;
}

export interface XPCardImageProps {
  imageUrl: string;
  alt: string;
}

export interface XPCardImageWithLockProps extends XPCardImageProps {
  isLocked: boolean;
}

export interface XPCardAssignProps {
  currentAssigned: number;
  maxAssigned: number;
  increment: () => void;
  decrement: () => void;
  color?: XPCardColors;
}
