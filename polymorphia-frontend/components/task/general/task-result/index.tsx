"use client";

import "./index.css";
import ButtonWithBorder from "@/components/button";
import TaskTestCase from "@/components/task/general/task-test-case";
import { useTaskContext } from "@/hooks/contexts/useTaskContext";
import useUserContext from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";
import { TaskSubmissionStatus } from "@/interfaces/api/tasks/types";
import { TaskTab } from "./types";

const formatSubmissionDate = (
  isoDateString: string | null | undefined
): string => {
  if (!isoDateString) {
    return "";
  }
  const dateObject = new Date(isoDateString);
  const monthString = String(dateObject.getMonth() + 1).padStart(2, "0");
  const dayString = String(dateObject.getDate()).padStart(2, "0");
  const yearString = dateObject.getFullYear();
  const hoursString = String(dateObject.getHours()).padStart(2, "0");
  const minutesString = String(dateObject.getMinutes()).padStart(2, "0");
  return `${monthString}/${dayString}/${yearString} ${hoursString}:${minutesString}`;
};

export default function TaskResult() {
  const {
    runResults,
    activeTestCaseIndex,
    setActiveTestCaseIndex,
    activeTestCase,
    activeResult,
    testCases,
    isPending,
    activeTab,
    setActiveTab,
    submissionStatus,
    isSubmitting,
    handleRunTask,
    handleSubmitTask,
  } = useTaskContext();

  const { userRole } = useUserContext();
  const isStudentRole = userRole === Roles.STUDENT;

  const isAccepted =
    submissionStatus?.passedCount != null &&
    submissionStatus?.totalCount != null &&
    submissionStatus.passedCount === submissionStatus.totalCount &&
    submissionStatus.status === TaskSubmissionStatus.COMPLETED; // oh my god

  const firstFailedResult = submissionStatus?.visibleResults?.find(
    (result) => !result.passed
  ); // hate ?

  const isResultTabVisible = isSubmitting || Boolean(submissionStatus); // ???
  const currentTab = isResultTabVisible ? activeTab : TaskTab.TESTCASES; // ???

  return (
    <div className="task-result-container">
      <div className="task-result-content">
        <div className="task-result-tabs">
          {testCases.map((testCase, index) => {
            const testCaseResult =
              runResults?.find(
                (result) => result.orderIndex === testCase.orderIndex
              ) ?? runResults?.[index];
            const isSelected =
              currentTab === TaskTab.TESTCASES && index === activeTestCaseIndex;

            let testCaseButtonColorClass = "";
            if (isSelected) {
              if (testCaseResult) {
                testCaseButtonColorClass = testCaseResult.passed // to be fair those nested ifs logic is tragic
                  ? "bg-primary-success! text-primary-dark! border-primary-success!"
                  : "bg-primary-error! text-primary-dark! border-primary-error!";
              } else {
                testCaseButtonColorClass =
                  "bg-secondary-gray! text-primary-dark!"; // reassignment of variable?
              }
            } else {
              if (testCaseResult) {
                testCaseButtonColorClass = testCaseResult.passed
                  ? "border-primary-success! text-secondary-gray! hover:bg-primary-success! hover:text-primary-dark!"
                  : "border-primary-error! text-secondary-gray! hover:bg-primary-error! hover:text-primary-dark!";
              }
            }

            return (
              <ButtonWithBorder
                key={index}
                text={testCase.name || `Test ${index + 1}`}
                size="sm"
                forceLight={true}
                className={`mx-0! rounded-lg! ${testCaseButtonColorClass}`}
                onClick={() => {
                  setActiveTab(TaskTab.TESTCASES);
                  setActiveTestCaseIndex(index);
                }}
              />
            );
          })}

          {isResultTabVisible && (
            <ButtonWithBorder
              text="Wynik"
              size="sm"
              forceLight={true}
              className={`mx-0! rounded-lg! ${
                currentTab === TaskTab.SUBMISSION_RESULT
                  ? "bg-secondary-gray! text-primary-dark!"
                  : "" // for what is this ternary?
              }`}
              onClick={() => setActiveTab(TaskTab.SUBMISSION_RESULT)}
            />
          )}
        </div>

        {currentTab === TaskTab.TESTCASES && (
          <>
            {activeResult && runResults !== null && (
              <div>
                {activeResult.passed ? (
                  <h3 className="task-result-status-accepted">Zaakceptowano</h3>
                ) : (
                  <h3 className="task-result-status-rejected">Odrzucono</h3>
                )}
              </div>
            )}

            {activeTestCase && (
              <div className="task-result-section-list">
                <div className="task-result-section-item">
                  <h4 className="task-result-section-title">Wejście</h4>
                  <TaskTestCase content={activeTestCase.input} />
                </div>

                {runResults !== null && (
                  <div className="task-result-section-item">
                    <h4 className="task-result-section-title">Twoje wyjście</h4>
                    <TaskTestCase
                      content={
                        activeResult?.actualOutput || activeResult?.stderr || ""
                      }
                    />
                  </div>
                )}

                <div className="task-result-section-item">
                  <h4 className="task-result-section-title">
                    Oczekiwane wyjście
                  </h4>
                  <TaskTestCase content={activeTestCase.expectedOutput} />
                </div>
              </div>
            )}
          </>
        )}

        {currentTab === TaskTab.SUBMISSION_RESULT && (
          <>
            {isSubmitting ||
            submissionStatus?.status === TaskSubmissionStatus.QUEUED ||
            submissionStatus?.status === TaskSubmissionStatus.RUNNING ? ( // i cant live with such bad code
              <div className="task-result-submission-loading">
                Przetwarzanie zgłoszenia...
              </div>
            ) : !submissionStatus ? ( // this ternary is not bad, its tragic
              <div className="task-result-submission-empty">
                Brak zgłoszenia.
              </div>
            ) : (
              <div className="task-result-submission-details">
                <div className="task-result-submission-header">
                  <div className="task-result-submission-header-main">
                    <h3
                      className={
                        isAccepted // this code is rejected
                          ? "task-result-status-accepted"
                          : "task-result-status-rejected"
                      }
                    >
                      {isAccepted ? "Zaakceptowano" : "Odrzucono"}
                    </h3>
                    <span className="task-result-submission-passed-count">
                      {submissionStatus.passedCount ?? 0} /{" "}
                      {submissionStatus.totalCount ?? 0} przypadków testowych
                    </span>
                    <span className="task-result-submission-score">
                      Ocena:{" "}
                      {submissionStatus.score != null
                        ? `${submissionStatus.score}%`
                        : "Brak"}
                    </span>
                  </div>
                  <div className="task-result-submission-meta">
                    <span>
                      Czas: {submissionStatus.totalExecutionTimeMs ?? 0}ms
                    </span>
                    <span>•</span>
                    <span>
                      Wysłano:{" "}
                      {formatSubmissionDate(submissionStatus.createdDate)}
                    </span>
                  </div>
                </div>

                {!isAccepted && firstFailedResult && (
                  <div className="task-result-section-list">
                    <div className="task-result-section-item">
                      <h4 className="task-result-section-title">Wejście</h4>
                      <TaskTestCase content={firstFailedResult.input} />
                    </div>

                    <div className="task-result-section-item">
                      <h4 className="task-result-section-title">
                        Twoje wyjście
                      </h4>
                      <TaskTestCase
                        content={
                          firstFailedResult.actualOutput ||
                          firstFailedResult.stderr ||
                          ""
                        }
                      />
                    </div>

                    <div className="task-result-section-item">
                      <h4 className="task-result-section-title">
                        Oczekiwane wyjście
                      </h4>
                      <TaskTestCase
                        content={firstFailedResult.expectedOutput}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <div className="task-result-actions">
        <ButtonWithBorder
          text={isPending ? "Uruchamianie..." : "Uruchom"}
          size="sm"
          className="mx-0! rounded-lg!"
          forceLight={true}
          onClick={() => handleRunTask()}
          isActive={!isPending && !isSubmitting}
        />
        {isStudentRole && (
          <ButtonWithBorder
            text={isSubmitting ? "Wysyłanie..." : "Prześlij"}
            size="sm"
            className="mx-0! rounded-lg!"
            forceLight={true}
            onClick={() => handleSubmitTask()}
            isActive={!isPending && !isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
