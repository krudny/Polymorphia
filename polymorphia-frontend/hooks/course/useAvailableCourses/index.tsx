import { useQuery } from "@tanstack/react-query";
import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { CourseService } from "@/services/course";
import { UseAvailableCourses } from "./types";
import useFetch from "@/hooks/general/useFetch";

export default function useAvailableCourses(): UseAvailableCourses {
  const { fetch: fetchFn } = useFetch();
  const { data, isLoading, isError } = useQuery<AvailableCoursesDTO[]>({
    queryKey: ["availableCourses"],
    queryFn: () => CourseService.getAvailableCourses(fetchFn),
  });

  return { data, isLoading, isError };
}
