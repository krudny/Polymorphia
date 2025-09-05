import { GradeResponseDTO } from "@/interfaces/api/grade";

export interface UseGrade {
  data: GradeResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
