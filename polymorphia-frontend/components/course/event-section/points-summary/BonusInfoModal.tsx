import { BonusInfoModalProps } from "@/interfaces/course/event-section/PointsSummaryInterfaces";
import BonusItemCard from "./BonusItemCard";
import "../../../../styles/points-summary.css";
import Modal from "@/components/modal/Modal";

export default function BonusInfoModal({
  bonusInfo,
  onClose,
}: BonusInfoModalProps) {
  return (
    <Modal
      isDataPresented={bonusInfo !== null}
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
