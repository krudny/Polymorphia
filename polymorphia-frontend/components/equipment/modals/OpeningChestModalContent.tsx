import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import "../index.css";
import { BaseItem } from "@/interfaces/api/reward";
import useModalContext from "@/hooks/contexts/useModalContext";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import { useEffect } from "react";
import { EquipmentChestOpenRequestDTO } from "@/interfaces/api/equipment";
import usePickChestItems from "@/hooks/course/usePickChestItems";
import toast from "react-hot-toast";

export default function OpeningChestModalContent() {
  const { closeModal } = useModalContext();
  const { currentOpeningChestModalData, pickedItemsIds, setPickedItemsIds } =
    useEquipmentContext();
  const openingChest = currentOpeningChestModalData;
  const pickChestItemsMutation = usePickChestItems();

  const handlePickItem = (itemId: number) => {
    if (!openingChest || openingChest.base.behavior === "ALL") {
      return;
    }
    setPickedItemsIds([itemId]);
  };

  const handleModalSubmit = () => {
    if (
      pickedItemsIds.length != 1 &&
      openingChest?.base.behavior === "ONE_OF_MANY"
    ) {
      toast.error("Wybierz jeden przedmiot!");
      return;
    }

    const requestBody = {
      assignedChestId: currentOpeningChestModalData?.details.id,
      itemId:
        openingChest?.base.behavior === "ONE_OF_MANY"
          ? pickedItemsIds[0]
          : null,
    } as EquipmentChestOpenRequestDTO;

    pickChestItemsMutation.mutate(requestBody);
    closeModal();
  };

  useEffect(() => {
    if (openingChest?.base.behavior === "ALL") {
      setPickedItemsIds(openingChest.base.chestItems.map((item) => item.id));
    }
  }, [openingChest, setPickedItemsIds]);

  return (
    <>
      <div className="opening-chest-modal">
        {/* TODO: handle chests that reached the limit */}
        {openingChest?.base.chestItems.map((item: BaseItem) => (
          <div
            key={item.id}
            className="opening-chest-modal-image-wrapper"
            onClick={() => handlePickItem(item.id)}
          >
            <Image
              src={`${API_STATIC_URL}/${item.imageUrl}`}
              alt={item.name}
              fill
              className={`equipment-image ${
                pickedItemsIds.includes(item.id)
                  ? "opening-chest-modal-image-selected"
                  : ""
              }`}
              priority
              sizes="(min-width: 1024px) 10vw, 25vw"
            />
          </div>
        ))}
      </div>
      <div className="opening-chest-modal-button-wrapper">
        <ButtonWithBorder
          text="Potwierdź"
          className="w-full rounded-xl"
          onClick={handleModalSubmit}
        />
      </div>
    </>
  );
}
