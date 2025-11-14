import { EventType } from "@/interfaces/general";

export interface EventSectionResponseDTO {
  id: number;
  type: EventType;
  name: string;
  orderIndex: number;
}

export interface BaseGradableEventResponseDTO {
  id: number;
  type: EventType;
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
