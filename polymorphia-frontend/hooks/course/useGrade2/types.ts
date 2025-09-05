import { GradeResponseDTO } from "@/interfaces/api/grade";

export interface UseGrade2 {
  data: GradeResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
