import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/app/(logged-in)/profile/UserService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  UsePreferredCourseUpdate,
  UsePreferredCourseUpdateProps,
} from "@/hooks/course/usePreferredCourseUpdate/types";

export default function usePreferredCourseUpdate({
  redirectPage,
}: UsePreferredCourseUpdateProps): UsePreferredCourseUpdate {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setPreferredCourseMutation = useMutation({
    mutationFn: (courseId: number) =>
      userService.setUserPreferredCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("Aktywny kurs został zmieniony!");
      if (redirectPage) {
        router.push(redirectPage);
      }
    },
    onError: () => {
      toast.error("Nie udało się zmienić kursu!");
    },
  });

  return setPreferredCourseMutation.mutate;
}
