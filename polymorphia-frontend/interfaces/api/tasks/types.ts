export interface TaskDetailsResponseDTO {
  allowedLanguages: TaskAllowedLanguageDTO[];
  testCases: TaskTestCaseDTO[];
}

export interface TaskAllowedLanguageDTO {
  taskLanguage: string;
  isDefault: boolean;
  sampleCode: string;
}

export interface TaskTestCaseDTO {
  name: string;
  orderIndex: number;
  input: string;
  expectedOutput: string;
}

export interface ExecuteRequestDTO {
  taskLanguage: string;
  sourceCode: string;
}

export interface ExecuteTaskResponseDTO {
  results: TestCaseResultDTO[];
}

export const TaskSubmissionStatus = {
  QUEUED: "QUEUED",
  RUNNING: "RUNNING",
  COMPLETED: "COMPLETED",
  COMPILE_ERROR: "COMPILE_ERROR",
  RUNTIME_ERROR: "RUNTIME_ERROR",
  TIMEOUT: "TIMEOUT",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type TaskSubmissionStatus =
  (typeof TaskSubmissionStatus)[keyof typeof TaskSubmissionStatus];

export interface TaskSubmissionStatusResponseDTO {
  submissionId: number;
  status: TaskSubmissionStatus;
  score?: number;
  passedCount?: number;
  totalCount?: number;
  totalExecutionTimeMs?: number;
  createdDate: string;
  visibleResults?: TestCaseResultDTO[];
  errorMessage?: string;
}

export interface TestCaseResultDTO {
  testCaseId: number;
  orderIndex: number;
  name: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  stderr: string;
  exitCode: number;
  executionTimeMs: number;
}

export interface SubmitTaskResponseDTO {
  submissionId: number;
  status: string;
}
