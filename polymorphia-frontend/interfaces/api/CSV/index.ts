export interface CSVHeadersResponseDTO {
  requiredHeaders: string[];
  fileHeaders: string[];
}

export interface CSVPreviewResponseDTO {
  headers: string[],
  data: string[][],
}