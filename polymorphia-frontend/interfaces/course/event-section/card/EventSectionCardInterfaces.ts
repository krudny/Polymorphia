import { EventSection } from '../EventSectionInterfaces';

export interface EventSectionCardProps {
  title: string;
  subtitle?: string;
  xp?: string;
  image?: {
    url: string;
    alt: string;
  };
  onClick?: () => void;
}

export type EventSectionCardVariantProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'gold' | 'silver' | 'bronze' | 'green';
};

export interface EventSectionCardGridProps {
  eventSection: EventSection;
  presentEventsModally: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}
