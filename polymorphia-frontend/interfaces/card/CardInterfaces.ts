export interface CardProps {
  id: number;
  title: string;
  subtitle?: string;
  xp?: string;
  onClick?: () => void;
}

export interface CardGridProps {
  cards: CardProps[];
}
