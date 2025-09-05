import Modal from "@/components/modal/Modal";
import OpeningChestModalContent from "./OpeningChestModalContent";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";

export default function OpeningChestModal() {
  const {
    currentOpeningChestModalData,
    setCurrentOpeningChestModalData,
    setPickedItemsIds,
  } = useEquipmentContext();
  const openingChest = currentOpeningChestModalData;

  const onClosed = () => {
    setCurrentOpeningChestModalData(null);
    setPickedItemsIds([]);
  };

  return (
    <Modal
      isDataPresented={currentOpeningChestModalData !== null}
      onClosed={onClosed}
      title={openingChest?.base.name ?? ""}
      subtitle={openingChest?.base.behaviorText ?? ""}
    >
      <OpeningChestModalContent />
    </Modal>
  );
}
