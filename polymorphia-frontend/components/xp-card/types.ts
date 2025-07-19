import { EventSectionType } from "@/components/course/event-section/types";
import { RefObject } from "react";

export interface XPCardProps {
  title: string;
  subtitle?: string;
  xp?: string;
  image?: {
    url: string;
    alt: string;
  };
  onClick?: () => void;
  isSumLabelVisible?: boolean;
}

export type XPCardVariantProps = {
  size?: "xs" | "sm" | "md" | "lg" | "hofDesktop";
  color?: "gold" | "silver" | "bronze" | "green";
  forceWidth?: boolean;
};

export interface XPCardGridProps {
  eventSectionId: number;
  eventSectionType: EventSectionType;
  containerRef: RefObject<HTMLDivElement | null>;
}
