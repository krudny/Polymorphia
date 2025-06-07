import Modal from "@/components/modal/Modal";
import { BonusInfoModalProps } from "@/interfaces/course/event-section/PointsSummaryInterfaces";
import BonusItemCard from "./BonusItemCard";
import "../../../../styles/points-summary.css";

export default function BonusInfoModal({
  bonusInfo,
  onClose,
}: BonusInfoModalProps) {
  return (
    <Modal
      isOpen={bonusInfo !== null}
      title={bonusInfo?.name ?? ""}
      onClose={onClose}
    >
      <div className="bonus-info-modal">
        {bonusInfo?.items.map((item) => (
          <BonusItemCard key={item.assignedId} item={item} />
        ))}
      </div>
    </Modal>
  );
}
