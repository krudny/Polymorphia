import { NewCardMode } from "@/components/new-card/types";
import { XPCardColor } from "@/components/xp-card/types";
import { ReactNode } from "react";

export interface NewCardProps {
  mode: NewCardMode;
  title: string;
  subtitle?: string;
  leftComponent?: (mode: NewCardMode, color: XPCardColor) => ReactNode;
  rightComponent?: (mode: NewCardMode, color: XPCardColor) => ReactNode;
  onClick?: () => void;
  color: XPCardColor;
  sizeBonus?: number;
  isLocked?: boolean;
}
