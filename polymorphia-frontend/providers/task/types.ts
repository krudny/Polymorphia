import type { Dispatch, SetStateAction, ReactNode, RefObject } from "react";
import type {
  TaskTestCaseDTO,
  TestCaseResultDTO,
  TaskSubmissionStatusResponseDTO,
  SupportedLanguage,
} from "@/interfaces/api/tasks/types";
import type { SelectorOption } from "@/components/selector/types";
import type { editor } from "monaco-editor";

export type MonacoEditor = editor.IStandaloneCodeEditor;

export const TaskTab = {
  TESTCASES: "testcases",
  SUBMISSION_RESULT: "submissionResult",
} as const;

export type TaskTab = (typeof TaskTab)[keyof typeof TaskTab];

export interface TaskContextInterface {
  editorRef: RefObject<MonacoEditor | null>;
  language: SupportedLanguage;
  setLanguage: Dispatch<SetStateAction<SupportedLanguage>>;
  sampleCode: string;
  isLoading: boolean;
  runResults: TestCaseResultDTO[] | null;
  activeTestCaseIndex: number;
  setActiveTestCaseIndex: Dispatch<SetStateAction<number>>;
  activeTestCase: TaskTestCaseDTO | undefined;
  activeResult: TestCaseResultDTO | undefined;
  allowedLanguages: SelectorOption[];
  testCases: TaskTestCaseDTO[];
  handleRunTask: (code?: string) => void;
  isPending: boolean;
  isError: boolean;
  activeTab: TaskTab;
  setActiveTab: Dispatch<SetStateAction<TaskTab>>;
  submissionStatus: TaskSubmissionStatusResponseDTO | undefined;
  isSubmitting: boolean;
  handleSubmitTask: (code?: string) => void;
}

export interface TaskProviderProps {
  children: ReactNode;
  taskId: number;
}
