import { useQuery } from "@tanstack/react-query";
import { UseCourseGroup } from "./types";
import UserService from "@/app/(logged-in)/profile/UserService";

export default function useCourseGroup(courseId: number): UseCourseGroup {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseGroup", courseId],
    queryFn: () => UserService.getCourseGroup(courseId),
  });

  return { data, isLoading, isError };
}
