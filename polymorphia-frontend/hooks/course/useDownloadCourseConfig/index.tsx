import { useMutation } from "@tanstack/react-query";
import { CourseService } from "@/services/course";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import toast from "react-hot-toast";
import { UseCourseDownload } from "@/hooks/course/useDownloadCourseConfig/types";

export default function useDownloadCourseConfig(): UseCourseDownload {
  const { courseId } = useUserDetails();

  return useMutation<void, Error, void>({
    mutationFn: () => {
      const promise = CourseService.downloadCourseConfig(courseId);

      return toast.promise(promise, {
        loading: "Pobieranie konfiguracji...",
        success: "Konfiguracja pobrana pomyślnie",
      });
    },
  });
}
