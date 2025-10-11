import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "../index.css";
import { BaseItem } from "@/interfaces/api/reward";
import useModalContext from "@/hooks/contexts/useModalContext";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import {
  EquipmentChestOpenRequestDTO,
  EquipmentChestResponseDTO,
} from "@/interfaces/api/equipment";
import usePickChestItems from "@/hooks/course/usePickChestItems";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCard from "@/components/xp-card/XPCard";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function OpeningChestModalContent() {
  const { closeModal } = useModalContext();
  const {
    currentOpeningChestModalData,
    pickedItemId,
    setPickedItemId,
    setCurrentChestModalData,
  } = useEquipmentContext();
  const queryClient = useQueryClient();
  const openingChest = currentOpeningChestModalData;
  const pickChestItemsMutation = usePickChestItems();

  const handlePickItem = (itemId: number) => {
    if (!openingChest || openingChest.base.behavior === "ALL") {
      return;
    }
    setPickedItemId(itemId);
    console.log(pickedItemId);
  };

  const handleModalSubmit = async () => {
    if (
      !pickedItemId &&
      currentOpeningChestModalData?.base.behavior !== "ALL"
    ) {
      toast.error("Wybierz jeden przedmiot!");
      return;
    }

    const requestBody = {
      assignedChestId: currentOpeningChestModalData?.details.id,
      itemId:
        currentOpeningChestModalData?.base.behavior === "ALL"
          ? null
          : pickedItemId,
    } as EquipmentChestOpenRequestDTO;

    await toast.promise(pickChestItemsMutation.mutateAsync(requestBody), {
      loading: "Otwieranie skrzynki...",
      success: "Skrzynka otwarta pomyślnie!",
      error: (err: Error) => err.message,
    });

    const updatedChest =
      queryClient
        .getQueryData<EquipmentChestResponseDTO[]>(["equipmentChests"])
        ?.find(
          (chest) =>
            chest.details.id === currentOpeningChestModalData?.details.id
        ) ?? null;

    setCurrentChestModalData(updatedChest);
    closeModal();
  };

  return (
    <>
      <div className="opening-chest-modal">
        {/* TODO: handle chests that reached the limit */}
        {openingChest?.base.chestItems.map((item: BaseItem) => (
          <div
            key={item.id}
            className={`opening-chest-modal-image-wrapper ${
              pickedItemId === item.id
                ? "opening-chest-modal-image-selected"
                : ""
            }`}
            onClick={() => handlePickItem(item.id)}
          >
            <XPCard
              key={item.id}
              title={item.name}
              subtitle={item.bonusText}
              size="xs"
              leftComponent={
                <XPCardImage imageUrl={item.imageUrl} alt={item.name} />
              }
              rightComponent={
                <XPCardPoints
                  points={`+${item.potentialXp ? item.potentialXp : 0.0}`}
                  color="gray"
                />
              }
            />
          </div>
        ))}
        <h1>*Bonusy są liczone względem obecnej punktacji</h1>
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
