import { API_STATIC_URL } from '@/services/api';
import Image from 'next/image';
import '../../../../styles/points-summary.css';
import { BonusItemCardProps } from '@/interfaces/course/PointsSummaryInterfaces';

export default function BonusItemCard({ item }: BonusItemCardProps) {
  return (
    <div className="bonus-item-card">
      <div className="bonus-item-card-image">
        <Image
          src={`${API_STATIC_URL}/${item.imageUrl}`}
          alt={item.name}
          fill
        />
      </div>
      <div className="bonus-item-card-middle">
        <h1>{item.name}</h1>
        <h2>Zdobyto: {item.receivedDate}</h2>
      </div>
      <div className="bonus-item-card-xp">
        {item.bonusPercentage && (
          <p className="bonus-item-card-xp-percentage">
            ({item.bonusPercentage})
          </p>
        )}
        <p className="bonus-item-card-xp-value">{item.bonusXp}</p>
      </div>
    </div>
  );
}
