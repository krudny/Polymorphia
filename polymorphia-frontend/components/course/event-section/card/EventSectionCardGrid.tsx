import { EventSectionCardGridProps } from '@/interfaces/course/event-section/card/EventSectionCardInterfaces';
import EventSectionCard from './EventSectionCard';
import '../../../../styles/event-section-card.css';
import { useScaleShow } from '@/animations/General';

export default function EventSectionCardGrid({ cards }: EventSectionCardGridProps) {
  const wrapperRef = useScaleShow();
  
  return (
    <div ref={wrapperRef} className="event-section-card-grid">
      {cards.map((card) => (
        <EventSectionCard key={card.id} {...card} />
      ))}
    </div>
  );
}
