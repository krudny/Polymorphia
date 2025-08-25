import { API_STATIC_URL } from "@/services/api";
import XPCard from "@/components/xp-card/XPCard";
import { useContext } from "react";
import { EquipmentContext } from "@/components/providers/equipment/EquipmentContext";
import Modal from "@/components/modal/Modal";
import "../index.css";
import { AssignedItemResponseDTO } from "@/interfaces/api/reward/assigned";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardImage from "@/components/xp-card/components/XPCardImage";

export default function ChestModal() {
  const { currentChestModalData, setCurrentChestModalData } =
    useContext(EquipmentContext);
  const equipmentChest = currentChestModalData;

  return (
    <Modal
      isDataPresented={equipmentChest !== null}
      onClosed={() => setCurrentChestModalData(null)}
      title={equipmentChest?.base.name ?? ""}
      subtitle="Zdobyte nagrody"
    >
      <div className="bonus-info-modal">
        {equipmentChest?.details.receivedItems!.map(
          (assignedItem: AssignedItemResponseDTO) => (
            <XPCard
              key={assignedItem.details.id}
              title={assignedItem.base.name}
              subtitle={`Zdobyto ${assignedItem.details.receivedDate}`}
              size="xs"
              leftComponent={
                <XPCardImage
                  imageUrl={assignedItem.base.imageUrl}
                  alt={assignedItem.base.name}
                />
              }
              // TODO: handle undefined xp
              rightComponent={
                <XPCardPoints points={`+${assignedItem.details.gainedXp}`} />
              }
            />
          )
        )}
      </div>
    </Modal>
  );
}
