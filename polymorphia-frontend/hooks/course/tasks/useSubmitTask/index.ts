import { useMutation } from "@tanstack/react-query";
import { ExecuteRequestDTO } from "@/interfaces/api/tasks/types";
import { UseSubmitTask } from "@/hooks/course/tasks/useSubmitTask/types";
import TaskService from "@/services/tasks";

export default function useSubmitTask(taskId: number): UseSubmitTask {
  const { mutateAsync, reset, isPending, isError, data } = useMutation({
    mutationFn: (payload: ExecuteRequestDTO) =>
      TaskService.submitTask(taskId, payload),
  });

  return { mutateAsync, reset, isPending, isError, data };
}
