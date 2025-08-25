"use client";

import Image from "next/image";
import { API_STATIC_URL } from "@/services/api";
import ImageBadge from "@/components/image-badge/ImageBadge";
import { RewardProps } from "@/components/grading/components/grade/types";
import AssignRewardModal from "@/components/grading/modals/assign-reward";
import { useState } from "react";
import { CriterionAssignableRewardResponseDTO } from "@/interfaces/api/grade";

export default function Reward({ criterion, criterionGrade }: RewardProps) {
  const [assignableRewards, setAssignableRewards] = useState<
    CriterionAssignableRewardResponseDTO[] | null
  >(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {criterionGrade.assignedRewards.map((assignedReward, index) => (
          <div
            key={index}
            className="relative w-full aspect-square rounded-xl shadow-sm  drop-shadow-xl overflow-hidden"
          >
            <div className="w-full h-full rounded-xl overflow-hidden">
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
                className="text-xl w-7 rounded-tl-lg rounded-br-lg"
              />
            </div>
          </div>
        ))}
        <div
          className="aspect-square border-3 border-primary-dark rounded-xl flex-col-centered hover:bg-primary-dark hover:text-secondary-gray cursor-pointer transition-colors duration-400 ease-[cubic-bezier(0.34,1,0.2,1)] hover:cursor-pointer"
          onClick={() => setAssignableRewards(criterion?.assignableRewards)}
        >
          <span className="material-symbols text-4xl">add</span>
        </div>
      </div>
      <AssignRewardModal
        assignableRewards={assignableRewards}
        onClosedAction={() => setAssignableRewards(null)}
      />
    </>
  );
}
