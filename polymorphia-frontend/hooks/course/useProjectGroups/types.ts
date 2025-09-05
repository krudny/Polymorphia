import { ProjectGroupResponseDTO } from "@/interfaces/api/temp";

export interface UseProjectGroups {
  data: ProjectGroupResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
