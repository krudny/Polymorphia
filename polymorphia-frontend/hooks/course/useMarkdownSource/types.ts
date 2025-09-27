import { SourceMarkdownResponseDTO } from "@/interfaces/api/markdown";

export interface UseMarkdownSource {
  data: SourceMarkdownResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
