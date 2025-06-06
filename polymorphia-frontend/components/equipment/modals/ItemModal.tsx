import Modal from "@/components/modal/Modal";
import "../../../styles/points-summary.css"
import {API_STATIC_URL} from "@/services/api";
import XPCard from "@/components/xp-card/XPCard";
import {Item, ItemModalProps} from "@/interfaces/equipment/EquipmentInterfaces";

export default function ItemModal({item, onClose}: ItemModalProps) {
  return (
    <Modal
      isOpen={item !== null}
      onClose={onClose}
      title={item?.title ?? ""}
      subtitle={item?.subtitle ?? ""}
    >
      <div className="bonus-info-modal">
        {item?.items.map((item: Item) => (
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