import { StudentGradableEventResponseDTO } from "@/interfaces/api/course";

export interface UseStudentsGradableEvents {
  data: StudentGradableEventResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
