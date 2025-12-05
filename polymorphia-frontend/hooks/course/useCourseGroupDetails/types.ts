import { UseQueryResult } from "@tanstack/react-query";
import { CourseGroupDetailsResponseDTO } from "@/interfaces/api/course-groups";

export interface UseCourseGroupDetails {
  data: CourseGroupDetailsResponseDTO | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<UseQueryResult<CourseGroupDetailsResponseDTO>>;
}
