import { TargetResponseDTO } from "@/interfaces/api/target";

export interface UseTargets {
  data: TargetResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export interface UseTargetsParams {
  search?: string;
  sortBy?: string[];
  sortOrder?: string[];
  groups?: string[];
  gradeStatus?: string[];
}
