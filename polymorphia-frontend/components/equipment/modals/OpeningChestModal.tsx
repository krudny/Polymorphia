import { useContext, useEffect, useState } from "react";
import { EquipmentContext } from "@/components/providers/EquipmentContext";
import { API_STATIC_URL } from "@/services/api";
import Image from "next/image";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import ModalInner from "@/components/modal/ModalInner";

export default function OpeningChestModal() {
  const {
    currentOpeningChestModalData,
    setCurrentOpeningChestModalData,
    pickedItemsIds,
    setPickedItemsIds,
  } = useContext(EquipmentContext);
  const openingChest = currentOpeningChestModalData;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(!!openingChest);
  }, [openingChest]);

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

  const onRequestClose = () => {
    setModalVisible(false);
  };

  const onClosed = () => {
    setCurrentOpeningChestModalData(null);
    setPickedItemsIds([]);
  };

  return (
    <ModalInner
      isOpen={modalVisible}
      onRequestClose={onRequestClose}
      onClosed={onClosed}
      title={openingChest?.title ?? ""}
      subtitle={openingChest?.subtitle ?? ""}
    >
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
            onClick={onRequestClose}
          />
        </div>
      </>
    </ModalInner>
  );
}
