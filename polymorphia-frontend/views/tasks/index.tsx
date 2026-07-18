import "./index.css";
import { useRef, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { Editor, type BeforeMount, type OnMount } from "@monaco-editor/react";
import ButtonWithBorder from "@/components/button";
import { SupportedLanguage } from "@/interfaces/api/tasks/types";
import useSubmitTask from "@/hooks/course/tasks/useSubmitTask";

type MonacoEditor = Parameters<OnMount>[0];

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

const DEFAULT_CODE: Record<SupportedLanguage, string> = {
  [SupportedLanguage.JAVASCRIPT]: `console.log("Hello World");`,
  [SupportedLanguage.PYTHON]: `print("Hello World")`,
  [SupportedLanguage.JAVA]: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
};

const MONACO_LANG: Record<SupportedLanguage, string> = {
  [SupportedLanguage.JAVASCRIPT]: "javascript",
  [SupportedLanguage.PYTHON]: "python",
  [SupportedLanguage.JAVA]: "java",
};

const panel =
  "h-full min-h-0 min-w-0 overflow-hidden rounded-2xl " +
  "shadow-2xl bg-primary-dark";

export default function TasksView() {
  const [language, setLanguage] = useState<SupportedLanguage>(
    SupportedLanguage.JAVASCRIPT
  );
  const [output, setOutput] = useState<string>("");

  const editorRef = useRef<MonacoEditor | null>(null);

  const { mutate, isPending } = useSubmitTask({ setOutput });

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleRun = () => {
    const code = editorRef.current?.getValue() ?? "";

    if (!code) {
      return;
    }

    setOutput("Uruchamianie...");
    mutate({ language, code });
  };

  return (
    <div className="h-full w-full overflow-hidden p-6">
      <Group orientation="horizontal" className="h-full w-full">
        <Panel defaultSize="40%" minSize="20%" className="min-w-0">
          <div className={`${panel} p-6 overflow-y-auto`}>Treść zadania</div>
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
                  <select
                    value={language}
                    onChange={(event) =>
                      setLanguage(event.target.value as SupportedLanguage)
                    }
                    className="rounded bg-primary-dark text-slate-100 border border-white/10 px-2 py-1"
                  >
                    <option value={SupportedLanguage.JAVASCRIPT}>
                      JavaScript
                    </option>
                    <option value={SupportedLanguage.PYTHON}>Python</option>
                    <option value={SupportedLanguage.JAVA}>Java</option>
                  </select>
                </div>
                <div className="flex-1 min-h-0">
                  <Editor
                    key={language}
                    height="100%"
                    theme="glass-dark"
                    language={MONACO_LANG[language]}
                    defaultValue={DEFAULT_CODE[language]}
                    onMount={handleMount}
                    beforeMount={defineGlassTheme}
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
                  <ButtonWithBorder
                    text={isPending ? "Uruchamianie..." : "Uruchom"}
                    size="sm"
                    className="mx-0! rounded-lg!"
                    forceLight={true}
                    onClick={handleRun}
                  />
                </div>
              </div>
            </Panel>
          </Group>
        </Panel>
      </Group>
    </div>
  );
}
