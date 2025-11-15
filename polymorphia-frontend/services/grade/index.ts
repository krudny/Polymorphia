import { TargetRequestDTO } from "@/interfaces/api/target";
import {
  GradeRequestDTO,
  ShortGradeResponseDTO,
} from "@/interfaces/api/grade/grade";
import { ApiClient } from "@/services/api/client";

export const GradeService = {
  getShortGrade: async (
    target: TargetRequestDTO,
    gradableEventId: number
  ): Promise<ShortGradeResponseDTO> => {
    return await ApiClient.post<ShortGradeResponseDTO>(
      `/grading/short-grade?gradableEventId=${gradableEventId}`,
      { target }
    );
  },

  submitGrade: async (gradeData: GradeRequestDTO): Promise<void> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
  },
};
