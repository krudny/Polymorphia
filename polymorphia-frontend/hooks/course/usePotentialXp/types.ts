import { ChestPotentialXpResponseDTOWithType } from "@/interfaces/api/equipment";

export interface UsePotentialXp {
  data: ChestPotentialXpResponseDTOWithType | undefined;
  isLoading: boolean;
  isError: boolean;
}
