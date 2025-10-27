import XPCard from "@/components/xp-card/XPCard";
import Modal from "@/components/modal/Modal";
import "../index.css";
import { AssignedItemResponseDTO } from "@/interfaces/api/reward/assigned";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import { ChestModalProps } from "@/components/equipment/modals/chest/types";

export default function ChestModal({
  currentChestModalData,
  setCurrentChestModalData,
}: ChestModalProps) {
  return (
    <Modal
      isDataPresented={currentChestModalData !== null}
      onClosed={() => setCurrentChestModalData(null)}
      title={currentChestModalData.base.name ?? ""}
      subtitle="Zdobyte nagrody"
    >
      <div className="bonus-info-modal">
        {currentChestModalData.details.receivedItems!.map(
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
