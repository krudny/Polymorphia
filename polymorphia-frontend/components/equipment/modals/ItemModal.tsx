import "../../../styles/points-summary.css";
import { API_STATIC_URL } from "@/services/api";
import XPCard from "@/components/xp-card/XPCard";
import { Item } from "@/interfaces/equipment/EquipmentInterfaces";
import { EquipmentContext } from "@/components/providers/EquipmentContext";
import { useContext } from "react";
import Modal from "@/components/modal/Modal";

export default function ItemModal() {
  const { currentItemModalData, setCurrentItemModalData } =
    useContext(EquipmentContext);
  const item = currentItemModalData;

  return (
    <Modal
      isDataPresented={item !== null}
      onClosed={() => setCurrentItemModalData(null)}
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
  );
}
