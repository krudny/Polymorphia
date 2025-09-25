export interface MarkdownResponseDTO {
  markdown: string;
}

export interface MarkdownRequestDTO {
  gradableEventId: number;
  markdown: string;
}

export interface SourceMarkdownResponseDTO {
  sourceUrl: string | null;
}
