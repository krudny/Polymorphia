import { useMutation } from "@tanstack/react-query";
import { CourseService } from "@/services/course";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import toast from "react-hot-toast";
import { UseCourseUpdate } from "@/hooks/course/useCourseUpdate/types";

export default function useCourseUpdate(): UseCourseUpdate {
  const { courseId } = useUserDetails();

  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const promise = CourseService.updateCourseConfig(courseId, file);

      return toast.promise(promise, {
        loading: "Przesyłanie konfiguracji...",
        success: "Konfiguracja zaktualizowana pomyślnie",
      });
    },
  });
}
