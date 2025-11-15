import { ProjectVariantResponseDTO } from "@/interfaces/api/project";

export interface UseProjectVariant {
  data: ProjectVariantResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
