import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/app/(logged-in)/profile/UserService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  UsePreferredCourseUpdate,
  UsePreferredCourseUpdateProps,
} from "@/hooks/course/usePreferredCourseUpdate/types";
import { Roles, UserDetailsDTO } from "@/interfaces/api/user";

export default function usePreferredCourseUpdate({
  redirectPage,
}: UsePreferredCourseUpdateProps): UsePreferredCourseUpdate {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setPreferredCourseMutation = useMutation({
    mutationFn: (courseId: number) =>
      userService.setUserPreferredCourse(courseId),
    onSuccess: async () => {
      toast.success("Aktywny kurs został zmieniony!");

      const currentUser = await queryClient.fetchQuery<UserDetailsDTO>({
        queryKey: ["currentUser"],
        queryFn: () => userService.getCurrentUser(),
      });

      if (redirectPage) {
        if (currentUser?.userRole === Roles.STUDENT) {
          router.push("/profile");
        } else {
          router.push("/dashboard");
        }
      }
    },
    onError: () => {
      toast.error("Nie udało się zmienić kursu!");
    },
  });

  return setPreferredCourseMutation.mutate;
}
