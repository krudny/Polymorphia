"use client";

import Image from "next/image";
import { API_STATIC_URL } from "@/services/api";
import ImageBadge from "@/components/image-badge/ImageBadge";
import { RewardProps } from "@/views/course/grading/components/grade/types";
import AssignRewardModal from "@/views/course/grading/modals/assign-reward";
import { useState } from "react";
import { CriterionAssignableRewardResponseDTO } from "@/interfaces/api/grade";

export default function AssignReward({
  criterion,
  criterionGrade,
}: RewardProps) {
  const [assignableRewards, setAssignableRewards] = useState<
    CriterionAssignableRewardResponseDTO[] | null
  >(null);

  return (
    <>
      <div className="assign-reward">
        {criterionGrade.assignedRewards.map((assignedReward, index) => (
          <div key={index} className="assign-reward-wrapper">
            <div className="assign-reward-image-wrapper">
              <Image
                src={`${API_STATIC_URL}/${assignedReward.imageUrl}`}
                alt="User profile"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 25vw, 50vw"
                onClick={() => {}}
              />
              <ImageBadge
                text={assignedReward.quantity.toString()}
                className="assign-reward-image-badge"
              />
            </div>
          </div>
        ))}
        <div
          className="assign-reward-add"
          onClick={() => setAssignableRewards(criterion?.assignableRewards)}
        >
          <span>add</span>
        </div>
      </div>
      <AssignRewardModal
        assignableRewards={assignableRewards}
        onClosedAction={() => setAssignableRewards(null)}
      />
    </>
  );
}
