import { CardGridProps } from '@/interfaces/card/CardInterfaces';
import Card from './Card';
import '../../styles/card.css';

export default function CardGrid({ cards }: CardGridProps) {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}
