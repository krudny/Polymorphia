import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {UseInviteStudent} from "./types";
import UserService from "@/app/(logged-in)/profile/UserService";
import {InviteStudentRequestDTO} from "@/interfaces/api/user";
import useModalContext from "@/hooks/contexts/useModalContext";

export default function useInviteStudent(): UseInviteStudent {
  const { closeModal } = useModalContext();
  const mutation = useMutation<
    void,
    Error,
    InviteStudentRequestDTO
  >({
    mutationFn: (request) => UserService.inviteStudent(request),
    onSuccess: () => {
      toast.success("Wysłano zaproszenie na maila!");
      closeModal();
    },
    onError: ({ message }: Error) => {
      toast.error(message);
    },
  });

  return { mutation };
}
