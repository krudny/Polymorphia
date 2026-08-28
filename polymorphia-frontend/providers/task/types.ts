import { Dispatch, SetStateAction, ReactNode } from "react";
import {
  TaskTestCaseDTO,
  TestCaseResultDTO,
  TaskSubmissionStatusResponseDTO,
} from "@/interfaces/api/tasks/types";
import { SelectorOption } from "@/components/selector/types";

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
  activeTab: "testcases" | "submissionResult";
  setActiveTab: Dispatch<SetStateAction<"testcases" | "submissionResult">>;
  submissionStatus: TaskSubmissionStatusResponseDTO | null;
  isSubmitting: boolean;
  handleSubmitTask: (code: string) => void;
}

export interface TaskProviderProps {
  children: ReactNode;
  taskId: number;
}
