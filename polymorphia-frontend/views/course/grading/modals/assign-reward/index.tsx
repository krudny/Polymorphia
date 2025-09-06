"use client";
import Modal from "@/components/modal/Modal";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardAssign from "@/components/xp-card/components/XPCardAssign";
import { AssignRewardModalProps } from "@/views/course/grading/modals/assign-reward/types";
import { ChestResponseDTO, ItemResponseDTO } from "@/interfaces/api/reward";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { GradingReducerActions } from "@/providers/grading/GradingContext";
import { useEffect, useState } from "react";

export default function AssignRewardModal({
  criterionId,
  assignableRewards,
  onClosedAction,
}: AssignRewardModalProps) {
  const { state, dispatch } = useGradingContext();

  const [localState, setLocalState] = useState({
    criteria: { ...state.criteria },
    comment: state.comment,
  });

  useEffect(() => {
    console.log("local state", localState);
  }, [localState]);

  const handleAssign = () => {
    dispatch({
      type: GradingReducerActions.UPDATE_GRADE,
      payload: {
        criteria: localState.criteria,
        comment: localState.comment,
      },
    });
    onClosedAction();
  };

  const updateAssignedAmount = (rewardId: number, value: number) => {
    setLocalState((prev) => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        [criterionId]: {
          ...prev.criteria[criterionId],
          assignedRewards: prev.criteria[criterionId].assignedRewards.map(
            (reward) =>
              reward.id === rewardId ? { ...reward, quantity: value } : reward
          ),
        },
      },
    }));
  };
  
  if (!assignableRewards?.length) {
    return (
      <Modal
        isDataPresented={!!assignableRewards?.length}
        onClosed={onClosedAction}
        title="Przypisz nagrody"
      >
        <div className="assign-reward">
          <p>Brak dostępnych nagród do przypisania.</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isDataPresented={!!assignableRewards}
      onClosed={onClosedAction}
      title="Przypisz nagrody"
    >
      <div className="assign-reward">
        {assignableRewards.map((possibleReward) => {
          const {
            maxAmount,
            assignableReward: { reward: rewardData, rewardType },
          } = possibleReward;

          const rewardId = rewardData.id;
          const currentQuantity =
            localState.criteria[criterionId].assignedRewards.find(
              (reward) => reward.id === rewardId
            )?.quantity ?? 0;

          const subtitle =
            rewardType === "ITEM"
              ? (rewardData as ItemResponseDTO).bonusText
              : (rewardData as ChestResponseDTO).chestItems
                  .map((item) => item.name)
                  .join(" | ");

          return (
            <XPCard
              key={rewardId}
              title={rewardData.name}
              subtitle={subtitle}
              size="xs"
              leftComponent={
                <XPCardImage
                  imageUrl={rewardData.imageUrl}
                  alt={rewardData.name}
                />
              }
              rightComponent={
                <XPCardAssign
                  currentAssigned={currentQuantity}
                  maxAssigned={maxAmount}
                  increment={() =>
                    updateAssignedAmount(
                      rewardId,
                      Math.min(currentQuantity + 1, maxAmount)
                    )
                  }
                  decrement={() =>
                    updateAssignedAmount(
                      rewardId,
                      Math.max(currentQuantity - 1, 0)
                    )
                  }
                  color="gray"
                />
              }
            />
          );
        })}

        <div className="assign-reward-button-wrapper">
          <ButtonWithBorder
            text="Przypisz"
            className="w-full !border-3 !rounded-md"
            onClick={handleAssign}
          />
        </div>
      </div>
    </Modal>
  );
}