import XPCard from "@/components/xp-card/XPCard";
import { useContext } from "react";
import { EquipmentContext } from "@/components/providers/equipment/EquipmentContext";
import Modal from "@/components/modal/Modal";
import { Item } from "@/components/equipment/types";
import "../index.css";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardImage from "@/components/xp-card/components/XPCardImage";

export default function ChestModal() {
  const { currentChestModalData, setCurrentChestModalData } =
    useContext(EquipmentContext);
  const chest = currentChestModalData;

  return (
    <Modal
      isDataPresented={chest !== null}
      onClosed={() => setCurrentChestModalData(null)}
      title={chest?.title ?? ""}
      subtitle={chest?.subtitle ?? ""}
    >
      <div className="bonus-info-modal">
        {chest?.items.map((item: Item) => (
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
