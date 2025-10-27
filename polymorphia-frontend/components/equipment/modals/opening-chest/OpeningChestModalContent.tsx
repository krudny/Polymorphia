import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import { BaseItem, ChestBehaviors } from "@/interfaces/api/reward";
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
import { useMediaQuery } from "react-responsive";
import clsx from "clsx";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { OpeningChestModalProps } from "@/components/equipment/modals/opening-chest/types";

export default function OpeningChestModalContent({
  currentOpeningChestModalData,
}: OpeningChestModalProps) {
  const { closeModal } = useModalContext();
  const {
    pickedItemId,
    setPickedItemId,
    pickedItemKey,
    setPickedItemKey,
    setCurrentChestModalData,
  } = useEquipmentContext();
  const queryClient = useQueryClient();
  const pickChestItemsMutation = usePickChestItems();
  const { courseId, id: userId } = useUserDetails();
  const [xp, setXp] = useState({
    gain: "0.0 xp",
    loss: "0.0 xp",
    sum: "0.0 xp",
  });
  const { data: chestPotentialXp, isLoading } = usePotentialXp(
    currentOpeningChestModalData.details.id
  );
  const isSm = useMediaQuery({ maxWidth: 768 });
  const areAllItemsOverLimit =
    currentOpeningChestModalData.base.chestItems?.every(
      (item) => item.isLimitReached
    ) ?? false;

  useEffect(() => {
    if (!chestPotentialXp) {
      return;
    }

    if (chestPotentialXp?.behavior === ChestBehaviors.ALL) {
      const { bonusXp, lossXp, totalBonusXp } =
        chestPotentialXp.potentialXp.summary;
      setXp({
        gain: `${bonusXp} xp`,
        loss: `${lossXp} xp`,
        sum: `${totalBonusXp} xp`,
      });
    }
  }, [chestPotentialXp]);

  if (isLoading || !chestPotentialXp) {
    return (
      <>
        <div className="opening-chest-modal">
          <div className="opening-chest-modal-loading">
            <Loading />
          </div>
        </div>
      </>
    );
  }

  const handlePickItem = (
    itemId: number,
    itemKey: string,
    isLimitReached: boolean
  ) => {
    if (chestPotentialXp.behavior === ChestBehaviors.ALL) {
      return;
    }

    const itemDetails = chestPotentialXp.potentialXp.itemDetails[itemKey];
    const { bonusXp, lossXp, totalBonusXp } = itemDetails;

    if (isLimitReached) {
      return;
    }

    setXp({
      gain: `${bonusXp} xp`,
      loss: `${lossXp} xp`,
      sum: `${totalBonusXp} xp`,
    });

    setPickedItemId(itemId);
    setPickedItemKey(itemKey);
  };

  const handleModalSubmit = async () => {
    const requestBody = {
      assignedChestId: currentOpeningChestModalData.details.id,
      itemId:
        currentOpeningChestModalData.base.behavior === ChestBehaviors.ALL
          ? null
          : pickedItemId,
    };

    await pickChestItemsMutation.mutateAsync(requestBody);

    const updatedChest =
      queryClient
        .getQueryData<
          EquipmentChestResponseDTO[]
        >(["equipmentChests", courseId, userId])
        ?.find(
          (chest) =>
            chest.details.id === currentOpeningChestModalData.details.id
        ) ?? null;

    if (!updatedChest) {
      toast.error("Nie udało się pobrać danych o nowo otwartej skrzynce");
      return;
    }

    setCurrentChestModalData(updatedChest);
    closeModal();
  };

  const getItemKey = (index: number, item: BaseItem) => {
    let indexInGroup = 0;
    for (let i = 0; i < index; i++) {
      if (currentOpeningChestModalData.base.chestItems[i].id === item.id) {
        indexInGroup++;
      }
    }
    return `${item.id}_${indexInGroup}`;
  };

  return (
    <>
      <div className="opening-chest-modal-summary">
        <XPCard title={xp.gain} subtitle="ZYSK" size="xs" color="sky" />
        <span>−</span>
        <XPCard title={xp.loss} subtitle="STRATA" size="xs" color="sky" />
        <span>=</span>
        <XPCard title={xp.sum} subtitle="SUMA" size="xs" color="green" />
      </div>
      <div className="opening-chest-modal">
        {currentOpeningChestModalData.base.chestItems.map(
          (item: BaseItem, index: number) => {
            const itemKey = getItemKey(index, item);
            const itemDetails =
              chestPotentialXp.potentialXp.itemDetails[itemKey];

            const subtitleLimitReachedText = isSm
              ? item.shortBonusText
              : item.bonusText;

            const subtitleText = item.isLimitReached
              ? "Limit osiągnięty"
              : subtitleLimitReachedText;

            return (
              <div
                key={itemKey}
                className={clsx("opening-chest-modal-image-wrapper", {
                  "opening-chest-modal-image-selected":
                    pickedItemKey === itemKey,
                  "cursor-pointer":
                    currentOpeningChestModalData.base.behavior ===
                      ChestBehaviors.ONE_OF_MANY && !item.isLimitReached,
                })}
                onClick={() =>
                  handlePickItem(item.id, itemKey, item.isLimitReached)
                }
              >
                <XPCard
                  key={itemKey}
                  title={item.name}
                  subtitle={subtitleText}
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
        <h1 className="opening-chest-modal-footer-text">
          Bonusy są liczone względem obecnej punktacji. Otrzymanie nowej nagrody
          może osłabić działanie wcześniej zdobytych nagród. Całkowite XP jednak
          nigdy się nie zmniejszy.
        </h1>
      </div>
      <div className="opening-chest-modal-button-wrapper">
        <ButtonWithBorder
          text="Potwierdź"
          className="w-full rounded-xl"
          onClick={handleModalSubmit}
          isActive={
            pickedItemId !== null ||
            areAllItemsOverLimit ||
            currentOpeningChestModalData.base.behavior == ChestBehaviors.ALL
          }
        />
      </div>
    </>
  );
}
