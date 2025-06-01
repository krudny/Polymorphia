import {
  EventSectionCardProps,
  EventSectionCardVariantProps,
} from '@/interfaces/course/event-section/card/EventSectionCardInterfaces';
import '../../../../styles/event-section-card.css';
import clsx from 'clsx';
import { tv } from 'tailwind-variants';
import Image from 'next/image';

const eventSectionCard = tv({
  base: 'event-section-card',
  variants: {
    size: {
      xs: 'event-section-card-xs',
      sm: 'event-section-card-sm',
      md: 'event-section-card-md',
      lg: 'event-section-card-lg',
    },
    color: {
      gold: 'border-b-6 border-amber-400',
      silver: 'border-b-6 border-slate-400',
      bronze: 'border-b-6 border-amber-800',
      green: 'border-b-6 border-green-600',
      none: 'border-0',
    },
    forceWidth: {
      true: 'event-section-card-force-width',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'none',
    forceWidth: false,
  },
});

export default function EventSectionCard({
  title,
  subtitle,
  xp,
  image,
  onClick,
  size,
  color,
  forceWidth,
}: EventSectionCardProps & EventSectionCardVariantProps) {
  return (
    <div
      className={clsx(
        eventSectionCard({ size, color, forceWidth }),
        onClick && 'event-section-card-hover'
      )}
      onClick={onClick}
    >
      {image && (
        <div className="event-section-card-image">
          <Image src={image.url} alt={image.alt} fill />
        </div>
      )}
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
