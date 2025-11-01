import { useQuery } from "@tanstack/react-query";
import { UseStudentLastActivity } from "@/hooks/course/useStudentLastActivity/types";
import CourseGroupsService from "@/services/course-groups";

export default function useStudentLastActivity(
  userId: number
): UseStudentLastActivity {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentLastActivity", userId],
    queryFn: () => CourseGroupsService.getStudentLastActivity(userId),
  });

  return { data, isLoading, isError };
}
