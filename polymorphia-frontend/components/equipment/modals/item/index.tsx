import "../index.css";
import XPCard from "@/components/xp-card/XPCard";
import Modal from "@/components/modal/Modal";
import { ItemAssignmentDetailsResponseDTO } from "@/interfaces/api/reward/assigned";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import { ItemModalProps } from "@/components/equipment/modals/item/types";

export default function ItemModal({
  currentItemModalData,
  setCurrentItemModalData,
}: ItemModalProps) {
  return (
    <Modal
      isDataPresented={currentItemModalData !== null}
      onClosed={() => setCurrentItemModalData(null)}
      title={currentItemModalData.base.name ?? ""}
      subtitle={currentItemModalData.base.bonusText ?? ""}
    >
      <div className="bonus-info-modal">
        {currentItemModalData.details.map(
          (itemAssignmentDetails: ItemAssignmentDetailsResponseDTO) => (
            <XPCard
              key={itemAssignmentDetails.id}
              title={currentItemModalData.base.name}
              subtitle={`Zdobyto ${itemAssignmentDetails.receivedDate}`}
              size="xs"
              // TODO: handle undefined xp
              leftComponent={
                <XPCardImage
                  imageUrl={currentItemModalData.base.imageUrl}
                  alt={currentItemModalData.base.name}
                />
              }
              rightComponent={
                <XPCardPoints
                  points={`+${itemAssignmentDetails.gainedXp}`}
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
