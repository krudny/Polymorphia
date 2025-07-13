import { EventSectionType } from "@/components/course/event-section/types";

export interface EventSectionCardProps {
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

export type EventSectionCardVariantProps = {
  size?: "xs" | "sm" | "md" | "lg" | "hofDesktop";
  color?: "gold" | "silver" | "bronze" | "green";
  forceWidth?: boolean;
};

export interface EventSectionCardGridProps {
  eventSectionId: number;
  eventSectionType: EventSectionType;
  containerRef: React.RefObject<HTMLDivElement | null>;
}
