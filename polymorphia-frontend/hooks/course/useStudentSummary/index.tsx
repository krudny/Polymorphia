import { useQuery } from "@tanstack/react-query";
import CourseGroupsService from "@/services/course-groups";
import { UseStudentSummary } from "@/hooks/course/useStudentSummary/types";

export default function useStudentSummary(userId: number): UseStudentSummary {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentSummary", userId],
    queryFn: () => CourseGroupsService.getStudentSummary(userId),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });

  return { data, isLoading, isError };
}
