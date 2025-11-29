import "../index.css";
import XPCard from "@/components/xp-card/XPCard";
import Modal from "@/components/modal";
import { ItemAssignmentDetailsResponseDTO } from "@/interfaces/api/reward/assigned";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import { ItemModalProps } from "@/components/equipment/modals/item/types";

export default function ItemModal({ equipment, onClose }: ItemModalProps) {
  return (
    <Modal
      isDataPresented={equipment !== null}
      onClosed={onClose}
      title={equipment.base.name ?? ""}
      subtitle={equipment.base.bonusText ?? ""}
    >
      <div className="bonus-info-modal">
        {equipment.details.map(
          (itemAssignmentDetails: ItemAssignmentDetailsResponseDTO) => (
            <XPCard
              key={itemAssignmentDetails.id}
              title={equipment.base.name}
              subtitle={`Zdobyto ${itemAssignmentDetails.receivedDate}`}
              size="xs"
              // TODO: handle undefined xp
              leftComponent={
                <XPCardImage
                  imageUrl={equipment.base.imageUrl}
                  alt={equipment.base.name}
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
