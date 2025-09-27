import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UseLoginProps } from "@/hooks/course/useLogin/types";
import UserService from "@/app/(logged-in)/profile/UserService";
import usePreferredCourseUpdate from "@/hooks/course/usePreferredCourseUpdate";
import { redirectToNextStep } from "@/app/(welcome)/redirectHandler";

export default function useLogin({ form }: UseLoginProps) {
  const router = useRouter();
  const updatePreferredCourse = usePreferredCourseUpdate({
    shouldRedirectToMainPage: true,
  });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: async () => {
      toast.success("Zalogowano pomyślnie!");

      await queryClient.invalidateQueries({
        queryKey: ["userRole"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["userCourses"],
      });

      const userRole = await queryClient.fetchQuery({
        queryKey: ["userRole"],
        queryFn: UserService.getUserRole,
      });

      redirectToNextStep({
        userRole: userRole,
        defaultRedirect: "/welcome",
        router: router,
      });

      form.reset();
    },
    onError: (error: Error) => {
      toast.error(`Wystąpił błąd! ${error.message}`);
    },
  });
}
