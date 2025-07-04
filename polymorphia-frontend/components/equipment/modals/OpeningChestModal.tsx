import { useContext } from "react";
import { EquipmentContext } from "@/components/providers/EquipmentContext";
import Modal from "@/components/modal/Modal";
import OpeningChestModalContent from "./OpeningChestModalContent";

export default function OpeningChestModal() {
  const {
    currentOpeningChestModalData,
    setCurrentOpeningChestModalData,
    setPickedItemsIds,
  } = useContext(EquipmentContext);
  const openingChest = currentOpeningChestModalData;

  const onClosed = () => {
    setCurrentOpeningChestModalData(null);
    setPickedItemsIds([]);
  };

  return (
    <Modal
      isDataPresented={currentOpeningChestModalData !== null}
      onClosed={onClosed}
      title={openingChest?.title ?? ""}
      subtitle={openingChest?.subtitle ?? ""}
    >
      <OpeningChestModalContent />
    </Modal>
  );
}
