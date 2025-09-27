import { useRouter } from "next/navigation";

export type AppRouterInstance = ReturnType<typeof useRouter>;

export const EventTypes = {
  ASSIGNMENT: "ASSIGNMENT",
  PROJECT: "PROJECT",
  TEST: "TEST",
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];

export const ViewTypes = {
  CARD_GRID: "CARD_GRID",
  MARKDOWN: "MARKDOWN",
  GRADING: "GRADING",
  COURSE_GROUP: "COURSE_GROUP",
};

export type ViewType = (typeof ViewTypes)[keyof typeof ViewTypes];

export const ImportCSVTypes = {
  GRADE_IMPORT: "GRADE_IMPORT",
  STUDENT_INVITE: "STUDENT_INVITE",
} as const;

export type ImportCSVType =
  (typeof ImportCSVTypes)[keyof typeof ImportCSVTypes];
