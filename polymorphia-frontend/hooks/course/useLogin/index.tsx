import { useMutation, useQueryClient } from "@tanstack/react-query";
import AuthService from "@/services/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import UserService from "@/services/user";
import { redirectToNextStep } from "@/app/(welcome)/redirectHandler";
import { LoginDTO } from "@/interfaces/api/login";

export default function useLogin() {
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
    },
  });

  return { mutation };
}
