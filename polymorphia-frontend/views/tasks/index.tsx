import "./index.css";
import { useRef } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import ButtonWithBorder from "@/components/button";
import MarkdownViewer from "@/components/markdown/markdown-viewer";
import Selector from "@/components/selector";
import { useTaskContext } from "@/hooks/contexts/useTaskContext";
import { TaskProvider } from "@/providers/task";
import { useEventParams } from "@/hooks/app/params/useEventParams";
import Loading from "@/components/loading";
import dynamic from "next/dynamic";
import type { BeforeMount, OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-slate-400 font-mono text-sm">
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
  const normalized = backendLanguage.toUpperCase();
  if (normalized === "JAVASCRIPT" || normalized === "JS") return "javascript";
  if (normalized === "PYTHON" || normalized === "PY") return "python";
  if (normalized === "JAVA") return "java";
  if (normalized === "CPP" || normalized === "C++") return "cpp";
  if (normalized === "C") return "c";
  if (
    normalized === "CSHARP" ||
    normalized === "C_SHARP" ||
    normalized === "C#"
  )
    return "csharp";
  return backendLanguage.toLowerCase();
};

const panel =
  "h-full min-h-0 min-w-0 overflow-hidden rounded-2xl " +
  "shadow-2xl bg-primary-dark";

function TasksViewContent() {
  const {
    language,
    setLanguage,
    sampleCode,
    isLoading,
    output,
    allowedLanguages,
    handleSubmitTask,
    isPending,
  } = useTaskContext();

  const editorRef = useRef<MonacoEditor | null>(null);

  const handleBeforeMount: BeforeMount = (monaco) => {
    defineGlassTheme(monaco);
  };

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleRun = () => {
    const code = editorRef.current?.getValue() ?? "";
    handleSubmitTask(code);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full w-full overflow-hidden p-6">
      <Group orientation="horizontal" className="h-full w-full">
        <Panel defaultSize="40%" minSize="20%" className="min-w-0">
          <div
            className={`${panel} p-6 overflow-y-auto dark:text-secondary-gray relative`}
          >
            <MarkdownViewer />
          </div>
        </Panel>
        <Separator className="w-1 m-1 rounded-full hover:bg-primary-dark/80 transition-colors ease-in" />
        <Panel defaultSize="60%" minSize="30%" className="min-w-0">
          <Group orientation="vertical" className="h-full w-full">
            <Panel defaultSize="70%" minSize="20%" className="min-h-0">
              <div
                className={`${panel} flex flex-col`}
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
            <Panel defaultSize="30%" minSize="10%" className="min-h-0">
              <div className={`${panel} flex flex-col`}>
                <div className="flex-1 min-h-0 overflow-y-auto p-4 font-mono text-sm text-slate-300 whitespace-pre-wrap">
                  {output}
                </div>
                <div className="flex items-center justify-between p-3 border-t border-t-primary-light/10 shrink-0">
                  <h3 className="text-2xl text-secondary-gray px-1">Konsola</h3>
                  <div className="flex items-center gap-2">
                    <ButtonWithBorder
                      text={isPending ? "Uruchamianie..." : "Uruchom"}
                      size="sm"
                      className="mx-0! rounded-lg!"
                      forceLight={true}
                      onClick={handleRun}
                      isActive={!isPending}
                    />
                    <ButtonWithBorder
                      text={isPending ? "Wysyłanie..." : "Prześlij"}
                      size="sm"
                      className="mx-0! rounded-lg!"
                      forceLight={true}
                      onClick={handleRun}
                      isActive={!isPending}
                    />
                  </div>
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
