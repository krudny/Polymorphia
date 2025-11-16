import { useQuery } from "@tanstack/react-query";
import CourseGroupsService from "@/services/course-groups";
import { UseStudentItems } from "@/hooks/course/useStudentItems/types";
import useUserContext, {
  useUserDetails,
} from "@/hooks/contexts/useUserContext";
import { Roles } from "@/interfaces/api/user";

export default function useStudentItems(
  userId: number | null
): UseStudentItems {
  const { courseId } = useUserDetails();
  const { userRole } = useUserContext();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["studentItems", userId],
    queryFn: () => CourseGroupsService.getStudentItems(courseId, userId!),
    refetchOnWindowFocus: false,
    enabled:
      userId !== null &&
      (userRole === Roles.INSTRUCTOR || userRole === Roles.COORDINATOR),
  });

  return { data, isLoading, isError, refetch };
}
