import {
  ExecuteRequestDTO,
  SubmitTaskResponseDTO,
} from "@/interfaces/api/tasks/types";

export interface UseSubmitTask {
  mutateAsync: (payload: ExecuteRequestDTO) => Promise<SubmitTaskResponseDTO>;
  reset: () => void;
  isPending: boolean;
  isError: boolean;
  data: SubmitTaskResponseDTO | undefined;
}
