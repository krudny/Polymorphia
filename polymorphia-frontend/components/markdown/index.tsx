import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";
import MarkdownEditor from "./markdown-editor";
import MarkdownViewer from "@/components/markdown/markdown-viewer";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import { MarkdownWrapperProps } from "./types";
import SpeedDialEvent from "@/components/speed-dial/SpeedDialEvent";

export default function MarkdownWrapper({
  speedDialKey,
}: MarkdownWrapperProps) {
  const { isEditing } = useMarkdownContext();
  const wrapperRef = useFadeInAnimate();

  return (
    <div className="markdown" ref={wrapperRef}>
      <SpeedDialEvent speedDialKey={speedDialKey} />
      <div className="markdown-wrapper">
        {isEditing ? <MarkdownEditor /> : <MarkdownViewer />}
      </div>
    </div>
  );
}
