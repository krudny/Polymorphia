import Modal from "@/components/modal/Modal";
import OpeningChestModalContent from "@/components/equipment/modals/OpeningChestModalContent";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import { UseOpeningChestModal } from "@/components/equipment/modals/types";

export default function OpeningChestModal({
  currentOpeningChestModalData,
}: UseOpeningChestModal) {
  const { setCurrentOpeningChestModalData, setPickedItemId, setPickedItemKey } =
    useEquipmentContext();
  const openingChest = currentOpeningChestModalData;

  const onClosed = () => {
    setCurrentOpeningChestModalData(null);
    setPickedItemId(null);
    setPickedItemKey(null);
  };

  return (
    <Modal
      isDataPresented={currentOpeningChestModalData !== null}
      onClosed={onClosed}
      title={openingChest?.base.name ?? ""}
      subtitle={openingChest?.base.behaviorText ?? ""}
    >
      <OpeningChestModalContent
        currentOpeningChestModalData={currentOpeningChestModalData}
      />
    </Modal>
  );
}
