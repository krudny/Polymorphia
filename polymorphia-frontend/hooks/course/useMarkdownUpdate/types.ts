import {MarkdownRequestDTO} from "@/interfaces/api/markdown";

export interface UseMarkdownUpdate {
  mutate: (variables: MarkdownRequestDTO) => void;
}
