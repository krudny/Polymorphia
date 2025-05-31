export interface EventSectionCardProps {
  title: string;
  subtitle?: string;
  xp?: string;
  onClick?: () => void;
}

export type EventSectionCardVariantProps = {
  size?: "sm" | "md" | "lg";
  color?: "gold" | "silver" | "bronze" | "green";
};

export interface EventSectionCardGridProps {
  eventSectionId: number;
  eventSectionType: "coursework" | "tests" | "project";
  presentEventsModally: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  summaryRef: React.RefObject<HTMLDivElement | null>;
}
