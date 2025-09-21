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
  ASSIGNMENT_MARKDOWN_STUDENT: 'ASSIGNMENT_MARKDOWN_STUDENT',
  ASSIGNMENT_MARKDOWN_INSTRUCTOR: 'ASSIGNMENT_MARKDOWN_INSTRUCTOR',
  PROJECT_MARKDOWN_STUDENT: 'PROJECT_MARKDOWN_STUDENT',
  PROJECT_MARKDOWN_INSTRUCTOR: 'PROJECT_MARKDOWN_INSTRUCTOR',
  TEST_GRADING_INSTRUCTOR: 'TEST_GRADING_INSTRUCTOR',
  ASSIGNMENT_GRADING_INSTRUCTOR: 'ASSIGNMENT_GRADING_INSTRUCTOR',
  PROJECT_GRADING_INSTRUCTOR: 'PROJECT_GRADING_INSTRUCTOR',
} as const;

export type SpeedDialKey = (typeof SpeedDialKeys)[keyof typeof SpeedDialKeys]
