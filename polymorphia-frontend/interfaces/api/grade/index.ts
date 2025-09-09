import { RewardResponseDTO } from "../reward";
import { AssignedRewardResponseDTO } from "../reward/assigned";

// TODO: to sie zwraca jak jest ocena
export interface GradeResponseDTO {
  details: GradeDetailsResponseDTO;
  criteria: CriterionGradeResponseDTO[];
}

export interface ShortGradeResponseDTO {
  comment: string;
  criteria: {
    id: number;
    gainedXp: number;
    assignedRewards: {
      id: number;
      quantity: number;
      imageUrl: string;
    }[];
  }[];
}

export interface GradeDetailsResponseDTO {
  id: number;
  comment: string;
}

export interface CriterionResponseDTO {
  id: number;
  name: string;
  maxXp: string;
  assignableRewards: CriterionAssignableRewardResponseDTO[];
  criterionGrade?: CriterionGradeResponseDTO; // TODO: to do usuniecia
}

export interface CriterionAssignableRewardResponseDTO {
  assignableReward: RewardResponseDTO;
  maxAmount: number;
}

export interface CriterionGradeResponseDTO {
  id: number;
  gainedXp: string;
  assignedRewards: AssignedRewardResponseDTO[];
}
