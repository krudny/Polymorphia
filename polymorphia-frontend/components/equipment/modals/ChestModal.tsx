import Modal from "@/components/modal/Modal";
import {API_STATIC_URL} from "@/services/api";
import XPCard from "@/components/xp-card/XPCard";
import {ChestModalProps, Item} from "@/interfaces/equipment/EquipmentInterfaces";

export default function ChestModal({chest, onClose}: ChestModalProps) {
  return (
    <Modal
      isOpen={chest !== null}
      onClose={onClose}
      title={chest?.title ?? ""}
      subtitle={chest?.subtitle ?? ""}
    >
      <div className="bonus-info-modal">
        {chest?.items.map((item: Item) => (
          <XPCard
            key={item.itemId}
            title={item.title}
            subtitle={item.subtitle}
            image={{
              url: `${API_STATIC_URL}/${item.imageUrl}`,
              alt: item.title,
            }}
            size="xs"
            xp={`+${item.bonusXp} xp`}
            isSumVisible={false}
          />
        ))}
      </div>
    </Modal>
  )
}