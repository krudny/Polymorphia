export const EventTypes = {
  ASSIGNMENT: "ASSIGNMENT",
  PROJECT: "PROJECT",
  TEST: "TEST",
  OTHER: "OTHER",
} as const;

export type EventType = (typeof EventTypes)[keyof typeof EventTypes];

export const ViewTypes = {
  CARD_GRID: "CARD_GRID",
  MARKDOWN: "MARKDOWN",
  GRADING: "GRADING",
  PROFILE: "PROFILE",
};

export type ViewType = (typeof ViewTypes)[keyof typeof ViewTypes];
