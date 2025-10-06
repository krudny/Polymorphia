import { RewardResponseDTO } from "@/interfaces/api/reward";
import { ShortAssignedRewardResponseDTO } from "@/interfaces/api/grade/grade";

export interface CriterionResponseDTO {
  id: number;
  name: string;
  maxXp: string;
  assignableRewards: CriterionAssignableRewardResponseDTO[];
}

export interface CriterionAssignableRewardResponseDTO {
  assignableReward: RewardResponseDTO;
  maxAmount: number;
}

export interface CriterionGradeResponseDTO<AssignedRewardType> {
  id: number;
  gainedXp?: string;
  assignedRewards: AssignedRewardType[];
}

export type CriteriaDetailsRequestDTO = Omit<
  CriterionGradeResponseDTO<ShortAssignedRewardResponseDTO>,
  "id"
>;
