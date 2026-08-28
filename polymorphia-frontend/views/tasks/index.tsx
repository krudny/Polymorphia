import "./index.css";
import { useRef, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import ButtonWithBorder from "@/components/button";
import MarkdownViewer from "@/components/markdown/markdown-viewer";
import Selector from "@/components/selector";
import { useTaskContext } from "@/hooks/contexts/useTaskContext";
import useUserContext from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";
import { TaskProvider } from "@/providers/task";
import { useEventParams } from "@/hooks/app/params/useEventParams";
import Loading from "@/components/loading";
import dynamic from "next/dynamic";
import type { BeforeMount, OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-secondary-gray text-sm">
      Ładowanie edytora...
    </div>
  ),
});

type MonacoEditor = editor.IStandaloneCodeEditor;

const defineGlassTheme: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("glass-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#262626",
      "editor.foreground": "#fafafa",
      "editor.lineHighlightBackground": "#262626",
      "editorGutter.background": "#262626",
      "editorLineNumber.foreground": "#fafafa",
      "editorLineNumber.activeForeground": "#fafafa",
      "editor.selectionBackground": "#3b82f680",
      "editor.lineHighlightBorder": "#00000000",
      "editorIndentGuide.background1": "#262626",
      "minimap.background": "#00000000",
      "scrollbar.shadow": "#00000000",
      "scrollbarSlider.background": "#ffffff1a",
      "scrollbarSlider.hoverBackground": "#ffffff2a",
      "editorWidget.background": "#1e293bf2",
      "editorWidget.border": "#ffffff1a",
      "editorSuggestWidget.background": "#262626",
    },
  });
};

const mapBackendToMonacoLanguage = (backendLanguage: string): string => {
  if (!backendLanguage) return "plaintext";
  const normalizedLanguage = backendLanguage.toUpperCase();
  if (normalizedLanguage === "JAVASCRIPT" || normalizedLanguage === "JS")
    return "javascript";
  if (normalizedLanguage === "PYTHON" || normalizedLanguage === "PY")
    return "python";
  if (normalizedLanguage === "JAVA") return "java";
  if (normalizedLanguage === "CPP" || normalizedLanguage === "C++")
    return "cpp";
  if (normalizedLanguage === "C") return "c";
  if (
    normalizedLanguage === "CSHARP" ||
    normalizedLanguage === "C_SHARP" ||
    normalizedLanguage === "C#"
  )
    return "csharp";
  return backendLanguage.toLowerCase();
};

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

const panelStyle =
  "h-full min-h-0 min-w-0 overflow-hidden rounded-2xl " +
  "shadow-2xl bg-primary-dark";

function TestCaseBlock({ content }: { content: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="group relative bg-[#181818] rounded-md border border-white/5 hover:bg-[#121212] transition-all duration-500 ease-in-out p-3.5 overflow-x-auto">
      <pre className="font-mono text-sm text-secondary-gray leading-relaxed m-0 p-0 block pr-8 min-h-[1.25rem]">
        {content || "\u00A0"}
      </pre>

      <button
        onClick={handleCopy}
        title="Skopiuj"
        className="absolute top-2.5 right-2.5 w-7 h-7 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out rounded border-2 border-secondary-gray text-secondary-gray hover:bg-secondary-gray hover:text-primary-dark flex-centered p-0 cursor-pointer"
      >
        <span className="material-symbols text-[16px] leading-none select-none">
          {isCopied ? "check" : "content_copy"}
        </span>
      </button>
    </div>
  );
}

