import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UseLoginProps } from "@/hooks/course/useLogin/types";
import UserService from "@/app/(logged-in)/profile/UserService";
import { redirectToNextStep } from "@/app/(welcome)/redirectHandler";
import { LoginDTO } from "@/interfaces/api/login";

export default function useLogin({ form }: UseLoginProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: LoginDTO) => {
      return toast.promise(AuthService.login(data), {
        loading: "Logowanie...",
        success: "Zalogowano pomyślnie!",
        error: () => `Wystąpił błąd przy zalogowaniu!`,
      });
    },
    onSuccess: async () => {
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

      setTimeout(() => form.reset(), 1000);
    },
  });

  return { mutation };
}
