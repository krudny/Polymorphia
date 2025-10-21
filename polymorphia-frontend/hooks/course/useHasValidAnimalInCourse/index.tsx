import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/user";
import { UseHasValidAnimalInCourse } from "@/hooks/course/useHasValidAnimalInCourse/types";

export default function useHasValidAnimalInCourse(
  courseId: number
): UseHasValidAnimalInCourse {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hasAnimalInCourse", courseId],
    queryFn: () => UserService.hasValidAnimalInCourse(courseId),
  });

  return { data, isLoading, error };
}
