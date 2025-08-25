import { ReactNode } from "react";

export interface GradingProps {
  gradingType: GradingType;
  columns: number;
}

export const GradingTypes = {
  TEST_GRADING: "test-grading",
  ASSIGNMENT_GRADING: "assignment-grading",
  PROJECT_GRADING: "project-grading",
} as const;

export type GradingType = (typeof GradingTypes)[keyof typeof GradingTypes];

export interface GradingStrategy {
  getGradingComponents: () => ReactNode[];
}
