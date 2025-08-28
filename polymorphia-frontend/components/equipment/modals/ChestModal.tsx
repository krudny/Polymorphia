import XPCard from "@/components/xp-card/XPCard";
import Modal from "@/components/modal/Modal";
import "../index.css";
import { AssignedItemResponseDTO } from "@/interfaces/api/reward/assigned";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";

export default function ChestModal() {
  const { currentChestModalData, setCurrentChestModalData } = useEquipmentContext();
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
          ),
        )}
      </div>
    </Modal>
  );
}
