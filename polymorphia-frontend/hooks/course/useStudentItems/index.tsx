import { useQuery } from "@tanstack/react-query";
import CourseGroupsService from "@/services/course-groups";
import { UseStudentItems } from "@/hooks/course/useStudentItems/types";

export default function useStudentItems(
  userId: number | null
): UseStudentItems {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentItems", userId],
    queryFn: () => CourseGroupsService.getStudentItems(userId!),
    refetchOnWindowFocus: false,
    enabled: userId !== null,
  });

  return { data, isLoading, isError };
}
