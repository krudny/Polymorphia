import { BonusInfoModalProps } from "@/components/course/event-section/points-summary/types";
import BonusItemCard from "@/components/course/event-section/points-summary/BonusItemCard";
import "./index.css";
import Modal from "@/components/modal";

export default function BonusInfoModal({
  bonusInfo,
  onClosed,
}: BonusInfoModalProps) {
  return (
    <Modal
      isDataPresented={bonusInfo !== null}
      title={bonusInfo?.title ?? ""}
      onClosed={onClosed}
    >
      <div className="bonus-info-modal">
        {bonusInfo?.assignedItems?.map((assignedItem) => (
          <BonusItemCard
            key={assignedItem.details.id}
            assignedItem={assignedItem}
          />
        ))}
      </div>
    </Modal>
  );
}
