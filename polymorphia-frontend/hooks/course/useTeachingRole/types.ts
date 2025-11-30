import { TeachingRoleUserResponseDTO } from "@/interfaces/api/course-groups";

export interface UseTeachingRole {
  data: TeachingRoleUserResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}
