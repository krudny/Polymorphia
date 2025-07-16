import { ReactNode } from "react";

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
}

export interface MarkdownProviderProps {
  children: ReactNode;
  eventId: number;
}
