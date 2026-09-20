export const SupportedLanguages = {
  JAVASCRIPT: "JAVASCRIPT",
  PYTHON: "PYTHON",
  JAVA: "JAVA",
  CPP: "CPP",
  C: "C",
  CSHARP: "CSHARP",
  PLAINTEXT: "PLAINTEXT",
} as const;

export type SupportedLanguage =
  (typeof SupportedLanguages)[keyof typeof SupportedLanguages];

export interface TaskDetailsResponseDTO {
  allowedLanguages: TaskAllowedLanguageDTO[];
  testCases: TaskTestCaseDTO[];
}

export interface TaskAllowedLanguageDTO {
  taskLanguage: SupportedLanguage;
  isDefault: boolean;
  sampleCode: string;
}

export interface TaskTestCaseDTO {
  name: string;
  orderIndex: number;
  input: string;
  expectedOutput: string;
}

export const ExecutionModes = {
  RANDOM: "RANDOM",
  PLAIN_PROCESS: "PLAIN_PROCESS",
  DOCKER: "DOCKER",
} as const;

export type ExecutionMode =
  (typeof ExecutionModes)[keyof typeof ExecutionModes];

export const ExecutionModeLabels: Record<ExecutionMode, string> = {
  [ExecutionModes.RANDOM]: "LOSOWE",
  [ExecutionModes.PLAIN_PROCESS]: "PROCES",
  [ExecutionModes.DOCKER]: "DOCKER",
};

export const ExecutionModeResultLabels: Record<ExecutionMode, string> = {
  [ExecutionModes.RANDOM]: "Losowe",
  [ExecutionModes.PLAIN_PROCESS]: "Proces",
  [ExecutionModes.DOCKER]: "Docker",
};

export interface ExecuteRequestDTO {
  taskLanguage: SupportedLanguage;
  sourceCode: string;
  executionMode: ExecutionMode;
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
  executionMode: ExecutionMode;
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
