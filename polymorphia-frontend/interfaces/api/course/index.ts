export const EventTypes = {
  ASSIGNMENT: "ASSIGNMENT",
  PROJECT: "PROJECT",
  TEST: "TEST",
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];

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
}

export interface StudentGradableEventResponseDTO
  extends BaseGradableEventResponseDTO {
  gainedXp?: string;
  hasReward: boolean;
  isLocked: boolean;
}

export interface InstructorGradableEventResponseDTO
  extends BaseGradableEventResponseDTO {
  ungradedStudents: number;
}
