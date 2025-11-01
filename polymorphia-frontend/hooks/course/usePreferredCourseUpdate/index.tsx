import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  UsePreferredCourseUpdate,
  UsePreferredCourseUpdateProps,
} from "@/hooks/course/usePreferredCourseUpdate/types";
import { UserDetailsDTO } from "@/interfaces/api/user";
import { redirectToNextStep } from "@/app/(welcome)/redirectHandler";
import useFetch from "@/hooks/general/useFetch";

export default function usePreferredCourseUpdate({
  shouldRedirectToMainPage,
}: UsePreferredCourseUpdateProps): UsePreferredCourseUpdate {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { fetch: fetchFn } = useFetch();
  const setPreferredCourseMutation = useMutation({
    mutationFn: (courseId: number) =>
      userService.setUserPreferredCourse(fetchFn, courseId),
    onSuccess: async () => {
      toast.success("Aktywny kurs został zmieniony!");
      await queryClient.invalidateQueries();

      const { userRole } = await queryClient.fetchQuery<UserDetailsDTO>({
        queryKey: ["currentUser"],
        queryFn: () => userService.getCurrentUser(fetchFn),
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
