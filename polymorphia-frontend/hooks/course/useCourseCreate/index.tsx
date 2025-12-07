import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseService } from "@/services/course";
import toast from "react-hot-toast";
import { UseCourseCreate } from "@/hooks/course/useCourseCreate/types";
import { UpdateCourseConfigVariables } from "@/hooks/course/useCourseUpdate/types";

export default function useCourseCreate(): UseCourseCreate {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file }: UpdateCourseConfigVariables) => {
      const promise = CourseService.createCourse(file);

      return toast.promise(promise, {
        loading: "Tworzenie kursu...",
        success: "Kurs utworzony pomyślnie",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["availableCourses"] });
    },
  });
}
