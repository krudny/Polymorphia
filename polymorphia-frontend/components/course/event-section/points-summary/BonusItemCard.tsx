import { API_STATIC_URL } from '@/services/api';
import '../../../../styles/points-summary.css';
import { BonusItemCardProps } from '@/interfaces/course/event-section/PointsSummaryInterfaces';
import EventSectionCard from '../card/EventSectionCard';

export default function BonusItemCard({ item }: BonusItemCardProps) {
  return (
    <EventSectionCard
      title={item.item.name}
      subtitle={`Zdobyto: ${item.receivedDate}`}
      image={{
        url: `${API_STATIC_URL}/${item.item.imageUrl}`,
        alt: item.item.name,
      }}
      size="xs"
      xp={`+${item.bonusXp} xp`}
    />
  );
}
