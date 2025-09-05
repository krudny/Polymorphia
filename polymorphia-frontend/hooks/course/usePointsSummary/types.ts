import { PointsSummaryResponseDTO } from "@/interfaces/api/course/points-summary";

export interface UsePointsSummary {
  data: PointsSummaryResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
