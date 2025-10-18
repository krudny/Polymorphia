import { BaseGradableEventResponseDTO } from "@/interfaces/api/course";

export interface UseGradableEvent {
  data: BaseGradableEventResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
