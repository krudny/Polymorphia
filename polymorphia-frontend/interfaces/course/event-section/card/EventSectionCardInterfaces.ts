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
  cards: EventSectionCardProps[];
}
