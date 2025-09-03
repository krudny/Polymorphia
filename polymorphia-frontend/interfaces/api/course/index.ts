export const EventTypes = {
  ASSIGNMENT: "ASSIGNMENT",
  PROJECT: "PROJECT",
  TEST: "TEST",
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];

export const GradingTypes = {
  TEST_GRADING: "TEST-GRADING",
  ASSIGNMENT_GRADING: "ASSIGNMENT-GRADING",
  PROJECT_GRADING: "PROJECT-GRADING",
} as const;

export type GradingType = (typeof GradingTypes)[keyof typeof GradingTypes];

export const ViewTypes = {
  CARD_GRID: "CARD_GRID",
  MARKDOWN: "MARKDOWN",
  GRADING: "GRADING",
};

export type ViewType = (typeof ViewTypes)[keyof typeof ViewTypes];

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
