import { useQuery } from "@tanstack/react-query";
import TaskService from "@/services/tasks";
import { UseTaskDetails } from "@/hooks/course/tasks/useTaskDetails/types";
import { mapTaskDetailsResponse } from "./mapper";

export default function useTaskDetails(taskId: number): UseTaskDetails {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["taskDetails", taskId],
    queryFn: () => TaskService.getTaskDetails(taskId),
    select: mapTaskDetailsResponse,
    enabled: !!taskId,
  });

  return { data, isLoading, isError, error };
}
