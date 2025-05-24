import Modal from '@/components/modal/Modal';
import { BonusInfoModalProps } from '@/interfaces/course/PointsSummaryInterfaces';
import BonusItemCard from './BonusItemCard';

export default function BonusInfoModal({
  bonusInfo,
  onClose,
}: BonusInfoModalProps) {
  return (
    <Modal
      isOpen={bonusInfo !== null}
      title={bonusInfo?.name ?? ''}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2">
        {bonusInfo?.items.map((item) => (
          <BonusItemCard key={item.assignedId} item={item} />
        ))}
      </div>
    </Modal>
  );
}
