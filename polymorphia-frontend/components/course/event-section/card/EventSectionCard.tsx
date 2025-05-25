import { EventSectionCardProps } from '@/interfaces/course/event-section/card/EventSectionCardInterfaces';
import '../../../../styles/event-section-card.css';
import clsx from 'clsx';

export default function EventSectionCard({ title, subtitle, xp, onClick }: EventSectionCardProps) {
  return (
    <div
      className={clsx(
        'event-section-card',
        onClick && 'cursor-pointer',
        onClick && 'event-section-card-hover'
      )}
      onClick={onClick}
    >
      <h1>{title}</h1>
      <div className="event-section-card-bottom">
        <h2 className="event-section-card-subtitle">{subtitle}</h2>
        <h2 className="event-section-card-xp">&nbsp;{xp}</h2>
      </div>
    </div>
  );
}
