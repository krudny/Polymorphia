"use client";

import { useContext, useEffect, useRef } from "react";
import { MarkdownContext } from "@/components/providers/markdown/MarkdownContext";

export default function MarkdownEditor() {
  const { newMarkdown, setNewMarkdown } = useContext(MarkdownContext);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMarkdown(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMarkdown]);

  return (
    <div className="w-full flex flex-col items-center justify-center px-4">
      <textarea
        ref={textareaRef}
        value={newMarkdown}
        onChange={handleChange}
        placeholder="Wpisz coś tutaj..."
        className="w-full max-w-[1200px] min-h-[300px] text-2xl text-primary-dark p-6 rounded-xl custom-scrollbar outline-primary-dark focus:outline-none resize-none"
      />
    </div>
  );
}
