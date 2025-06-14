import { EventSection } from "../course/event-section/EventSectionInterfaces";

export interface EventSectionCardProps {
  title: string;
  subtitle?: string;
  xp?: string;
  image?: {
    url: string;
    alt: string;
  };
  onClick?: () => void;
}

export type EventSectionCardVariantProps = {
  size?: "xs" | "sm" | "md" | "lg" | "hofDesktop";
  color?: "gold" | "silver" | "bronze" | "green";
  forceWidth?: boolean;
  isSumVisible?: boolean;
};

export interface EventSectionCardGridProps {
  eventSection: EventSection;
  containerRef: React.RefObject<HTMLDivElement | null>;
}
