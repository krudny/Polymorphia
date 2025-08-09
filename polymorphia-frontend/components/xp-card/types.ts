import { EventSectionType } from "@/components/course/event-section/types";
import { ReactNode, RefObject } from "react";
import { BaseGradableEventResponseDTO } from "@/app/(logged-in)/course/EventSectionService";

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

export interface XPCardGridProps<T extends BaseGradableEventResponseDTO> {
  containerRef: RefObject<HTMLDivElement | null>;
  gradableEvents: T[];
  renderCard: (event: T, mobile: boolean) => ReactNode;
}

export interface CardGridProps {
  eventSectionId: number;
  eventSectionType: EventSectionType;
  containerRef: RefObject<HTMLDivElement | null>;
}
