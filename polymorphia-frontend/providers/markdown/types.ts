import { ReactNode } from "react";
import { MarkdownType } from "@/interfaces/general";
import { SourceMarkdownResponseDTO } from "@/interfaces/api/markdown";
import { UseMutateFunction } from "@tanstack/react-query";

export interface MarkdownContextInterface {
  newMarkdown: string;
  setNewMarkdown: (markdown: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  saveMarkdown: () => void;
  rejectMarkdown: () => void;
  resetMarkdown: UseMutateFunction<void, Error, void | undefined, unknown>;
  markdownType: MarkdownType;
  resourceId: number;
  markdownSource: SourceMarkdownResponseDTO | undefined;
}

export interface MarkdownProviderProps {
  children: ReactNode;
  markdownType: MarkdownType;
}
