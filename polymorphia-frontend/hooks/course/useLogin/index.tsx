import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UseLoginProps } from "@/hooks/course/useLogin/types";
import UserService from "@/services/user";
import { redirectToNextStep } from "@/app/(welcome)/redirectHandler";
import { LoginDTO } from "@/interfaces/api/login";
import useFetch from "@/hooks/general/useFetch";

export default function useLogin({ form }: UseLoginProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { fetch: fetchFn } = useFetch();

  const mutation = useMutation({
    mutationFn: (data: LoginDTO) => {
      return toast.promise(AuthService.login(fetchFn, data), {
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
        queryFn: () => UserService.getUserRole(fetchFn),
      });

      redirectToNextStep({
        userRole: userRole,
        defaultRedirect: "/welcome",
        router: router,
      });
    },
  });

  return { mutation };
}
