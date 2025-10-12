import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UseRegister } from "./types";
import UserService from "@/app/(logged-in)/profile/UserService";
import { RegisterRequestDTO, Roles } from "@/interfaces/api/user";
import { redirectToNextStep } from "@/app/(welcome)/redirectHandler";
import { useRouter } from "next/navigation";

export default function useRegister(): UseRegister {
  const router = useRouter();

  const mutation = useMutation<void, Error, RegisterRequestDTO>({
    mutationFn: (request: RegisterRequestDTO) => {
      return toast.promise(UserService.register(request), {
        loading: "Rejestracja...",
        success: "Utworzono konto!",
        error: (error) => error.message,
      });
    },
    onSuccess: () => {
      redirectToNextStep({
        userRole: Roles.UNDEFINED,
        defaultRedirect: "/welcome",
        router: router,
      });
    },
  });

  return { mutation };
}
