import { TargetResponseDTO } from "@/interfaces/api/target";

export interface UseGradingTargets {
  data: TargetResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
