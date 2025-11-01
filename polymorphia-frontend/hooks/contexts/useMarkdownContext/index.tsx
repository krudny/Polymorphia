import { useContext } from "react";
import { MarkdownContextInterface } from "@/providers/markdown/types";
import { MarkdownContext } from "@/providers/markdown";

export default function useMarkdownContext(): MarkdownContextInterface {
  const context = useContext(MarkdownContext);

  if (!context) {
    throw new Error("useMarkdownContext must be used within MarkdownProvider");
  }

  return context;
}
