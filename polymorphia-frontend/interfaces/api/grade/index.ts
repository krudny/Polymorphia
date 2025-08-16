import { RewardResponseDTO } from "../reward";
import { AssignedRewardResponseDTO } from "../reward/assigned";

export interface GradeResponseDTO {
  details?: GradeDetailsResponseDTO;
  criteria: CriterionResponseDTO[];
}

export interface GradeDetailsResponseDTO {
  id: number;
  comment?: string;
}

export interface CriterionResponseDTO {
  id: number;
  name: string;
  maxXp: string;
  assignableRewards: CriterionAssignableRewardResponseDTO[];
  criterionGrade?: CriterionGradeResponseDTO;
}

export interface CriterionAssignableRewardResponseDTO {
  reward: RewardResponseDTO;
  maxAmount: number;
}

export interface CriterionGradeResponseDTO {
  id: number;
  gainedXp: string;
  assignedRewards: AssignedRewardResponseDTO[];
}
