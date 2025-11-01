import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/user";
import { UseHasValidAnimalInCourse } from "@/hooks/course/useHasValidAnimalInCourse/types";
import useFetch from "@/hooks/general/useFetch";

export default function useHasValidAnimalInCourse(
  courseId: number
): UseHasValidAnimalInCourse {
  const { fetch: fetchFn } = useFetch();
  const { data, isLoading, error } = useQuery({
    queryKey: ["hasAnimalInCourse", courseId],
    queryFn: () => UserService.hasValidAnimalInCourse(fetchFn, courseId),
  });

  return { data, isLoading, error };
}
