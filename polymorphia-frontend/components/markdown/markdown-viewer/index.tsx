"use client";

import Markdown from "react-markdown";
import { markdownConfig } from "@/components/markdown/markdown-viewer/config";
import { MarkdownContext } from "@/components/providers/markdown/MarkdownContext";
import { useContext } from "react";
import Loading from "@/components/loading/Loading";

export default function MarkdownViewer() {
  const { markdown, isLoading, isError } = useContext(MarkdownContext);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !markdown) {
    return <div>Nie można pobrać markdown</div>;
  }

  return (
    <div className="w-full custom-scrollbar markdown">
      <Markdown components={markdownConfig}>{markdown}</Markdown>
    </div>
  );
}
