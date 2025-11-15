import { StudentGradableEventResponseDTO } from "@/interfaces/api/gradable_event/types";

export interface UseStudentsGradableEvents {
  data: StudentGradableEventResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
