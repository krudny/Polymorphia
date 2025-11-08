import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";
import MarkdownEditor from "./markdown-editor";
import MarkdownViewer from "@/components/markdown/markdown-viewer";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import { MarkdownWrapperProps } from "@/components/markdown/types";
import SpeedDial from "@/components/speed-dial";

export default function MarkdownWrapper({
  speedDialKey,
}: MarkdownWrapperProps) {
  const { isEditing } = useMarkdownContext();
  const wrapperRef = useFadeInAnimate();

  return (
    <div className="markdown" ref={wrapperRef}>
      <SpeedDial speedDialKey={speedDialKey} />
      <div className="markdown-wrapper">
        {isEditing ? <MarkdownEditor /> : <MarkdownViewer />}
      </div>
    </div>
  );
}
