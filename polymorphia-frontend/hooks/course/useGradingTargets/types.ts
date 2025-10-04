import { TargetResponseDTO } from "@/interfaces/api/grade/target";

export interface UseGradingTargets {
  data: TargetResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
