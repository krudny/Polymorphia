import { API_STATIC_URL } from "@/services/api";
import XPCard from "@/components/xp-card/XPCard";
import { useContext } from "react";
import { EquipmentContext } from "@/components/providers/equipment/EquipmentContext";
import Modal from "@/components/modal/Modal";
import "../index.css";
import XPCardPoints from "@/components/xp-card/inner-components/XPCardPoints";
import { AssignedItemResponseDTO } from "@/interfaces/api/DTO";

export default function ChestModal() {
  const { currentChestModalData, setCurrentChestModalData } =
    useContext(EquipmentContext);
  const equipmentChest = currentChestModalData;

  if (
    equipmentChest !== null &&
    (!equipmentChest?.assignedChest.openedDate ||
      !equipmentChest?.receivedItems)
  ) {
    throw new Error("ChestModal handles only opened chests!");
  }

  return (
    <Modal
      isDataPresented={equipmentChest !== null}
      onClosed={() => setCurrentChestModalData(null)}
      title={equipmentChest?.assignedChest.chest.name ?? ""}
      subtitle="Zdobyte nagrody"
    >
      <div className="bonus-info-modal">
        {equipmentChest?.receivedItems!.map(
          (assignedItem: AssignedItemResponseDTO) => (
            <XPCard
              key={assignedItem.assignmentDetails.id}
              title={assignedItem.item.name}
              subtitle={`Zdobyto ${assignedItem.assignmentDetails.receivedDate}`}
              image={{
                url: `${API_STATIC_URL}/${assignedItem.item.imageUrl}`,
                alt: assignedItem.item.name,
              }}
              size="xs"
              // TODO: handle undefined xp
              component={
                <XPCardPoints
                  points={`+${assignedItem.assignmentDetails.xp}`}
                />
              }
            />
          )
        )}
      </div>
    </Modal>
  );
}
