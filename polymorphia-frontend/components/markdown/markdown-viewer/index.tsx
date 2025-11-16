"use client";

import Markdown from "react-markdown";
import { markdownConfig } from "@/components/markdown/markdown-viewer/config";
import Loading from "@/components/loading";
import { useFadeInAnimate } from "@/animations/FadeIn";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useMarkdown } from "@/hooks/course/useMarkdown";
import ErrorComponent from "@/components/error";

export default function MarkdownViewer() {
  const { markdownType } = useMarkdownContext();
  const { data, isLoading, isError } = useMarkdown(markdownType);
  const wrapperRef = useFadeInAnimate(!isLoading && !!data?.markdown);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent message="Nie można pobrać markdown." />;
  }

  if (!data || data.markdown === "") {
    return (
      <ErrorComponent
        message="Do wydarzenia nie została przypisana żadna treść."
        title="Brak danych"
      />
    );
  }

  return (
    <div className="markdown-viewer" ref={wrapperRef}>
      <Markdown
        components={markdownConfig}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      >
        {String(data.markdown).replace(/(<br\s*\/?>\s*)+/gi, "<br />")}
      </Markdown>
    </div>
  );
}
