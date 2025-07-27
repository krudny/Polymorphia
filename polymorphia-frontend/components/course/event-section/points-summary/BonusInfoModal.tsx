import { BonusInfoModalProps } from "@/components/course/event-section/points-summary/types";
import BonusItemCard from "./BonusItemCard";
import "./index.css";
import Modal from "@/components/modal/Modal";

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
        {bonusInfo?.data.assignedItems.map((assignedItem) => (
          <BonusItemCard
            key={assignedItem.assignmentDetails.id}
            assignedItem={assignedItem}
          />
        ))}
      </div>
    </Modal>
  );
}
