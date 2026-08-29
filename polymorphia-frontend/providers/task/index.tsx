import { createContext, useState, useEffect } from "react";
import {
  TaskContextInterface,
  TaskProviderProps,
  TaskTab,
} from "@/providers/task/types";
import useTaskDetails from "@/hooks/course/tasks/useTaskDetails";
import useRunTask from "@/hooks/course/tasks/useRunTask";
import useSubmitTask from "@/hooks/course/tasks/useSubmitTask";
import useTaskStatus from "@/hooks/course/tasks/useTaskStatus";
import { TaskSubmissionStatus } from "@/interfaces/api/tasks/types";

export const TaskContext = createContext<TaskContextInterface | undefined>(
  undefined
);

export const TaskProvider = ({ children, taskId }: TaskProviderProps) => {
  const [language, setLanguage] = useState<string>("");
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<TaskTab>(TaskTab.TESTCASES);
  const [activeSubmissionId, setActiveSubmissionId] = useState<number | null>(
    null
  );

  const { data, isLoading: isDetailsLoading } = useTaskDetails(taskId);
  const { mutate, isPending, isError, data: runResponse } = useRunTask(taskId);
  const { mutateAsync: submitTaskMutate, isPending: submitIsPending } =
    useSubmitTask(taskId);
  const { submissionStatus } = useTaskStatus(taskId, activeSubmissionId);

  const runResults = runResponse?.results || null;

  useEffect(() => {
    if (data && data.allowedLanguages && data.allowedLanguages.length > 0) {
      const defaultLanguage = data.allowedLanguages.find(
        (allowedLanguage) => allowedLanguage.isDefault
      )?.taskLanguage;
      if (defaultLanguage && !language) {
        setLanguage(defaultLanguage);
      } else if (!language) {
        setLanguage(data.allowedLanguages[0].taskLanguage);
      }
    }
  }, [data, language]);

  useEffect(() => {
    if (!submissionStatus) {
      return;
    }
    const status = submissionStatus.status;
    if (
      status !== TaskSubmissionStatus.QUEUED &&
      status !== TaskSubmissionStatus.RUNNING
    ) {
      setActiveTab(TaskTab.SUBMISSION_RESULT);
    }
  }, [submissionStatus?.status]);

  const currentLanguageData = data?.allowedLanguages
    ? data.allowedLanguages.find(
        (allowedLanguage) => allowedLanguage.taskLanguage === language
      )
    : undefined;
  const sampleCode = currentLanguageData ? currentLanguageData.sampleCode : "";

  const allowedLanguages = data?.allowedLanguages
    ? data.allowedLanguages.map((allowedLanguage) => ({
        value: allowedLanguage.taskLanguage,
        label: allowedLanguage.taskLanguage,
      }))
    : [];

  const testCases = data?.testCases ? data.testCases : [];
  const activeTestCase = testCases[activeTestCaseIndex];
  const activeResult = runResults
    ? runResults.find(
        (result) =>
          result.orderIndex ===
          (activeTestCase ? activeTestCase.orderIndex : -1)
      ) || runResults[activeTestCaseIndex]
    : undefined;

  const isSubmitting =
    submitIsPending ||
    submissionStatus?.status === TaskSubmissionStatus.QUEUED ||
    submissionStatus?.status === TaskSubmissionStatus.RUNNING;

  const handleRunTask = (code: string) => {
    if (!code) {
      return;
    }
    setActiveTab(TaskTab.TESTCASES);
    mutate({ taskLanguage: language, sourceCode: code });
  };

  const handleSubmitTask = async (code: string) => {
    if (!code) {
      return;
    }
    try {
      const response = await submitTaskMutate({
        taskLanguage: language,
        sourceCode: code,
      });
      setActiveSubmissionId(response.submissionId);
    } catch {
      // błąd obsługiwany przez isSubmissionError z useTaskStatus
    }
  };

  const isLoading = isDetailsLoading;

  return (
    <TaskContext.Provider
      value={{
        language,
        setLanguage,
        sampleCode,
        isLoading,
        runResults,
        activeTestCaseIndex,
        setActiveTestCaseIndex,
        activeTestCase,
        activeResult,
        allowedLanguages,
        testCases,
        handleRunTask,
        isPending,
        isError,
        activeTab,
        setActiveTab,
        submissionStatus,
        isSubmitting,
        handleSubmitTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
