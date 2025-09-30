"use client";

import Markdown from "react-markdown";
import { markdownConfig } from "@/components/markdown/markdown-viewer/config";
import Loading from "@/components/loading";
import { useFadeInAnimate } from "@/animations/FadeIn";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";

export default function MarkdownViewer() {
  const { markdown, isLoading, isError } = useMarkdownContext();
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
