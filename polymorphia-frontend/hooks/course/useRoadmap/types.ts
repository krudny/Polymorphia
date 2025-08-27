import { StudentGradableEventResponseDTO } from "@/interfaces/api/course";

export interface UseRoadmap {
  data: StudentGradableEventResponseDTO[] | undefined;
  isLoading: boolean;
}