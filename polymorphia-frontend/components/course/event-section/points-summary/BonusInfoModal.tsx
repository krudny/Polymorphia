import Modal from "@/components/modal/Modal";
import { BonusInfoModalProps } from "@/interfaces/course/PointsSummaryInterfaces";

export default function BonusInfoModal({ bonusInfo, onClose}: BonusInfoModalProps) {
  return <Modal isOpen={bonusInfo !== null} title={bonusInfo?.name ?? ''} onClose={onClose}>
    Hi!
  </Modal>
}