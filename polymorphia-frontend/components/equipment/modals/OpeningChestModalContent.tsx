import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { EquipmentContext } from "@/components/providers/EquipmentContext";
import { API_STATIC_URL } from "@/services/api";
import { useContext } from "react";
import Image from "next/image";
import { useModal } from "@/components/providers/ModalContext";

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
      setPickedItemsIds((prev) =>
        isPicked ? prev.filter((id) => id !== itemId) : [...prev, itemId]
      );
    }
  };

  return (
    <>
      <div className="w-80 grid grid-cols-2 gap-3">
        {openingChest?.items.map((item) => {
          const isPicked = pickedItemsIds.includes(item.itemId);

          return (
            <div
              key={item.itemId}
              className="relative w-full aspect-square"
              onClick={() => handlePickItem(item.itemId)}
            >
              <Image
                src={`${API_STATIC_URL}/${item.imageUrl}`}
                alt={item.title}
                fill
                className={`equipment-img ${
                  isPicked ? "outline-4 outline-amber-400" : ""
                }`}
                priority
                sizes="(min-width: 1024px) 10vw, 25vw"
              />
            </div>
          );
        })}
      </div>
      <div className="w-full mt-5">
        <ButtonWithBorder
          text="Potwierdź"
          className="w-full"
          onClick={closeModal}
        />
      </div>
    </>
  );
}
