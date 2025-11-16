import { useQuery } from "@tanstack/react-query";
import CourseGroupsService from "@/services/course-groups";
import { UseStudentSummary } from "@/hooks/course/useStudentSummary/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useStudentSummary(userId: number): UseStudentSummary {
  const { courseId } = useUserDetails();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentSummary", userId],
    queryFn: () => CourseGroupsService.getStudentSummary(courseId, userId),
    refetchOnWindowFocus: false,
    enabled: userId !== null,
  });

  return { data, isLoading, isError };
}
