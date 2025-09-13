import { useMutation } from "@tanstack/react-query";
import AuthService from "@/services/AuthService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UseLoginProps } from "@/hooks/course/useLogin/types";

export default function useLogin({ form }: UseLoginProps) {
  const router = useRouter();
  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: () => {
      toast.success("Zalogowano pomyślnie!");
      router.push("/welcome");
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(`Wystąpił błąd! ${error.message}`);
    },
  });
}
