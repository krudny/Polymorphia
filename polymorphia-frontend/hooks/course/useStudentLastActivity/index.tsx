import { useQuery } from "@tanstack/react-query";
import { UseStudentLastActivity } from "@/hooks/course/useStudentLastActivity/types";
import CourseGroupsService from "@/services/course-groups";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useStudentLastActivity(
  userId: number
): UseStudentLastActivity {
  const { courseId } = useUserDetails();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentLastActivity", userId],
    queryFn: () => CourseGroupsService.getStudentLastActivity(userId, courseId),
    enabled: userId !== null,
  });

  return { data, isLoading, isError };
}
