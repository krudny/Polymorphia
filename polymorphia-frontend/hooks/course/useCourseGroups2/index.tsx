import {useQuery} from "@tanstack/react-query";
import {CourseService} from "@/app/(logged-in)/course/CourseService";
import {UseCourseGroups2} from "@/hooks/course/useCourseGroups2/types";

export default function useCourseGroups2(courseId: number, userId: number): UseCourseGroups2 {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseGroups2", courseId, userId],
    queryFn: () => CourseService.getCourseGroups2(courseId, userId),
  });

  return { data, isLoading, isError };
}
