import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import { BonusItemCardProps } from "@/components/course/event-section/points-summary/types";
import XPCard from "../../../xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/inner-components/XPCardPoints";

export default function BonusItemCard({ assignedItem }: BonusItemCardProps) {
  return (
    <XPCard
      title={assignedItem.item.name}
      subtitle={`Zdobyto: ${assignedItem.receivedDate}`}
      image={{
        url: `${API_STATIC_URL}/${assignedItem.item.imageUrl}`,
        alt: assignedItem.item.name,
      }}
      size="xs"
      // TODO: handle undefined item.xp
      component={<XPCardPoints points={`+${assignedItem.xp}`} />}
    />
  );
}
