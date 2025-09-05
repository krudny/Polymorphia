import { ShortGradeResponseDTO } from "@/interfaces/api/grade";

export interface UseGrade3 {
  data: ShortGradeResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
