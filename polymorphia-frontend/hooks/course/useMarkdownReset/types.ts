import { MarkdownType } from "@/interfaces/general";

export interface UseMarkdownReset {
  mutate: () => void;
}

export interface UseMarkdownResetProps {
  resourceId: number;
  type: MarkdownType;
}
