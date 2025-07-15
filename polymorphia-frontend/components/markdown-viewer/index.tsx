import Markdown from "react-markdown";
import { markdownConfig } from "@/components/markdown-viewer/config";
import { MarkdownViewerProps } from "@/components/markdown-viewer/types";

export default function MarkdownViewer({ markdown }: MarkdownViewerProps) {
  return (
    <div className="w-full px-10 h-full overflow-y-auto custom-scrollbar markdown">
      <Markdown components={markdownConfig}>{markdown}</Markdown>
    </div>
  );
}
