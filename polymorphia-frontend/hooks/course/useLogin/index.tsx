import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UseLoginProps } from "@/hooks/course/useLogin/types";
import UserService from "@/app/(logged-in)/profile/UserService";
import useUserCourses from "@/hooks/course/useUserCourses";
import usePreferredCourseUpdate from "@/hooks/course/usePreferredCourseUpdate";

export default function useLogin({ form }: UseLoginProps) {
  const router = useRouter();
  const updatePreferredCourse = usePreferredCourseUpdate({
    redirectPage: true,
  });

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: async () => {
      toast.success("Zalogowano pomyślnie!");
      const userRole = await UserService.getUserRole();
      const courses = await UserService.getUserCourses();

      if (courses.length === 1) {
        updatePreferredCourse(courses[0].id);
      } else if (userRole === "STUDENT") {
        router.push("/profile");
      } else if (userRole === "UNDEFINED") {
        router.push("/welcome");
      } else {
        router.push("/course/groups");
      }
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(`Wystąpił błąd! ${error.message}`);
    },
  });
}
