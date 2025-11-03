import { useQuery } from "@tanstack/react-query";
import { AvailableCoursesDTO } from "@/interfaces/api/user-context";
import { CourseService } from "@/services/course";
import { UseAvailableCourses } from "./types";

export default function useAvailableCourses(): UseAvailableCourses {
  const { data, isLoading, isError } = useQuery<AvailableCoursesDTO[]>({
    queryKey: ["availableCourses"],
    queryFn: () => CourseService.getAvailableCourses(),
  });

  return { data, isLoading, isError };
}
