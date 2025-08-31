import { useContext } from "react";
import { MarkdownContext } from "@/components/providers/markdown/MarkdownContext";
import MarkdownViewer from "@/components/markdown/markdown-viewer";
import MarkdownEditor from "@/components/markdown/markdown-editor";

export default function MarkdownWrapper() {
  const { isEditing } = useContext(MarkdownContext);

  return <>{isEditing ? <MarkdownEditor /> : <MarkdownViewer />}</>;
}
