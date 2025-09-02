"use client";
import Modal from "@/components/modal/Modal";
import { useState } from "react";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardAssign from "@/components/xp-card/components/XPCardAssign";
import { AssignRewardModalProps } from "@/views/course/grading/modals/assign-reward/types";
import { ChestResponseDTO, ItemResponseDTO } from "@/interfaces/api/reward";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import "./index.css";

export default function AssignRewardModal({
  assignableRewards,
  onClosedAction,
}: AssignRewardModalProps) {
  // const { state, dispatch } = useContext(GradingContext);

  const [assignedItems, setAssignedItems] = useState<Record<number, number>>(
    {}
  );

  const handleAssign = () => {
    // dispatch({
    //   type: "UPDATE_ASSIGNED_REWARDS",
    //   payload: { assignedItems },
    // });
  };

  const updateAssignedAmount = (rewardId: number, amount: number) => {
    setAssignedItems((prev) => ({
      ...prev,
      [rewardId]: amount,
    }));
  };

  return (
    <Modal
      isDataPresented={!!assignableRewards}
      onClosed={onClosedAction}
      title="Przypisz nagrody"
    >
      <div className="assign-reward">
        {assignableRewards?.map((possibleReward, index) => {
          const {
            maxAmount,
            assignableReward: { reward: rewardData, rewardType },
          } = possibleReward;

          const rewardId = rewardData.id;
          const currentAssigned = assignedItems[rewardId] || 0;

          const subtitle =
            rewardType === "ITEM"
              ? (rewardData as ItemResponseDTO).bonusText
              : (rewardData as ChestResponseDTO).chestItems
                  .map((item) => item.name)
                  .join(" | ");

          return (
            <XPCard
              key={index}
              title={rewardData.name}
              subtitle={subtitle}
              size="xs"
              leftComponent={
                <XPCardImage imageUrl={`${rewardData.imageUrl}`} alt={""} />
              }
              rightComponent={
                <XPCardAssign
                  currentAssigned={currentAssigned}
                  maxAssigned={maxAmount}
                  increment={() =>
                    updateAssignedAmount(
                      rewardId,
                      Math.min(currentAssigned + 1, maxAmount)
                    )
                  }
                  decrement={() =>
                    updateAssignedAmount(
                      rewardId,
                      Math.max(currentAssigned - 1, 0)
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
