import { BaseGradableEventResponseDTO } from "@/interfaces/api/gradable_event/types";

export interface UseGradableEvent {
  data: BaseGradableEventResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
