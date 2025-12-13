import { MarkdownType } from "@/interfaces/general";
import { UseMutationResult } from "@tanstack/react-query";

export type UseMarkdownReset = UseMutationResult<
  void,
  Error,
  void | undefined,
  unknown
>;

export interface UseMarkdownResetProps {
  resourceId: number;
  markdownType: MarkdownType;
}
