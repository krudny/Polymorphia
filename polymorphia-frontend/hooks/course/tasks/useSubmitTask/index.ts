import { useMutation } from "@tanstack/react-query";
import { ExecuteResponseDTO } from "@/interfaces/api/tasks/types";
import {
  UseSubmitTask,
  UseSubmitTaskProps,
} from "@/hooks/course/tasks/useSubmitTask/types";
import { TaskService } from "@/services/tasks";

//TODO: to refactor
function formatOutput(res: ExecuteResponseDTO): string {
  const parts: string[] = [];

  if (res.stdout) {
    parts.push(res.stdout);
  }
  if (res.stderr) {
    parts.push(res.stderr);
  }
  if (res.exitCode !== 0) {
    parts.push(`Proces zakończony kodem ${res.exitCode}`);
  }

  return parts.join("\n").trimEnd() || "Brak wyjścia";
}

export default function useSubmitTask(
  request: UseSubmitTaskProps
): UseSubmitTask {
  const { mutate, isPending } = useMutation({
    mutationFn: TaskService.executeCode,
    onSuccess: (response) => {
      request.setOutput(formatOutput(response));
    },
    onError: (err) => {
      request.setOutput(err instanceof Error ? err.message : String(err));
    },
  });

  return { mutate, isPending };
}
