import { useQuery } from "@tanstack/react-query";
import { UseCourseGroup } from "./types";
import UserService from "@/services/user";
import useFetch from "@/hooks/general/useFetch";

export default function useCourseGroup(courseId: number): UseCourseGroup {
  const { fetch: fetchFn } = useFetch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseGroup", courseId],
    queryFn: () => UserService.getCourseGroup(fetchFn, courseId),
  });

  return { data, isLoading, isError };
}
