import { EventType } from "@/interfaces/api/course";
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
  size?: "xs" | "sm" | "md" | "lg" | "hofDesktop";
  color?: "gold" | "silver" | "bronze" | "green";
  forceWidth?: boolean;
  isLocked?: boolean;
};

export interface XPCardGridProps {
  eventSectionId: number;
  eventSectionType: EventType;
  containerRef: RefObject<HTMLDivElement | null>;
}
