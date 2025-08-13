import { EventSectionType } from "@/components/course/event-section/types";
import { ReactNode, RefObject } from "react";

export interface XPCardProps {
  title: string;
  subtitle?: string;
  component?: ReactNode;
  image?: {
    url: string;
    alt: string;
  };
  onClick?: () => void;
}

export type XPCardVariantProps = {
  size?: "xs" | "sm" | "md" | "lg" | "hofDesktop" | "projectGroup";
  color?: "gold" | "silver" | "bronze" | "green";
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
  eventSectionType: EventSectionType;
  containerRef: RefObject<HTMLDivElement | null>;
}
