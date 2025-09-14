import {UseMutationResult} from "@tanstack/react-query";
import {ImportCSVType} from "@/interfaces/general";

export interface UseCSVProcessUpdateParams {
  type: ImportCSVType;
  csvHeaders: string[];
  data: string[][];
  gradableEventId?: number;
}

export interface UseCSVProcessUpdate {
  mutation: UseMutationResult<void, Error, UseCSVProcessUpdateParams>;
}