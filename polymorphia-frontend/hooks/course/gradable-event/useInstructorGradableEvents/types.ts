import { TeachingRoleGradableEventResponseDTO } from "@/interfaces/api/gradable_event/types";

export interface UseInstructorGradableEvents {
  data: TeachingRoleGradableEventResponseDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}
