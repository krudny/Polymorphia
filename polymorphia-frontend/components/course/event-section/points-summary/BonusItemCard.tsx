import { BonusInfoItem } from '@/interfaces/course/EventSectionInterfaces';
import { API_STATIC_URL } from '@/services/api';
import Image from 'next/image';

export default function BonusItemCard({ item }: { item: BonusInfoItem }) {
  return (
    <div className="w-full flex flex-row gap-3 border-2 border-neutral-800 p-2 rounded-2xl shadow-sm">
      <Image
        src={`${API_STATIC_URL}/${item.imageUrl}`}
        alt={item.name}
        width={80}
        height={80}
        className="rounded-xl shadow-md"
      />
      <div className="flex flex-col justify-center grow truncate">
        <h1 className="text-3xl lg:text-4xl truncate">{item.name}</h1>
        <h2 className="truncate">Zdobyto: {item.receivedDate}</h2>
      </div>
      <div className="flex flex-col justify-center items-end text-nowrap">
        {item.bonusPercentage && <p className="lg:text-xl text-lg">({item.bonusPercentage})</p>}
        <p className="lg:text-4xl text-3xl">{item.bonusXp}</p>
      </div>
    </div>
  );
}
