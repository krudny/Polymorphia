import { InstructorGradableEventResponseDTO } from "@/interfaces/api/course";

export interface UseInstructorGradableEvents {
  data: InstructorGradableEventResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

