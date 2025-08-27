"use client";

import { ChangeEvent, useEffect, useRef } from "react";
import { useFadeInAnimate } from "@/animations/FadeIn";
import "./index.css";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";

export default function MarkdownEditor() {
  const { newMarkdown, setNewMarkdown } = useMarkdownContext();
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
