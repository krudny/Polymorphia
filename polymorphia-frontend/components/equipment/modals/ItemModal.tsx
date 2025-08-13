import "../index.css";
import XPCard from "@/components/xp-card/XPCard";
import { EquipmentContext } from "@/components/providers/equipment/EquipmentContext";
import { useContext } from "react";
import Modal from "@/components/modal/Modal";
import { Item } from "@/components/equipment/types";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardImage from "@/components/xp-card/components/XPCardImage";

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
            size="xs"
            leftComponent={
              <XPCardImage imageUrl={item.imageUrl} alt={item.title} />
            }
            rightComponent={<XPCardPoints points={`+${item.bonusXp}`} />}
          />
        ))}
      </div>
    </Modal>
  );
}
