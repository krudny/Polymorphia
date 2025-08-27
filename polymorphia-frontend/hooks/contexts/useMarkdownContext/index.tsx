import { useContext } from "react";
import { MarkdownContextInterface } from "@/components/providers/markdown/types";
import { MarkdownContext } from "@/components/providers/markdown/MarkdownContext";

export default function useMarkdownContext(): MarkdownContextInterface {
  const context = useContext(MarkdownContext);

  if (!context) {
    throw new Error("useMarkdownContext must be used within MarkdownProvider");
  }

  return context;
};