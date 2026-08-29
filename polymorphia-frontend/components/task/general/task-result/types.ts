export const TaskTab = {
  TESTCASES: "testcases",
  SUBMISSION_RESULT: "submissionResult",
} as const;

export type TaskTab = (typeof TaskTab)[keyof typeof TaskTab];
