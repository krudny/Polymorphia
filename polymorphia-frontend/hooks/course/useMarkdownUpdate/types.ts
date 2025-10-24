import { Dispatch, SetStateAction } from "react";
import { MarkdownType } from "@/interfaces/general";

export interface UseMarkdownUpdate {
  mutate: () => void;
}

export interface UseMarkdownUpdateProps {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  resourceId: number;
  markdownType: MarkdownType;
  markdown: string;
}
