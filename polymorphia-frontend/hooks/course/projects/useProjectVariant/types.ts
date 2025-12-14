import { ProjectVariantResponseDTO } from "@/interfaces/api/project";
import { TargetRequestDTO } from "@/interfaces/api/target";

export interface UseProjectVariant {
  data: ProjectVariantResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export interface UseProjectVariantProps {
  target: TargetRequestDTO | null;
}
