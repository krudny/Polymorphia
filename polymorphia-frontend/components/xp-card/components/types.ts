import { XPCardColor } from "@/components/xp-card/types";

export interface XPCardPointsProps {
  points?: string;
  isSumLabelVisible?: boolean;
  isXPLabelVisible?: boolean;
  hasChest?: boolean;
  shouldGreyOutReward?: boolean;
  color?: XPCardColor;
}

export interface XPCardTextProps {
  topText: string;
  bottomText: string;
  color?: XPCardColor;
}

export interface XPCardProjectVariantProps {
  shortCode: string;
  color?: XPCardColor;
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
  color?: XPCardColor;
}
