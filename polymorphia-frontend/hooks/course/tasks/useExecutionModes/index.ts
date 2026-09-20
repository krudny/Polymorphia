import { useQuery } from "@tanstack/react-query";
import TaskService from "@/services/tasks";
import type { UseExecutionModes } from "./types";

export default function useExecutionModes(): UseExecutionModes {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["executionModes"],
    queryFn: TaskService.getExecutionModes,
    staleTime: 1000 * 60 * 10,
  });

  return { data, isLoading, isError, error };
}
