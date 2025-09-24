import { UseMutationResult } from "@tanstack/react-query";
import { ImportCSVType } from "@/interfaces/general";
import { CSVHeadersResponseDTO } from "@/interfaces/api/CSV";

export interface UseCSVHeadersUpdateParams {
  file: File;
  type: ImportCSVType;
}

export interface UseCSVHeadersUpdate {
  mutation: UseMutationResult<
    CSVHeadersResponseDTO,
    Error,
    UseCSVHeadersUpdateParams
  >;
}
