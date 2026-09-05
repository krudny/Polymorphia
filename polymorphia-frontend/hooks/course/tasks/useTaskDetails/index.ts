import { useQuery } from "@tanstack/react-query";
import TaskService from "@/services/tasks";
import { UseTaskDetails } from "@/hooks/course/tasks/useTaskDetails/types";

export default function useTaskDetails(taskId: number): UseTaskDetails {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["taskDetails", taskId],
    queryFn: () => TaskService.getTaskDetails(taskId),
    enabled: !!taskId,
  });

  return { data, isLoading, isError, error };
}
