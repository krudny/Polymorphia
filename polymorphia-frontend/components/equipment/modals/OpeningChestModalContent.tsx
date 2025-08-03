import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { EquipmentContext } from "@/components/providers/equipment/EquipmentContext";
import { API_STATIC_URL } from "@/services/api";
import { useContext } from "react";
import Image from "next/image";
import { useModal } from "@/components/providers/modal/ModalContext";
import "../index.css";
import { BaseItemResponseDTO } from "@/interfaces/api/DTO";

export default function OpeningChestModalContent() {
  const { closeModal } = useModal();

  const { currentOpeningChestModalData, pickedItemsIds, setPickedItemsIds } =
    useContext(EquipmentContext);
  const openingChest = currentOpeningChestModalData;

  if (openingChest !== null && openingChest.details.length !== 1) {
    throw new Error(
      "OpeningChestModalContent handles only one chest at a time!"
    );
  }

  const assignedChest =
    openingChest !== null
      ? {
          base: openingChest.base,
          details: openingChest.details[0],
        }
      : null;

  if (
    assignedChest !== null &&
    assignedChest.details.openedDate !== undefined
  ) {
    throw new Error("OpeningChestModalContent handles only unopened chests!");
  }

  const handlePickItem = (itemId: number) => {
    if (!assignedChest) return;
    const isPicked = pickedItemsIds.includes(itemId);

    if (assignedChest.base.behavior === "ONE_OF_MANY") {
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
        {/* TODO: handle chests that reached the limit */}
        {openingChest?.base.chestItems.map((item: BaseItemResponseDTO) => (
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
          onClick={closeModal}
        />
      </div>
    </>
  );
}
