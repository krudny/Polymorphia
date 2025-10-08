import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/(logged-in)/profile/UserService";
import { UseIsAnimalValid } from "@/hooks/course/useAnimal/types";

export default function useIsAnimalValid(courseId: number): UseIsAnimalValid {
  const { data, isLoading, error } = useQuery({
    queryKey: ["isAnimalValid", courseId],
    queryFn: () => UserService.isAnimalValid(courseId),
  });

  return { data, isLoading, error };
}
