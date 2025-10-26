import { useQuery } from "@tanstack/react-query";
import { UseStudentLastGradableEvents } from "@/hooks/course/useStudentLastGradableEvents/types";
import CourseGroupsService from "@/services/course-groups";

export default function useStudentLastGradableEvents(
  userId: number
): UseStudentLastGradableEvents {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentLastGradableEvents", userId],
    queryFn: () => CourseGroupsService.getStudentLastGradableEvents(userId),
  });

  return { data, isLoading, isError };
}
