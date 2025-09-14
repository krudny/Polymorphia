import {UseMutationResult} from "@tanstack/react-query";
import {CSVPreviewResponseDTO} from "@/interfaces/api/CSV";

export interface UseCSVPreviewUpdateParams {
  file: File;
  csvHeaders: Record<string, string>;
}

export interface UseCSVPreviewUpdate {
  mutation: UseMutationResult<CSVPreviewResponseDTO, Error, UseCSVPreviewUpdateParams>;
}