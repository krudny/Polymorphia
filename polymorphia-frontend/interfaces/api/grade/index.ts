import { RewardResponseDTO } from "../reward";

// Grade
export interface ShortAssignedRewardResponseDTO {
  id: number;
  name: string;
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

export interface GradeRequestDTO {
  target: TargetRequestDTO;
  gradableEventId: number;
  criteria: Record<number, CriteriaDetailsRequestDTO>;
  comment: string;
}

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
  gainedXp?: string;
  assignedRewards: AssignedRewardType[];
}

export type CriteriaDetailsRequestDTO = Omit<
  CriterionGradeResponseDTO<ShortAssignedRewardResponseDTO>,
  "id"
>;

// GradingTarget
export interface StudentTargetData {
  id: number;
  studentName: string;
  evolutionStage: string;
  group: string;
  imageUrl: string;
  gainedXp?: string;
}

export const TargetTypes = {
  STUDENT: "STUDENT",
  STUDENT_GROUP: "STUDENT_GROUP",
} as const;

export type TargetType = (typeof TargetTypes)[keyof typeof TargetTypes];

export const GroupTargetTypes = {
  MATCHING: "MATCHING",
  DIVERGENT: "DIVERGENT",
} as const;

export type GroupTargetType =
  (typeof GroupTargetTypes)[keyof typeof GroupTargetTypes];

export interface StudentTargetResponseDTO extends StudentTargetData {
  type: typeof TargetTypes.STUDENT;
}

export interface StudentGroupTargetResponseDTO {
  type: typeof TargetTypes.STUDENT_GROUP;
  groupType: GroupTargetType;
  groupId: number;
  members: StudentTargetData[];
}

export type TargetResponseDTO =
  | StudentTargetResponseDTO
  | StudentGroupTargetResponseDTO;

export type TargetRequestDTO =
  | { type: typeof TargetTypes.STUDENT; id: number }
  | { type: typeof TargetTypes.STUDENT_GROUP; groupId: number };
