"use client";

import { ChangeEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";

export default function MarkdownEditor() {
  const { newMarkdown, setNewMarkdown } = useMarkdownContext();
  const wrapperRef = useFadeInAnimate(!!newMarkdown || newMarkdown.length == 0);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMarkdown(event.target.value);
  };

  return (
    <div className="markdown-editor" ref={wrapperRef}>
      <TextareaAutosize
        className="markdown-textarea"
        value={newMarkdown}
        onChange={handleChange}
        placeholder="Wpisz coś tutaj..."
        minRows={10}
        cacheMeasurements
      />
    </div>
  );
}
