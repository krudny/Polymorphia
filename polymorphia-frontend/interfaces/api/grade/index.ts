import { RewardResponseDTO } from "../reward";

// Grade
export interface ShortAssignedRewardResponseDTO {
  id: number;
  imageUrl: string;
  quantity: number;
}

export interface GradeResponseDTO<AssignedRewardType> {
  id: number;
  comment: string;
  criteria: CriterionGradeResponseDTO<AssignedRewardType>[];
}

export type ShortGradeResponseDTO =
  GradeResponseDTO<ShortAssignedRewardResponseDTO>;

// export type FullGradeResponseDTO = GradeResponseDTO<AssignedRewardResponseDTO>;

// Criteria
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
  gainedXp: string;
  assignedRewards: AssignedRewardType[];
}

// GradingTarget
interface StudentTargetData {
  id: number;
  studentName: string;
  evolutionStage: string;
  group: string;
  imageUrl: string;
  gainedXp: string;
}

export interface StudentTargetResponseDTO extends StudentTargetData {
  type: "STUDENT";
}

export interface StudentGroupTargetResponseDTO {
  type: "STUDENT_GROUP";
  groupType: "MATCHING" | "DIVERGENT";
  groupId: number;
  members: StudentTargetData[];
}

export type TargetResponseDTO =
  | StudentTargetResponseDTO
  | StudentGroupTargetResponseDTO;
