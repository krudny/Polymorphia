import { InstructorGradableEventResponseDTO } from "@/interfaces/api/gradable_event/types";

export interface UseInstructorGradableEvents {
  data: InstructorGradableEventResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
