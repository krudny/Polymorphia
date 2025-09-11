import {CSVHeadersResponseDTO} from "@/components/speed-dial/modals/import-csv/CSVService";
import {UseMutationResult} from "@tanstack/react-query";
import {ImportCSVType} from "@/interfaces/general";

export interface UseCSVHeadersUpdateParams {
  file: File;
  type: ImportCSVType;
}

export interface UseCSVHeadersUpdate {
  mutation: UseMutationResult<CSVHeadersResponseDTO, Error, UseCSVHeadersUpdateParams>;
}