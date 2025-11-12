import XPCard from "@/components/xp-card/XPCard";
import Modal from "@/components/modal";
import "../index.css";
import { AssignedItemResponseDTO } from "@/interfaces/api/reward/assigned";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import { ChestModalProps } from "@/components/equipment/modals/chest/types";

export default function ChestModal({ equipment, onClose }: ChestModalProps) {
  return (
    <Modal
      isDataPresented={equipment !== null}
      onClosed={onClose}
      title={equipment.base.name ?? ""}
      subtitle="Zdobyte nagrody"
    >
      <div className="bonus-info-modal">
        {equipment.details.receivedItems!.map(
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
                <XPCardPoints
                  points={`+${assignedItem.details.gainedXp}`}
                  color="gray"
                />
              }
            />
          )
        )}
      </div>
    </Modal>
  );
}
