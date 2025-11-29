import { ProjectCategoryWithVariantsResponseDTO } from "@/interfaces/api/project";

export interface UseProjectVariants {
  data: ProjectCategoryWithVariantsResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
