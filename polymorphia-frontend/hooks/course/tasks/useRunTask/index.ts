import { useMutation } from "@tanstack/react-query";
import { ExecuteRequestDTO } from "@/interfaces/api/tasks/types";
import { UseRunTask } from "@/hooks/course/tasks/useRunTask/types";
import TaskService from "@/services/tasks";

export default function useRunTask(taskId: number): UseRunTask {
  const { mutate, isPending, isError, data } = useMutation({
    mutationFn: (payload: ExecuteRequestDTO) =>
      TaskService.runTask(taskId, payload),
  });

  return { mutate, isPending, isError, data };
}