function TasksViewContent() {
  const {
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
    activeTab,
    setActiveTab,
    submissionStatus,
    isSubmitting,
    handleSubmitTask,
  } = useTaskContext();

  const { userRole } = useUserContext();
  const isStudentRole = userRole === Roles.STUDENT;

  const editorRef = useRef<MonacoEditor | null>(null);

  const handleBeforeMount: BeforeMount = (monaco) => {
    defineGlassTheme(monaco);
  };

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleRun = () => {
    const code = editorRef.current?.getValue() ?? "";
    handleRunTask(code);
  };

  const handleSubmit = () => {
    const code = editorRef.current?.getValue() ?? "";
    handleSubmitTask(code);
  };

  if (isLoading) {
    return <Loading />;
  }

  const isAccepted =
    submissionStatus?.passedCount != null &&
    submissionStatus?.totalCount != null &&
    submissionStatus.passedCount === submissionStatus.totalCount &&
    submissionStatus.status === "COMPLETED";

  const firstFailedResult = submissionStatus?.visibleResults?.find(
    (result) => !result.passed
  );

  const hasSubmission = isSubmitting || Boolean(submissionStatus);
  const areRunResultsPassing =
    !runResults || runResults.every((result) => result.passed);
  const areVisibleResultsPassing =
    !submissionStatus?.visibleResults ||
    submissionStatus.visibleResults.every((result) => result.passed);

  const isWynikTabVisible = hasSubmission;

  const currentTab = isWynikTabVisible ? activeTab : "testcases";

  return (
    <div className="h-full w-full overflow-hidden p-6">
      <Group orientation="horizontal" className="h-full w-full">
        <Panel defaultSize="40%" minSize="20%" className="min-w-0">
          <div
            className={`${panelStyle} p-6 overflow-y-auto dark:text-secondary-gray relative`}
          >
            <MarkdownViewer />
          </div>
        </Panel>
        <Separator className="w-1 m-1 rounded-full hover:bg-primary-dark/80 transition-colors ease-in" />
        <Panel defaultSize="60%" minSize="30%" className="min-w-0">
          <Group orientation="vertical" className="h-full w-full">
            <Panel defaultSize="65%" minSize="20%" className="min-h-0">
              <div
                className={`${panelStyle} flex flex-col`}
                style={{ backgroundColor: "#262626" }}
              >
                <div className="flex items-center gap-2 p-2 shrink-0">
                  <div className="w-32">
                    <Selector
                      options={allowedLanguages}
                      value={language}
                      onChange={setLanguage}
                      size="md"
                      padding="sm"
                      className="rounded-lg!"
                    />
                  </div>
                </div>
                <div className="flex-1 min-h-0">
                  <Editor
                    key={language}
                    height="100%"
                    theme="glass-dark"
                    language={mapBackendToMonacoLanguage(language)}
                    defaultValue={sampleCode}
                    beforeMount={handleBeforeMount}
                    onMount={handleMount}
                    options={{
                      automaticLayout: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      padding: { top: 12 },
                      scrollBeyondLastLine: false,
                      renderLineHighlight: "none",
                      overviewRulerLanes: 0,
                    }}
                  />
                </div>
              </div>
            </Panel>
            <Separator className="h-1 m-1 rounded-full hover:bg-primary-dark/80 transition-colors ease-in" />
            <Panel defaultSize="35%" minSize="10%" className="min-h-0">
              <div className={`${panelStyle} flex flex-col`}>
                <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-4">
                  <div className="w-full flex gap-3 flex-wrap items-center">
                    {testCases.map((testCase, index) => {
                      const testCaseResult =
                        runResults?.find(
                          (result) => result.orderIndex === testCase.orderIndex
                        ) ?? runResults?.[index];
                      const isSelected =
                        currentTab === "testcases" &&
                        index === activeTestCaseIndex;

                      let testCaseButtonColorClass = "";
                      if (isSelected) {
                        if (testCaseResult) {
                          testCaseButtonColorClass = testCaseResult.passed
                            ? "bg-primary-success! text-primary-dark! border-primary-success!"
                            : "bg-primary-error! text-primary-dark! border-primary-error!";
                        } else {
                          testCaseButtonColorClass =
                            "bg-secondary-gray! text-primary-dark!";
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
                            setActiveTab("testcases");
                            setActiveTestCaseIndex(index);
                          }}
                        />
                      );
                    })}

                    {isWynikTabVisible && (
                      <ButtonWithBorder
                        text="Wynik"
                        size="sm"
                        forceLight={true}
                        className={`mx-0! rounded-lg! ${
                          currentTab === "submissionResult"
                            ? "bg-secondary-gray! text-primary-dark!"
                            : ""
                        }`}
                        onClick={() => setActiveTab("submissionResult")}
                      />
                    )}
                  </div>

                  {currentTab === "testcases" && (
                    <>
                      {activeResult && runResults !== null && (
                        <div>
                          {activeResult.passed ? (
                            <h3 className="text-3xl text-primary-success">
                              Zaakceptowano
                            </h3>
                          ) : (
                            <h3 className="text-3xl text-primary-error">
                              Odrzucono
                            </h3>
                          )}
                        </div>
                      )}

                      {activeTestCase && (
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <h4 className="text-xl text-secondary-gray">
                              Wejście
                            </h4>
                            <TestCaseBlock content={activeTestCase.input} />
                          </div>

                          {runResults !== null && (
                            <div className="flex flex-col gap-2">
                              <h4 className="text-xl text-secondary-gray">
                                Twoje wyjście
                              </h4>
                              <TestCaseBlock
                                content={
                                  activeResult?.actualOutput ||
                                  activeResult?.stderr ||
                                  ""
                                }
                              />
                            </div>
                          )}

                          <div className="flex flex-col gap-2">
                            <h4 className="text-xl text-secondary-gray">
                              Oczekiwane wyjście
                            </h4>
                            <TestCaseBlock
                              content={activeTestCase.expectedOutput}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {currentTab === "submissionResult" && (
                    <>
                      {isSubmitting ||
                      submissionStatus?.status === "QUEUED" ||
                      submissionStatus?.status === "RUNNING" ? (
                        <div className="h-full flex items-center justify-center text-secondary-gray">
                          Przetwarzanie zgłoszenia...
                        </div>
                      ) : !submissionStatus ? (
                        <div className="h-full flex items-center justify-center text-primary-gray">
                          Brak zgłoszenia.
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-1 pb-3 border-b border-white/10">
                            <div className="flex items-center gap-3">
                              <h3
                                className={`text-3xl ${
                                  isAccepted
                                    ? "text-primary-success"
                                    : "text-primary-error"
                                }`}
                              >
                                {isAccepted ? "Zaakceptowano" : "Odrzucono"}
                              </h3>
                              <span className="text-xl text-secondary-gray">
                                {submissionStatus.passedCount ?? 0} /{" "}
                                {submissionStatus.totalCount ?? 0} przypadków
                                testowych
                              </span>
                              <span className="text-xl text-primary-gray ml-2">
                                Ocena:{" "}
                                {submissionStatus.score != null
                                  ? `${submissionStatus.score}%`
                                  : "Brak"}
                              </span>
                            </div>
                            <div className="text-sm text-primary-gray flex items-center gap-2">
                              <span>
                                Czas:{" "}
                                {submissionStatus.totalExecutionTimeMs ?? 0}ms
                              </span>
                              <span>•</span>
                              <span>
                                Wysłano:{" "}
                                {formatSubmissionDate(
                                  submissionStatus.createdDate
                                )}
                              </span>
                            </div>
                          </div>

                          {!isAccepted && firstFailedResult && (
                            <div className="flex flex-col gap-4">
                              <div className="flex flex-col gap-2">
                                <h4 className="text-xl text-secondary-gray">
                                  Wejście
                                </h4>
                                <TestCaseBlock
                                  content={firstFailedResult.input}
                                />
                              </div>

                              <div className="flex flex-col gap-2">
                                <h4 className="text-xl text-secondary-gray">
                                  Twoje wyjście
                                </h4>
                                <TestCaseBlock
                                  content={
                                    firstFailedResult.actualOutput ||
                                    firstFailedResult.stderr ||
                                    ""
                                  }
                                />
                              </div>

                              <div className="flex flex-col gap-2">
                                <h4 className="text-xl text-secondary-gray">
                                  Oczekiwane wyjście
                                </h4>
                                <TestCaseBlock
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
                <div className="w-full flex justify-end items-center gap-2 p-3 border-t border-t-primary-light/10 shrink-0">
                  <ButtonWithBorder
                    text={isPending ? "Uruchamianie..." : "Uruchom"}
                    size="sm"
                    className="mx-0! rounded-lg!"
                    forceLight={true}
                    onClick={handleRun}
                    isActive={!isPending && !isSubmitting}
                  />
                  {isStudentRole && (
                    <ButtonWithBorder
                      text={isSubmitting ? "Wysyłanie..." : "Prześlij"}
                      size="sm"
                      className="mx-0! rounded-lg!"
                      forceLight={true}
                      onClick={handleSubmit}
                      isActive={!isPending && !isSubmitting}
                    />
                  )}
                </div>
              </div>
            </Panel>
          </Group>
        </Panel>
      </Group>
    </div>
  );
}

export default function TasksView() {
  const { gradableEventId } = useEventParams();
  const taskId = Number(gradableEventId);

  return (
    <TaskProvider taskId={taskId}>
      <TasksViewContent />
    </TaskProvider>
  );
}
