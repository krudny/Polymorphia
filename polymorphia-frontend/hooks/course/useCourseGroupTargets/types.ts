import { TargetResponseDTO } from "@/interfaces/api/target";

export interface UseCourseGroupTargets {
  data: TargetResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export interface UseCourseGroupTargetsParams {
  search?: string;
  sortBy?: string[];
  sortOrder?: string[];
  searchBy?: string[];
}
