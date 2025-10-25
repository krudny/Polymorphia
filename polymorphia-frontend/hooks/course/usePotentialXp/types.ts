import { PointsSummaryResponseDTO } from "@/interfaces/api/course/points-summary";
import { ChestPotentialXpResponseDTOWithType } from "@/interfaces/api/equipment";

export interface UsePotentialXp {
  data: ChestPotentialXpResponseDTOWithType | undefined;
  isLoading: boolean;
  isError: boolean;
}
