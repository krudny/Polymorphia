import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UseRegister } from "./types";
import UserService from "@/app/(logged-in)/profile/UserService";
import { RegisterRequestDTO } from "@/interfaces/api/user";

export default function useRegister(): UseRegister {
  const mutation = useMutation<void, Error, RegisterRequestDTO>({
    mutationFn: (request: RegisterRequestDTO) => {
      return toast.promise(UserService.register(request), {
        loading: "Rejestracja...",
        success: "Utworzono konto!",
        error: (error) => error.message,
      });
    },
  });

  return { mutation };
}
