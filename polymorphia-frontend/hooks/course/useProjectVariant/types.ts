import { ProjectVariantResponseDTO } from "@/interfaces/api/course/project";

export interface UseProjectVariant {
  data: ProjectVariantResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

