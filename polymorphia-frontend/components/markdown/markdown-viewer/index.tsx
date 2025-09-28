"use client";

import Markdown from "react-markdown";
import {markdownConfig} from "@/components/markdown/markdown-viewer/config";
import Loading from "@/components/loading/Loading";
import {useFadeInAnimate} from "@/animations/FadeIn";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import {useMarkdown} from "@/hooks/course/useMarkdown";

export default function MarkdownViewer() {
  const { markdownType } = useMarkdownContext();
  const { data, isLoading, isError } = useMarkdown(markdownType);
  const wrapperRef = useFadeInAnimate(!isLoading && !!data?.markdown);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Nie można pobrać markdown</div>;
  }

  if (!data || data.markdown === "") {
    return <div className="text-4xl m-auto">Do wydarzenia nie została przypisana żadna treść</div>
  }

  return (
    <div className="markdown-viewer" ref={wrapperRef}>
      <Markdown
        components={markdownConfig}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkGfm]}
      >
        {data.markdown}
      </Markdown>
    </div>
  );
}
