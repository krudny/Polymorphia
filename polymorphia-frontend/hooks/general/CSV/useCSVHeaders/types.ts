import {CSVHeadersResponseDTO} from "@/components/speed-dial/modals/import-csv/CSVService";
import {UseMutationResult} from "@tanstack/react-query";

export interface UseCSVHeadersUpdateParams {
  file: File;
  type: string;
}

export interface UseCSVHeadersUpdate {
  mutation: UseMutationResult<CSVHeadersResponseDTO, Error, UseCSVHeadersUpdateParams>;
}