import {UseMutationResult} from "@tanstack/react-query";
import {CSVPreviewResponseDTO} from "@/components/speed-dial/modals/import-csv/CSVService";

export interface UseCSVPreviewUpdateParams {
  file: File;
  headers: Record<string, string>;
}

export interface UseCSVPreviewUpdate {
  mutation: UseMutationResult<CSVPreviewResponseDTO, Error, UseCSVPreviewUpdateParams>;
}