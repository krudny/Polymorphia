import type {
  ExecutionMode,
  SupportedLanguage,
} from "@/interfaces/api/tasks/types";
import type { TaskTab } from "@/providers/task/types";

export const TaskActions = {
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_SELECTED_EXECUTION_MODE: "SET_SELECTED_EXECUTION_MODE",
  SET_ACTIVE_TEST_CASE_INDEX: "SET_ACTIVE_TEST_CASE_INDEX",
  SET_ACTIVE_TAB: "SET_ACTIVE_TAB",
} as const;

export interface TaskState {
  language: SupportedLanguage | null;
  selectedExecutionMode: ExecutionMode;
  activeTestCaseIndex: number;
  activeTab: TaskTab;
}

export type TaskAction =
  | {
      type: typeof TaskActions.SET_LANGUAGE;
      payload: SupportedLanguage;
    }
  | {
      type: typeof TaskActions.SET_SELECTED_EXECUTION_MODE;
      payload: ExecutionMode;
    }
  | {
      type: typeof TaskActions.SET_ACTIVE_TEST_CASE_INDEX;
      payload: number;
    }
  | {
      type: typeof TaskActions.SET_ACTIVE_TAB;
      payload: TaskTab;
    };
