import {UseMutationResult} from "@tanstack/react-query";
import {ImportCSVType} from "@/interfaces/general";

export interface UseCSVProcessUpdateParams {
  type: ImportCSVType;
  headers: string[];
  data: string[][];
}

export interface UseCSVProcessUpdate {
  mutation: UseMutationResult<void, Error, UseCSVProcessUpdateParams>;
}