import type { ExecutionMode } from "@/interfaces/api/tasks/types";

export interface UseExecutionModes {
  data: ExecutionMode[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}
