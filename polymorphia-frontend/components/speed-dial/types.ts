import { ReactNode } from "react";

export type UseSpeedDialItemActionHook = () => SpeedDialItemAction;

export type SpeedDialItemAction = {
  onClick?: () => void;
  modal?: (onClose: () => void) => ReactNode;
};

export interface SpeedDialItem {
  id: number;
  orderIndex: number;
  label: string;
  icon: string;
  useAction: UseSpeedDialItemActionHook;
  color?: string;
}

export interface SpeedDialProps {
  speedDialKey: SpeedDialKey;
}

export const SpeedDialKeys = {
  ASSIGNMENT_MARKDOWN_STUDENT: "ASSIGNMENT_MARKDOWN_STUDENT",
  ASSIGNMENT_MARKDOWN_INSTRUCTOR: "ASSIGNMENT_MARKDOWN_INSTRUCTOR",
  PROJECT_MARKDOWN_STUDENT: "PROJECT_MARKDOWN_STUDENT",
  PROJECT_MARKDOWN_INSTRUCTOR: "PROJECT_MARKDOWN_INSTRUCTOR",
  TEST_GRADING_INSTRUCTOR: "TEST_GRADING_INSTRUCTOR",
  ASSIGNMENT_GRADING_INSTRUCTOR: "ASSIGNMENT_GRADING_INSTRUCTOR",
  PROJECT_GRADING_INSTRUCTOR: "PROJECT_GRADING_INSTRUCTOR",
  COURSE_GROUP_INSTRUCTOR: "COURSE_GROUP_INSTRUCTOR",
} as const;

export type SpeedDialKey = (typeof SpeedDialKeys)[keyof typeof SpeedDialKeys];
