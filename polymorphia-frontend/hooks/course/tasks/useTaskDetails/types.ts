import { TaskDetailsResponseDTO } from "@/interfaces/api/tasks/types";

export interface UseTaskDetails {
  data: TaskDetailsResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}
