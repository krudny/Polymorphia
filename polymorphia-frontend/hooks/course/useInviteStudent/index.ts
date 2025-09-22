import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {UseInviteStudent} from "./types";
import UserService from "@/app/(logged-in)/profile/UserService";
import {InviteStudentRequestDTO} from "@/interfaces/api/user";

export default function useInviteStudent(): UseInviteStudent {
  const mutation = useMutation<
    void,
    Error,
    InviteStudentRequestDTO
  >({
    mutationFn: (request) => UserService.inviteStudent(request),
    onError: ({ message }: Error) => {
      toast.error(message);
    },
  });

  return { mutation };
}
