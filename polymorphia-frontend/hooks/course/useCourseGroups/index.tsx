import {useQuery} from "@tanstack/react-query";
import {CourseService} from "@/app/(logged-in)/course/CourseService";
import {UseCourseGroups} from "@/hooks/course/useCourseGroups/types";

export default function useCourseGroups(courseId: number): UseCourseGroups {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseGroups", courseId],
    queryFn: () => CourseService.getCourseGroups(courseId),
  });

  return { data, isLoading, isError };
}
