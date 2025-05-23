export interface CardProps {
  title: string;
  subtitle?: string;
  xp?: string;
  link?: string;
}

export interface CardGridProps {
  cards: CardProps[];
}
