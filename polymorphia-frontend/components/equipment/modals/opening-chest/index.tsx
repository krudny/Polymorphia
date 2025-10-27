import Modal from "@/components/modal/Modal";
import OpeningChestModalContent from "@/components/equipment/modals/opening-chest/OpeningChestModalContent";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import { OpeningChestModalProps } from "@/components/equipment/modals/opening-chest/types";

export default function OpeningChestModal({
  currentOpeningChestModalData,
}: OpeningChestModalProps) {
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
      title={openingChest.base.name ?? ""}
      subtitle={openingChest.base.behaviorText ?? ""}
    >
      <OpeningChestModalContent
        currentOpeningChestModalData={currentOpeningChestModalData}
      />
    </Modal>
  );
}
