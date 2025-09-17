import { ShortGradeResponseDTO, TargetTypes } from "@/interfaces/api/grade";

export interface UseShortGrade {
  data: ShortGradeResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}

export type TargetRequestDTO =
  | { type: typeof TargetTypes.STUDENT; id: number }
  | { type: typeof TargetTypes.STUDENT_GROUP; groupId: number };
