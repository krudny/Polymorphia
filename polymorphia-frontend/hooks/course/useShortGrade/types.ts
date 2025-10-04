import { ShortGradeResponseDTO } from "@/interfaces/api/grade/grade";

export interface UseShortGrade {
  data: ShortGradeResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
