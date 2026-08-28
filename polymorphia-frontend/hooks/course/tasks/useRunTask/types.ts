import {
  ExecuteRequestDTO,
  ExecuteTaskResponseDTO,
} from "@/interfaces/api/tasks/types";

export interface UseRunTask {
  mutate: (payload: ExecuteRequestDTO) => void;
  isPending: boolean;
  isError: boolean;
  data: ExecuteTaskResponseDTO | undefined;
}
