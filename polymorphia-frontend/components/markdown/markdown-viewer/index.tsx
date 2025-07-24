"use client";

import Markdown from "react-markdown";
import { markdownConfig } from "@/components/markdown/markdown-viewer/config";
import { MarkdownContext } from "@/components/providers/markdown/MarkdownContext";
import { useContext } from "react";
import Loading from "@/components/loading/Loading";
import { useFadeInAnimate } from "@/animations/FadeIn";

export default function MarkdownViewer() {
  const { markdown, isLoading, isError } = useContext(MarkdownContext);
  const shouldAnimate = !isLoading && !!markdown;
  const wrapperRef = useFadeInAnimate(shouldAnimate);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Nie można pobrać markdown</div>;
  }

  return (
    <div className="markdown-viewer" ref={wrapperRef}>
      <Markdown components={markdownConfig}>{markdown}</Markdown>
    </div>
  );
}
