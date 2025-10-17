import { ImportCSVType } from "@/interfaces/general";
import { UseMutationResult } from "@tanstack/react-query";

export interface UseCSVProcessUpdateParams {
  type: ImportCSVType;
  csvHeaders: string[];
  data: string[][];
}

export interface UseCSVProcessUpdate {
  mutation: UseMutationResult<void, Error, UseCSVProcessUpdateParams>;
}
