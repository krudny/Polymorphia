import { useQuery } from "@tanstack/react-query";
import CourseGroupsService from "@/services/course-groups";
import { UseStudentChest } from "@/hooks/course/useStudentChests/types";

export default function useStudentChests(
  userId: number | null
): UseStudentChest {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentChest", userId],
    queryFn: () => CourseGroupsService.getStudentChests(userId!),
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });

  return { data, isLoading, isError };
}
