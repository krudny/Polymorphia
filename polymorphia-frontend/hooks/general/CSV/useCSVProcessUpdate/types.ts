import {UseMutationResult} from "@tanstack/react-query";

export interface UseCSVProcessUpdateParams {
  type: string;
  headers: string[];
  data: string[][];
}

export interface UseCSVProcessUpdate {
  mutation: UseMutationResult<void, Error, UseCSVProcessUpdateParams>;
}