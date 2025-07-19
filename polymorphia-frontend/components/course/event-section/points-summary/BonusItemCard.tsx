import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import { BonusItemCardProps } from "@/components/course/event-section/points-summary/types";
import XPCard from "../../../xp-card/XPCard";

export default function BonusItemCard({ item }: BonusItemCardProps) {
  return (
    <XPCard
      title={item.item.name}
      subtitle={`Zdobyto: ${item.receivedDate}`}
      image={{
        url: `${API_STATIC_URL}/${item.item.imageUrl}`,
        alt: item.item.name,
      }}
      size="xs"
      xp={`+${item.bonusXp}`}
      isSumLabelVisible={false}
    />
  );
}
