import "../index.css";
import XPCard from "@/components/xp-card/XPCard";
import Modal from "@/components/modal/Modal";
import { ItemAssignmentDetailsResponseDTO } from "@/interfaces/api/reward/assigned";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";

export default function ItemModal() {
  const { currentItemModalData, setCurrentItemModalData } =
    useEquipmentContext();
  const equipmentItem = currentItemModalData;

  return (
    <Modal
      isDataPresented={equipmentItem !== null}
      onClosed={() => setCurrentItemModalData(null)}
      title={equipmentItem?.base.name ?? ""}
      subtitle={equipmentItem?.base.bonusText ?? ""}
    >
      <div className="bonus-info-modal">
        {equipmentItem?.details.map(
          (itemAssignmentDetails: ItemAssignmentDetailsResponseDTO) => (
            <XPCard
              key={itemAssignmentDetails.id}
              title={equipmentItem.base.name}
              subtitle={`Zdobyto ${itemAssignmentDetails.receivedDate}`}
              size="xs"
              // TODO: handle undefined xp
              leftComponent={
                <XPCardImage
                  imageUrl={equipmentItem.base.imageUrl}
                  alt={equipmentItem.base.name}
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
