"use client";

import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { MarkdownContext } from "@/components/providers/markdown/MarkdownContext";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";

export default function MarkdownEditor() {
  const { newMarkdown, setNewMarkdown } = useContext(MarkdownContext);
  const wrapperRef = useFadeInAnimate(!!newMarkdown);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewMarkdown(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMarkdown]);

  return (
    <div className="markdown-editor" ref={wrapperRef}>
      <textarea
        ref={textareaRef}
        value={newMarkdown}
        onChange={handleChange}
        placeholder="Wpisz coś tutaj..."
      />
    </div>
  );
}
