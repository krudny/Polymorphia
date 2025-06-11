import Modal from "@/components/modal/Modal";
import { BonusInfoModalProps } from "@/interfaces/course/event-section/PointsSummaryInterfaces";
import BonusItemCard from "./BonusItemCard";
import "../../../../styles/points-summary.css";
import { useEffect, useState } from "react";

export default function BonusInfoModal({
  bonusInfo,
  onClosed,
}: BonusInfoModalProps) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(!!bonusInfo);
  }, [bonusInfo]);

  return (
    <Modal
      isOpen={modalVisible}
      title={bonusInfo?.name ?? ""}
      onRequestClose={() => setModalVisible(false)}
      onClosed={onClosed}
    >
      <div className="bonus-info-modal">
        {bonusInfo?.items.map((item) => (
          <BonusItemCard key={item.assignedId} item={item} />
        ))}
      </div>
    </Modal>
  );
}
