import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "../index.css";
import { BaseItem } from "@/interfaces/api/reward";
import useModalContext from "@/hooks/contexts/useModalContext";
import useEquipmentContext from "@/hooks/contexts/useEquipmentContext";
import { EquipmentChestResponseDTO } from "@/interfaces/api/equipment";
import usePickChestItems from "@/hooks/course/usePickChestItems";
import XPCardPoints from "@/components/xp-card/components/XPCardPoints";
import XPCard from "@/components/xp-card/XPCard";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import usePotentialXp from "@/hooks/course/usePotentialXp";
import Loading from "@/components/loading";
import { useEffect, useState } from "react";
import XPCardImageWithLock from "@/components/xp-card/components/XPCardImageLocked";

export default function OpeningChestModalContent() {
  const { closeModal } = useModalContext();
  const {
    currentOpeningChestModalData,
    pickedItemId,
    setPickedItemId,
    pickedItemKey,
    setPickedItemKey,
    setCurrentChestModalData,
  } = useEquipmentContext();
  const queryClient = useQueryClient();
  const pickChestItemsMutation = usePickChestItems();
  const [xpDetailsEquationText, setXpDetailsEquation] = useState("");
  const { data: chestPotentialXp, isLoading } = usePotentialXp(
    currentOpeningChestModalData?.details.id
  );

  useEffect(() => {
    if (!chestPotentialXp) {
      return;
    }

    if (chestPotentialXp?.behavior === "ALL") {
      const { bonusXp, lossXp, totalBonusXp } =
        chestPotentialXp.potentialXp.summary;
      setXpDetailsEquation(
        `Otrzymasz w sumie ${bonusXp} - ${lossXp} = ${totalBonusXp} xp*`
      );
    } else {
      setXpDetailsEquation(
        "Wybierz przedmiot, by sprawdzić, ile xp doda do punktacji*"
      );
    }
  }, [chestPotentialXp]);

  if (isLoading || !chestPotentialXp || !currentOpeningChestModalData) {
    return <Loading />;
  }

  const handlePickItem = (
    itemId: number,
    itemKey: string,
    isLimitReached: boolean
  ) => {
    if (!currentOpeningChestModalData || chestPotentialXp.behavior === "ALL") {
      return;
    }

    const itemDetails = chestPotentialXp.potentialXp.itemDetails[itemKey];
    const { bonusXp, lossXp, totalBonusXp } = itemDetails;

    if (isLimitReached) {
      return;
    }

    setXpDetailsEquation(
      `Otrzymasz w sumie ${bonusXp} - ${lossXp} = ${totalBonusXp} xp*`
    );

    setPickedItemId(itemId);
    setPickedItemKey(itemKey);
  };

  const handleModalSubmit = async () => {
    const requestBody = {
      assignedChestId: currentOpeningChestModalData.details.id,
      itemId:
        currentOpeningChestModalData?.base.behavior === "ALL"
          ? undefined
          : pickedItemId,
    };

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

    if (!updatedChest) {
      toast.error("Nie udało się pobrać danych o nowootwartej skrzynce");
      return;
    }

    setCurrentChestModalData(updatedChest);
    closeModal();
  };

  const getItemKey = (index: number, item: BaseItem) => {
    let indexInGroup = 0;
    for (let i = 0; i < index; i++) {
      if (currentOpeningChestModalData?.base.chestItems[i].id === item.id) {
        indexInGroup++;
      }
    }
    return `${item.id}_${indexInGroup}`;
  };

  return (
    <>
      <div className="opening-chest-modal">
        <h1>{xpDetailsEquationText}</h1>
        {/* TODO: handle chests that reached the limit */}
        {currentOpeningChestModalData?.base.chestItems.map(
          (item: BaseItem, index: number) => {
            const itemKey = getItemKey(index, item);
            const itemDetails =
              chestPotentialXp.potentialXp.itemDetails[itemKey];

            const cursorCssClass =
              currentOpeningChestModalData?.base.behavior === "ONE_OF_MANY" &&
              !item.isLimitReached
                ? "cursor-pointer"
                : "";
            return (
              <div
                key={itemKey}
                className={`opening-chest-modal-image-wrapper ${
                  pickedItemKey === itemKey
                    ? "opening-chest-modal-image-selected"
                    : ""
                }
            ${cursorCssClass}
            `}
                onClick={() =>
                  handlePickItem(item.id, itemKey, item.isLimitReached)
                }
              >
                <XPCard
                  key={item.id}
                  title={item.name}
                  subtitle={
                    item.isLimitReached
                      ? "Maksymalny limit przedmiotów osiągnięty"
                      : item.bonusText
                  }
                  size="xs"
                  leftComponent={
                    <XPCardImageWithLock
                      imageUrl={item.imageUrl}
                      alt={item.name}
                      isLocked={item.isLimitReached}
                    />
                  }
                  rightComponent={
                    <XPCardPoints
                      points={`+${itemDetails.bonusXp}`}
                      color="gray"
                    />
                  }
                />
              </div>
            );
          }
        )}
        <h2 className={"opening-chest-modal-footer-text"}>
          * Bonusy są liczone względem obecnej punktacji. Optymalizacja może
          powodować osłabienie działania innych nagród - całkowite xp jednak
          zawsze się zwiększy{" "}
        </h2>
      </div>
      <div className="opening-chest-modal-button-wrapper">
        <ButtonWithBorder
          text="Potwierdź"
          className="w-full rounded-xl"
          onClick={handleModalSubmit}
          isActive={
            !pickedItemId &&
            currentOpeningChestModalData?.base.behavior !== "ALL"
          }
        />
      </div>
    </>
  );
}
