import "../index.css";
import { API_STATIC_URL } from "@/services/api";
import XPCard from "@/components/xp-card/XPCard";
import { EquipmentContext } from "@/components/providers/equipment/EquipmentContext";
import { useContext } from "react";
import Modal from "@/components/modal/Modal";
import XPCardPoints from "@/components/xp-card/inner-components/XPCardPoints";
import { ItemAssignmentDetailsResponseDTO } from "@/interfaces/api/reward/assigned";

export default function ItemModal() {
  const { currentItemModalData, setCurrentItemModalData } =
    useContext(EquipmentContext);
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
              image={{
                url: `${API_STATIC_URL}/${equipmentItem.base.imageUrl}`,
                alt: equipmentItem.base.name,
              }}
              size="xs"
              // TODO: handle undefined xp
              component={
                <XPCardPoints points={`+${itemAssignmentDetails.gainedXp}`} />
              }
            />
          )
        )}
      </div>
    </Modal>
  );
}
