import {
  EventSectionCardProps,
  EventSectionCardVariantProps,
} from '@/interfaces/course/event-section/card/EventSectionCardInterfaces';
import '../../../../styles/event-section-card.css';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import Image from 'next/image';
import { API_STATIC_URL } from '@/services/api';

const eventSectionCard = tv({
  base: 'event-section-card',
  variants: {
    size: {
      sm: 'event-section-card-sm',
      md: 'event-section-card-md',
      lg: 'event-section-card-lg',
    },
    color: {
      gold: 'border-b-6 border-amber-400',
      silver: 'border-b-6 border-slate-400',
      bronze: 'border-b-6 border-amber-800',
      green: 'border-b-6 border-green-600',
      none: 'border-0'
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'none',
  },
});

export default function EventSectionCard({
  title,
  subtitle,
  xp,
  onClick,
  size,
  color,
}: EventSectionCardProps & EventSectionCardVariantProps) {
  return (
    <div
      className={clsx(
        eventSectionCard({ size, color }),
        true && 'event-section-card-hover'
      )}
      onClick={onClick}
    >
      {/* <div className="event-section-card-image">
        <Image
          src={`${API_STATIC_URL}/images/chests/s1.png`}
          alt="obrazek"
          fill
        />
      </div> */}
      <div className="event-section-card-middle">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      <div className="event-section-card-xp">
        <h1>{xp}</h1>
        <h2>SUMA</h2>
      </div>
    </div>
  );
}
