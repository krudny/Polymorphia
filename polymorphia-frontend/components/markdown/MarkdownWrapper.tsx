import MarkdownViewer from "@/components/markdown/markdown-viewer";
import MarkdownEditor from "@/components/markdown/markdown-editor";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";

export default function MarkdownWrapper() {
  const { isEditing } = useMarkdownContext();

  return <>{isEditing ? <MarkdownEditor /> : <MarkdownViewer />}</>;
}
