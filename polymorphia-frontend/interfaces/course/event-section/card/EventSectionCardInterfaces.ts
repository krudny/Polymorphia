export interface EventSectionCardProps {
  id: number;
  title: string;
  subtitle?: string;
  xp?: string;
  onClick?: () => void;
}

export interface EventSectionCardGridProps {
  cards: EventSectionCardProps[];
}
