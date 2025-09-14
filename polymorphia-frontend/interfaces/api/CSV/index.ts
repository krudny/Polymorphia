export interface CSVHeadersResponseDTO {
  requiredCSVHeaders: string[];
  fileCSVHeaders: string[];
}

export interface CSVPreviewResponseDTO {
  csvHeaders: string[],
  data: string[][],
}