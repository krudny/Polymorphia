import { createContext, useReducer, useRef } from "react";
import type {
  TaskContextInterface,
  TaskProviderProps,
  MonacoEditor,
} from "@/providers/task/types";
import { TaskTab } from "@/providers/task/types";
import useTaskDetails from "@/hooks/course/tasks/useTaskDetails";
import useExecutionModes from "@/hooks/course/tasks/useExecutionModes";
import useRunTask from "@/hooks/course/tasks/useRunTask";
import useSubmitTask from "@/hooks/course/tasks/useSubmitTask";
import useTaskStatus from "@/hooks/course/tasks/useTaskStatus";
import type { SupportedLanguage } from "@/interfaces/api/tasks/types";
import { ExecutionModeLabels } from "@/interfaces/api/tasks/types";
import { taskReducer, initialTaskState } from "@/providers/task/reducer";
import { TaskActions } from "@/providers/task/reducer/types";
import type { SelectorOption } from "@/components/selector/types";
import Loading from "@/components/loading";
import ErrorComponent from "@/components/error";
import toast from "react-hot-toast";

export const TaskContext = createContext<TaskContextInterface | undefined>(
  undefined
);

export const TaskProvider = ({ children, taskId }: TaskProviderProps) => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const editorRef = useRef<MonacoEditor | null>(null);

  const {
    data: taskDetails,
    isLoading: isTaskDetailsLoading,
    isError: isTaskDetailsError,
  } = useTaskDetails(taskId);

  const {
    data: executionModesData,
    isLoading: isExecutionModesLoading,
    isError: isExecutionModesError,
  } = useExecutionModes();

  const {
    mutate: runTask,
    reset: resetRunTask,
    results: runResults,
    resultsByOrderIndex,
    isPending: isRunTaskPending,
    isError: isRunTaskError,
  } = useRunTask(taskId);

  const {
    mutateAsync: submitTask,
    reset: resetSubmitTask,
    isPending: isSubmitTaskPending,
    data: submitTaskData,
  } = useSubmitTask(taskId);

  const activeSubmissionId = submitTaskData?.submissionId ?? null;

  const {
    submissionStatus,
    isSubmissionProcessing,
    isSubmissionAccepted,
    isError: isTaskStatusError,
  } = useTaskStatus(taskId, activeSubmissionId);

  const hasSubmission = isSubmitTaskPending || activeSubmissionId !== null;
  const isSubmitting = isSubmitTaskPending || isSubmissionProcessing;

  if (isTaskDetailsLoading || isExecutionModesLoading) {
    return <Loading />;
  }

  if (
    isTaskDetailsError ||
    isExecutionModesError ||
    !taskDetails ||
    !executionModesData
  ) {
    return <ErrorComponent message="Nie udało się załadować zadania." />;
  }

  const language: SupportedLanguage =
    state.language ?? taskDetails.defaultLanguage;
  const sampleCode = taskDetails.languages.get(language)?.sampleCode ?? "";
  const allowedLanguages: SelectorOption[] = Array.from(
    taskDetails.languages.keys()
  ).map((languageOption) => ({
    value: languageOption,
    label: languageOption,
  }));

  const executionModes: SelectorOption[] = executionModesData.map((mode) => ({
    value: mode,
    label: ExecutionModeLabels[mode] ?? mode,
  }));

  const testCases = taskDetails.testCases;
  const activeTestCase = testCases[state.activeTestCaseIndex];
  const activeResult = resultsByOrderIndex.get(
    activeTestCase?.orderIndex ?? -1
  );

  const handleRunTask = () => {
    const code = editorRef.current?.getValue() ?? "";
    if (!code) {
      return;
    }
    resetSubmitTask();
    dispatch({
      type: TaskActions.SET_ACTIVE_TAB,
      payload: TaskTab.TESTCASES,
    });
    runTask({
      taskLanguage: language,
      sourceCode: code,
      executionMode: state.selectedExecutionMode,
    });
  };

  const handleSubmitTask = async () => {
    const code = editorRef.current?.getValue() ?? "";
    if (!code) {
      return;
    }
    resetRunTask();
    dispatch({
      type: TaskActions.SET_ACTIVE_TAB,
      payload: TaskTab.SUBMISSION_RESULT,
    });
    try {
      await submitTask({
        taskLanguage: language,
        sourceCode: code,
        executionMode: state.selectedExecutionMode,
      });
    } catch (error) {
      toast.error("Nie udało się wysłać zgłoszenia");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        editorRef,
        language,
        allowedLanguages,
        selectedExecutionMode: state.selectedExecutionMode,
        executionModes,
        sampleCode,
        runResults,
        activeTestCaseIndex: state.activeTestCaseIndex,
        activeTestCase,
        activeResult,
        resultsByOrderIndex,
        testCases,
        activeTab: state.activeTab,
        dispatch,
        submissionStatus,
        hasSubmission,
        isSubmitting,
        isSubmissionAccepted,
        isRunTaskPending,
        isRunTaskError,
        isSubmitTaskPending,
        isTaskStatusError,
        handleSubmitTask,
        handleRunTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
