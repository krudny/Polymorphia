import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {UseRegister, UseRegisterParams} from "./types";
import UserService from "@/app/(logged-in)/profile/UserService";

export default function useRegister(): UseRegister {
  const mutation = useMutation<
    void,
    Error,
    UseRegisterParams
  >({
    mutationFn: ({ invitationToken, animalName, password }) => UserService.register(invitationToken, animalName, password),
    onError: ({ message }: Error) => {
      toast.error(message);
    },
  });

  return { mutation };
}
