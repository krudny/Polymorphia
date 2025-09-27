import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";
import MarkdownEditor from "./markdown-editor";
import MarkdownViewer from "@/components/markdown/markdown-viewer";
import {useFadeInAnimate} from "@/animations/FadeIn";

export default function MarkdownWrapper() {
  const { isEditing } = useMarkdownContext();
  const wrapperRef = useFadeInAnimate();

  return (
      <div className="markdown" ref={wrapperRef}>
        <div className="markdown-wrapper">
          {isEditing ? <MarkdownEditor /> : <MarkdownViewer />}
        </div>
      </div>
  )
}

