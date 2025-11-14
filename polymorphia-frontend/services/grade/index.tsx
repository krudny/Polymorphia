import { TargetRequestDTO } from "@/interfaces/api/target";
import {
  GradeRequestDTO,
  ShortGradeResponseDTO,
} from "@/interfaces/api/grade/grade";
import { API_HOST } from "@/services/api";

export const GradeService = {
  getShortGrade: async (
    target: TargetRequestDTO,
    gradableEventId: number
  ): Promise<ShortGradeResponseDTO> => {
    const response = await fetch(
      `${API_HOST}/grading/short-grade?gradableEventId=${gradableEventId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ target }),
      }
    );

    if (!response.ok) {
      throw new Error("Nie udało się pobrać ocen!");
    }

    return await response.json();
  },

  submitGrade: async (gradeData: GradeRequestDTO): Promise<void> => {
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
  },
};
