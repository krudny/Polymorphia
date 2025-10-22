import { UseMutationResult } from "@tanstack/react-query";
import { ChangePasswordDTO } from "@/interfaces/api/user";

export interface UseChangePasswordProps {
  form: {
    reset: () => void;
  };
}

export interface UseChangePassword {
  mutation: UseMutationResult<void, Error, ChangePasswordDTO>;
}
