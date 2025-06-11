import Modal from "@/components/modal/Modal";
import { API_STATIC_URL } from "@/services/api";
import XPCard from "@/components/xp-card/XPCard";
import { Item } from "@/interfaces/equipment/EquipmentInterfaces";
import { useContext } from "react";
import { EquipmentContext } from "@/components/providers/EquipmentContext";

export default function ChestModal() {
  const { currentChestModalData, setCurrentChestModalData } =
    useContext(EquipmentContext);
  const chest = currentChestModalData;

  return (
    <Modal
      isOpen={chest !== null}
      onClose={() => setCurrentChestModalData(null)}
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
  );
}
