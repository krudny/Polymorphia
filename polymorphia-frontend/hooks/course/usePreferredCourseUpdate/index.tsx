import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/app/(logged-in)/profile/UserService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  UsePreferredCourseUpdate,
  UsePreferredCourseUpdateProps,
} from "@/hooks/course/usePreferredCourseUpdate/types";
import { Roles, UserDetailsDTO } from "@/interfaces/api/user";
import { redirectToNextStep } from "@/app/(welcome)/redirectHandler";

export default function usePreferredCourseUpdate({
  shouldRedirectToMainPage,
}: UsePreferredCourseUpdateProps): UsePreferredCourseUpdate {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setPreferredCourseMutation = useMutation({
    mutationFn: (courseId: number) =>
      userService.setUserPreferredCourse(courseId),
    onSuccess: async () => {
      toast.success("Aktywny kurs został zmieniony!");
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      await queryClient.invalidateQueries({ queryKey: ["userRole"] });

      const { userRole } = await queryClient.fetchQuery<UserDetailsDTO>({
        queryKey: ["currentUser"],
        queryFn: () => userService.getCurrentUser(),
      });

      if (shouldRedirectToMainPage) {
        redirectToNextStep({
          userRole: userRole,
          defaultRedirect: "/",
          router: router,
        });
      }
    },
    onError: () => {
      toast.error("Nie udało się zmienić kursu!");
    },
  });

  return setPreferredCourseMutation.mutate;
}
