import {ReactNode} from "react";

export interface SpeedDialItem {
  id: number;
  orderIndex: number;
  label: string;
  icon: string;
  modal?: (onClose: () => void) => ReactNode;
  onClick?: () => void;
  color?: string;
}

export interface SpeedDialProps {
  speedDialKey: SpeedDialKey;
}

export const SpeedDialKeys = {
  ASSIGNMENT_MARKDOWN: "ASSIGNMENT_MARKDOWN",
  PROJECT_MARKDOWN: "PROJECT_MARKDOWN",
  RULES_MARKDOWN: "RULES_MARKDOWN",
  TEST_GRADING: "TEST_GRADING",
  ASSIGNMENT_GRADING: "ASSIGNMENT_GRADING",
  PROJECT_GRADING: "PROJECT_GRADING",
  COURSE_GROUP: "COURSE_GROUP",
} as const;

export type SpeedDialKey = (typeof SpeedDialKeys)[keyof typeof SpeedDialKeys];
