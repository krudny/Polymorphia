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

export const Roles = {
  STUDENT: "STUDENT",
  INSTRUCTOR: "INSTRUCTOR",
  COORDINATOR: "COORDINATOR",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const ImportCSVTypes = {
    GRADE_IMPORT: "GRADE_IMPORT",
    STUDENT_INVITE: "STUDENT_INVITE",
} as const;

export type ImportCSVType =
    (typeof ImportCSVTypes)[keyof typeof ImportCSVTypes];

export const MarkdownTypes = {
    COURSE_RULES: "COURSE_RULES",
    GRADABLE_EVENT: "GRADABLE_EVENT",
} as const;

export type MarkdownType = (typeof MarkdownTypes)[keyof typeof MarkdownTypes];