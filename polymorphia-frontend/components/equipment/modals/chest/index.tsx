import XPCard from "@/components/xp-card/XPCard";
import Modal from "@/components/modal/Modal";
import "../index.css";
import { AssignedItemResponseDTO } from "@/interfaces/api/reward/assigned";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import { ChestModalProps } from "@/components/equipment/modals/chest/types";

export default function ChestModal({ equipment, onClose }: ChestModalProps) {
  const receivedItems = equipment.details.receivedItems;

  return (
    <Modal
      isDataPresented={true}
      onClosed={onClose}
      title={equipment.base.name ?? ""}
      subtitle={
        receivedItems && receivedItems.length > 0
          ? "Zdobyte nagrody"
          : "Brak zdobytych nagród"
      }
    >
      <div className="bonus-info-modal">
        {receivedItems &&
          receivedItems.length > 0 &&
          receivedItems.map((assignedItem: AssignedItemResponseDTO) => (
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
                <XPCardPoints
                  points={`+${assignedItem.details.gainedXp}`}
                  color="gray"
                />
              }
            />
          ))}
      </div>
    </Modal>
  );
}
