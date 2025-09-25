import { TargetResponseDTO } from "@/interfaces/api/grade";

export interface UseGradingTargets {
  data: TargetResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
