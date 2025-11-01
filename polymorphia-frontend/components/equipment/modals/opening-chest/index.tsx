import Modal from "@/components/modal/Modal";
import OpeningChestModalContent from "@/components/equipment/modals/opening-chest/OpeningChestModalContent";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import { OpeningChestModalProps } from "@/components/equipment/modals/opening-chest/types";
import { EquipmentActions } from "@/providers/equipment/reducer/types";

export default function OpeningChestModal({
  equipment,
  onClose,
}: OpeningChestModalProps) {
  const { dispatch } = useEquipmentContext();

  const handleClose = () => {
    dispatch({ type: EquipmentActions.CLEAR_PICKED_ITEM });
    onClose();
  };

  return (
    <Modal
      isDataPresented={true}
      onClosed={handleClose}
      title={equipment.base.name ?? ""}
      subtitle={equipment.base.behaviorText ?? ""}
    >
      <OpeningChestModalContent equipment={equipment} />
    </Modal>
  );
}
