import { ReactNode } from "react";

export type UseSpeedDialItemDynamicBehaviorHook =
  () => SpeedDialItemDynamicBehavior;

export type SpeedDialItemDynamicBehavior = {
  onClick?: () => void;
  modal?: (onClose: () => void) => ReactNode;
  shouldBeRendered?: boolean; // defaults to `true`
};

export interface SpeedDialItem {
  id: number;
  orderIndex: number;
  label: string;
  icon: string;
  useDynamicBehavior: UseSpeedDialItemDynamicBehaviorHook;
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
  PROFILE_STUDENT: "PROFILE_STUDENT",
} as const;

export type SpeedDialKey = (typeof SpeedDialKeys)[keyof typeof SpeedDialKeys];
