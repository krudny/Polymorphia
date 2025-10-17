import { useQuery } from "@tanstack/react-query";
import { UseCourseGroup } from "./types";
import UserService from "@/services/user";

export default function useCourseGroup(courseId: number): UseCourseGroup {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseGroup", courseId],
    queryFn: () => UserService.getCourseGroup(courseId),
  });

  return { data, isLoading, isError };
}
