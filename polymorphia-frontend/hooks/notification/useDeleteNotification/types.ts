import { UseMutationResult } from "@tanstack/react-query";

export interface UseDeleteNotification {
  mutation: UseMutationResult<void, Error, number, unknown>;
}
