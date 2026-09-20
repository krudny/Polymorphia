import { TaskTab } from "@/providers/task/types";
import {
  TaskAction,
  TaskActions,
  TaskState,
} from "@/providers/task/reducer/types";
import { ExecutionModes } from "@/interfaces/api/tasks/types";

export const initialTaskState: TaskState = {
  language: null,
  selectedExecutionMode: ExecutionModes.RANDOM,
  activeTestCaseIndex: 0,
  activeTab: TaskTab.TESTCASES,
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case TaskActions.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case TaskActions.SET_SELECTED_EXECUTION_MODE:
      return {
        ...state,
        selectedExecutionMode: action.payload,
      };
    case TaskActions.SET_ACTIVE_TEST_CASE_INDEX:
      return {
        ...state,
        activeTestCaseIndex: action.payload,
      };
    case TaskActions.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload,
      };
    default:
      return state;
  }
};
