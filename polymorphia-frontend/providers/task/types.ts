import { Dispatch, SetStateAction, ReactNode } from "react";
import {
  TaskTestCaseDTO,
  TestCaseResultDTO,
  TaskSubmissionStatusResponseDTO,
} from "@/interfaces/api/tasks/types";
import { SelectorOption } from "@/components/selector/types";

export const TaskTab = {
  TESTCASES: "testcases",
  SUBMISSION_RESULT: "submissionResult",
} as const;

export type TaskTab = (typeof TaskTab)[keyof typeof TaskTab];

export interface TaskContextInterface {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  sampleCode: string;
  isLoading: boolean;
  runResults: TestCaseResultDTO[] | null;
  activeTestCaseIndex: number;
  setActiveTestCaseIndex: Dispatch<SetStateAction<number>>;
  activeTestCase: TaskTestCaseDTO | undefined;
  activeResult: TestCaseResultDTO | undefined;
  allowedLanguages: SelectorOption[];
  testCases: TaskTestCaseDTO[];
  handleRunTask: (code: string) => void;
  isPending: boolean;
  isError: boolean;
  activeTab: TaskTab;
  setActiveTab: Dispatch<SetStateAction<TaskTab>>;
  submissionStatus: TaskSubmissionStatusResponseDTO | undefined;
  isSubmitting: boolean;
  handleSubmitTask: (code: string) => void;
}

export interface TaskProviderProps {
  children: ReactNode;
  taskId: number;
}
