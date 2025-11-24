import { MarkdownType } from "@/interfaces/general";

export interface MarkdownResponseDTO {
  markdown: string;
}

export interface MarkdownRequestDTO {
  resourceId: number;
  markdownType: MarkdownType;
  markdown: string;
}

export interface SourceMarkdownResponseDTO {
  sourceUrl: string | undefined;
}

export interface MarkdownParamsRequest {
  resourceId: number;
  markdownType: MarkdownType;
}
