import { PointsSummaryResponseDTO } from "@/interfaces/api/points-summary";

export interface UsePointsSummary {
  data: PointsSummaryResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
}
