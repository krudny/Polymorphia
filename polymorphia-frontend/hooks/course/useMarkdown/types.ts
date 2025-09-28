import { MarkdownResponseDTO } from "@/interfaces/api/markdown";

export interface UseMarkdown {
  data: MarkdownResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
