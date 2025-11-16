import { useQuery } from "@tanstack/react-query";
import CourseGroupsService from "@/services/course-groups";
import { UseStudentItems } from "@/hooks/course/useStudentItems/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";

export default function useStudentItems(
  userId: number | null
): UseStudentItems {
  const { courseId } = useUserDetails();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentItems", userId],
    queryFn: () => CourseGroupsService.getStudentItems(courseId, userId!),
    refetchOnWindowFocus: false,
    enabled: userId !== null,
  });

  return { data, isLoading, isError };
}
