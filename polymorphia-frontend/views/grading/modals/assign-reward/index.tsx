import Modal from "@/components/modal/Modal";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardAssign from "@/components/xp-card/components/XPCardAssign";
import {
  AssignRewardModalContentProps,
  AssignRewardModalProps,
} from "@/views/grading/modals/assign-reward/types";
import { ChestResponseDTO, ItemResponseDTO } from "@/interfaces/api/reward";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";
import useGradingContext from "@/hooks/contexts/useGradingContext";
import { useEffect, useState } from "react";
import {
  GradingReducerActions,
  GradingReducerState,
} from "@/providers/grading/reducer/types";
import useModalContext from "@/hooks/contexts/useModalContext";
import { ShortAssignedRewardResponseDTO } from "@/interfaces/api/grade/grade";
import { CriteriaDetailsRequestDTO } from "@/interfaces/api/grade/criteria";

function AssignRewardModalContent({
  criterionId,
  assignableRewards,
}: AssignRewardModalContentProps) {
  const { closeModal } = useModalContext();
  const { state, dispatch } = useGradingContext();
  const [localState, setLocalState] = useState<GradingReducerState>({
    ...state,
  });

  useEffect(() => {
    if (state.criteria?.[criterionId]) {
      setLocalState(state);
    }
  }, [state, criterionId]);

  const updateAssignedAmount = (rewardId: number, value: number): void => {
    setLocalState((prev) => {
      const criteria = prev.criteria ?? {};
      const criterion: CriteriaDetailsRequestDTO = criteria[criterionId] ?? {
        gainedXp: "0",
        assignedRewards: [],
      };

      const rewardData = assignableRewards?.find(
        (pr) => pr.assignableReward.reward.id === rewardId
      );

      if (!rewardData) return prev;

      const { reward } = rewardData.assignableReward;
      const existing = criterion.assignedRewards.find(
        (reward) => reward.rewardId === rewardId
      );

      let updatedAssignedRewards: ShortAssignedRewardResponseDTO[];

      if (existing) {
        updatedAssignedRewards = criterion.assignedRewards.map((reward) =>
          reward.rewardId === rewardId ? { ...reward, quantity: value } : reward
        );
      } else {
        updatedAssignedRewards = [
          ...criterion.assignedRewards,
          {
            rewardId,
            name: reward.name,
            imageUrl: reward.imageUrl,
            quantity: value,
          },
        ];
      }

      return {
        ...prev,
        criteria: {
          ...criteria,
          [criterionId]: {
            ...criterion,
            assignedRewards: updatedAssignedRewards,
          },
        },
      };
    });
  };
  const handleAssign = (): void => {
    dispatch({
      type: GradingReducerActions.UPDATE_GRADE,
      payload: {
        criteria: localState.criteria,
        comment: localState.comment,
      },
    });
  };

  return (
    <>
      {!assignableRewards || assignableRewards.length < 1 ? (
        <div className="assign-reward">
          <p>Brak dostępnych nagród do przypisania.</p>
        </div>
      ) : (
        <div className="assign-reward">
          {assignableRewards.map((possibleReward) => {
            const {
              maxAmount,
              assignableReward: { reward: rewardData, rewardType },
            } = possibleReward;

            const rewardId = rewardData.id;
            const currentQuantity =
              localState.criteria[criterionId]?.assignedRewards?.find(
                (reward) => reward.rewardId === rewardId
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
              onClick={() => {
                handleAssign();
                closeModal();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function AssignRewardModal({
  criterionId,
  assignableRewards,
  onClosedAction,
}: AssignRewardModalProps) {
  return (
    <Modal
      isDataPresented={!!assignableRewards}
      onClosed={onClosedAction}
      title="Przypisz nagrody"
    >
      <AssignRewardModalContent
        criterionId={criterionId}
        assignableRewards={assignableRewards}
        onClosedAction={onClosedAction}
      />
    </Modal>
  );
}
