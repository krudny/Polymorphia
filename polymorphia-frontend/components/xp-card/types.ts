import {ReactNode, RefObject} from "react";

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

export type XPCardColors =
  | "gold"
  | "silver"
  | "bronze"
  | "green"
  | "sky"
  | "gray";

export type XPCardVariantProps = {
  size?: "xs" | "sm" | "md" | "lg" | "hofDesktop" | "projectGroup";
  color?: XPCardColors;
  forceWidth?: boolean;
  isLocked?: boolean;
};

export interface CardGridProps {
  containerRef: RefObject<HTMLDivElement | null>;
  cards: ReactNode[];
  maxColumns?: number;
  maxRows?: number;
}
