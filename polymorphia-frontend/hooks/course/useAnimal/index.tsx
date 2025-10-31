import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/user";
import { UseHasAnimalInGroup } from "@/hooks/course/useAnimal/types";

export default function useHasAnimalInGroup(
  courseId: number
): UseHasAnimalInGroup {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hasAnimalInGroup", courseId],
    queryFn: () => UserService.hasValidAnimalInCourse(courseId),
  });

  return { data, isLoading, error };
}
