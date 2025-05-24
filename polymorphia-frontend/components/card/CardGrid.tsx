import { CardGridProps } from '@/interfaces/card/CardInterfaces';
import Card from './Card';
import '../../styles/card.css';
import { useScaleShow } from '@/animations/General';

export default function CardGrid({ cards }: CardGridProps) {
  const wrapperRef = useScaleShow();
  
  return (
    <div ref={wrapperRef} className="card-grid">
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}
