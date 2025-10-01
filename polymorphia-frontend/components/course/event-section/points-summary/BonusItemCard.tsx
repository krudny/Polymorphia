import { API_STATIC_URL } from "@/services/api";
import "./index.css";
import { BonusItemCardProps } from "@/components/course/event-section/points-summary/types";
import XPCard from "../../../xp-card/XPCard";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardImage from "@/components/xp-card/components/XPCardImage";

export default function BonusItemCard({ assignedItem }: BonusItemCardProps) {
  return (
    <XPCard
      title={assignedItem.base.name}
      subtitle={`Zdobyto: ${assignedItem.details.receivedDate}`}
      leftComponent={
        <XPCardImage
          imageUrl={`${API_STATIC_URL}/${assignedItem.base.imageUrl}`}
          alt={assignedItem.base.name}
        />
      }
      size="xs"
      // TODO: handle undefined xp
      // TODO: left component
      rightComponent={
        <XPCardPoints points={`+${assignedItem.details.gainedXp}`} />
      }
    />
  );
}
