import {ReactNode} from "react";
import {SourceMarkdownResponseDTO} from "@/interfaces/api/markdown";
import {MarkdownType} from "@/interfaces/general";

export interface MarkdownContextInterface {
  markdown: string;
  setMarkdown: (markdown: string) => void;
  newMarkdown: string;
  setNewMarkdown: (markdown: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  isLoading: boolean;
  isError: boolean;
  saveMarkdown: () => void;
  rejectMarkdown: () => void;
  resetMarkdown: () => void;
  markdownSource: SourceMarkdownResponseDTO | undefined;
}

export interface MarkdownProviderProps {
  children: ReactNode;
  markdownType: MarkdownType;
}
