import { createContext, useState, useEffect, useRef } from "react";
import type {
  TaskContextInterface,
  TaskProviderProps,
  MonacoEditor,
} from "@/providers/task/types";
import { TaskTab } from "@/providers/task/types";
import useTaskDetails from "@/hooks/course/tasks/useTaskDetails";
import useRunTask from "@/hooks/course/tasks/useRunTask";
import useSubmitTask from "@/hooks/course/tasks/useSubmitTask";
import useTaskStatus from "@/hooks/course/tasks/useTaskStatus";
import {
  SupportedLanguages,
  type SupportedLanguage,
  TaskSubmissionStatus,
} from "@/interfaces/api/tasks/types";

export const TaskContext = createContext<TaskContextInterface | undefined>(
  undefined
);

export const TaskProvider = ({ children, taskId }: TaskProviderProps) => {
  const [language, setLanguage] = useState<SupportedLanguage>(
    SupportedLanguages.PLAINTEXT
  );
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<TaskTab>(TaskTab.TESTCASES);
  const [activeSubmissionId, setActiveSubmissionId] = useState<number | null>(
    null
  );

  const editorRef = useRef<MonacoEditor | null>(null);

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
      if (defaultLanguage && language === SupportedLanguages.PLAINTEXT) {
        setLanguage(defaultLanguage);
      } else if (language === SupportedLanguages.PLAINTEXT) {
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

  const handleRunTask = (codeProp?: string) => {
    const code = codeProp ?? editorRef.current?.getValue() ?? "";
    if (!code) {
      return;
    }
    setActiveTab(TaskTab.TESTCASES);
    mutate({ taskLanguage: language, sourceCode: code });
  };

  const handleSubmitTask = async (codeProp?: string) => {
    const code = codeProp ?? editorRef.current?.getValue() ?? "";
    if (!code) {
      return;
    }
    try {
      const response = await submitTaskMutate({
        taskLanguage: language,
        sourceCode: code,
      });
      setActiveSubmissionId(response.submissionId);
    } catch {}
  };

  const isLoading = isDetailsLoading;

  return (
    <TaskContext.Provider
      value={{
        editorRef,
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
