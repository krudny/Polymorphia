export type GradableEventDTO =
  | BaseGradableEventResponseDTO
  | StudentGradableEventResponseDTO
  | InstructorGradableEventResponseDTO;

export interface BaseGradableEventResponseDTO {
  id: number;
  name: string;
  topic?: string;
  orderIndex: number;
  roadMapOrderIndex?: number;
  isLocked: boolean;
}

export interface StudentGradableEventResponseDTO
  extends BaseGradableEventResponseDTO {
  gainedXp: string;
  hasPossibleReward: boolean;
  isGraded: boolean;
  isRewardAssigned: boolean;
}

export interface InstructorGradableEventResponseDTO
  extends BaseGradableEventResponseDTO {
  ungradedStudents: number;
  isLocked: boolean;
  hasPossibleReward: boolean;
}
