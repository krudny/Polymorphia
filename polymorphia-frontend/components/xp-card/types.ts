import { EventType } from "@/interfaces/api/course";
import { ReactNode, RefObject } from "react";

export interface XPCardProps {
  title: string;
  subtitle?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  image?: {
    url: string;
    alt: string;
  };
  onClick?: () => void;
}

export type XPCardVariantProps = {
  size?: "xs" | "sm" | "md" | "lg" | "hofDesktop" | "projectGroup";
  color?: "gold" | "silver" | "bronze" | "green" | "sky";
  forceWidth?: boolean;
  isLocked?: boolean;
};

export interface XPCardGridProps {
  containerRef: RefObject<HTMLDivElement | null>;
  cards: ReactNode[];
  maxColumns?: number;
}

export interface CardGridProps {
  eventSectionId: number;
  eventType: EventType;
}
