import { createContext, useState, useEffect } from "react";
import {
  TaskContextInterface,
  TaskProviderProps,
} from "@/providers/task/types";
import useTaskDetails from "@/hooks/course/tasks/useTaskDetails";
import useRunTask from "@/hooks/course/tasks/useRunTask";
import TaskService from "@/services/tasks";
import { TaskSubmissionStatusResponseDTO } from "@/interfaces/api/tasks/types";

export const TaskContext = createContext<TaskContextInterface | undefined>(
  undefined
);

import useSubmitTask from "@/hooks/course/tasks/useSubmitTask";

export const TaskProvider = ({ children, taskId }: TaskProviderProps) => {
  const [language, setLanguage] = useState<string>("");
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"testcases" | "submissionResult">(
    "testcases"
  );
  const [submissionStatus, setSubmissionStatus] =
    useState<TaskSubmissionStatusResponseDTO | null>(null);
  const [activeSubmissionId, setActiveSubmissionId] = useState<number | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data, isLoading: isDetailsLoading } = useTaskDetails(taskId);
  const { mutate, isPending, isError, data: runResponse } = useRunTask(taskId);
  const runResults = runResponse?.results || null;
  const { mutateAsync: submitTaskMutate } = useSubmitTask(taskId);

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
    if (!activeSubmissionId) {
      return;
    }

    const isPendingStatus =
      !submissionStatus ||
      submissionStatus.status === "QUEUED" ||
      submissionStatus.status === "RUNNING";

    if (!isPendingStatus) {
      setIsSubmitting(false);
      return;
    }

    const intervalId = setInterval(async () => {
      try {
        const response = await TaskService.getSubmissionStatus(
          taskId,
          activeSubmissionId
        );
        setSubmissionStatus(response);
        if (response.status !== "QUEUED" && response.status !== "RUNNING") {
          setIsSubmitting(false);
        }
      } catch (error) {
        setIsSubmitting(false);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [activeSubmissionId, submissionStatus, taskId]);

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

  const handleRunTask = (code: string) => {
    if (!code) {
      return;
    }
    setActiveTab("testcases");
    mutate({ taskLanguage: language, sourceCode: code });
  };

  const handleSubmitTask = async (code: string) => {
    if (!code) {
      return;
    }
    setIsSubmitting(true);
    setActiveTab("submissionResult");
    try {
      const response = await submitTaskMutate({
        taskLanguage: language,
        sourceCode: code,
      });
      setActiveSubmissionId(response.submissionId);
      setSubmissionStatus({
        submissionId: response.submissionId,
        status: response.status,
        score: null,
        passedCount: null,
        totalCount: null,
        totalExecutionTimeMs: null,
        createdDate: null,
      });
    } catch (error) {
      setIsSubmitting(false);
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
