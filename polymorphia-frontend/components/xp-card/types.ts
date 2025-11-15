import { ReactNode, RefObject } from "react";
import { Sizes } from "@/interfaces/general";

export interface XPCardProps {
  title: string;
  subtitle?: string;
  details?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  image?: {
    url: string;
    alt: string;
  };
  onClick?: () => void;
}

export const XPCardColors = {
  GOLD: "gold",
  SILVER: "silver",
  BRONZE: "bronze",
  GREEN: "green",
  SKY: "sky",
  GRAY: "gray",
} as const;

export type XPCardColor = (typeof XPCardColors)[keyof typeof XPCardColors];

export const XPCardSizes = {
  ...Sizes,
  HOF_DESKTOP: "hofDesktop",
  PROJECT_GROUP: "projectGroup",
} as const;

export type XPCardSize = (typeof XPCardSizes)[keyof typeof XPCardSizes];

export type XPCardVariantProps = {
  size?: XPCardSize;
  color?: XPCardColor;
  forceWidth?: boolean;
  isLocked?: boolean;
};

export interface CardGridProps {
  containerRef: RefObject<HTMLDivElement | null>;
  cards: ReactNode[];
  maxColumns?: number;
  maxRows?: number;
}
