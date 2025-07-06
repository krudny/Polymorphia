import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { EquipmentContext } from "@/components/providers/equipment/EquipmentContext";
import { API_STATIC_URL } from "@/services/api";
import { useContext } from "react";
import Image from "next/image";
import { useModal } from "@/components/providers/ModalContext";
import { Item } from "@/components/equipment/types";
import "../index.css";

export default function OpeningChestModalContent() {
  const { closeModal } = useModal();

  const { currentOpeningChestModalData, pickedItemsIds, setPickedItemsIds } =
    useContext(EquipmentContext);
  const openingChest = currentOpeningChestModalData;

  const handlePickItem = (itemId: number) => {
    if (!openingChest) return;
    const isPicked = pickedItemsIds.includes(itemId);

    if (openingChest.behavior === "ONE_OF_MANY") {
      setPickedItemsIds([itemId]);
    } else {
      setPickedItemsIds((prev: number[]) =>
        isPicked
          ? prev.filter((id: number) => id !== itemId)
          : [...prev, itemId]
      );
    }
  };

  return (
    <>
      <div className="opening-chest-modal">
        {openingChest?.items.map((item: Item) => (
          <div
            key={item.itemId}
            className="opening-chest-modal-image-wrapper"
            onClick={() => handlePickItem(item.itemId)}
          >
            <Image
              src={`${API_STATIC_URL}/${item.imageUrl}`}
              alt={item.title}
              fill
              className={`equipment-image ${
                pickedItemsIds.includes(item.itemId)
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
          onClick={closeModal}
        />
      </div>
    </>
  );
}
