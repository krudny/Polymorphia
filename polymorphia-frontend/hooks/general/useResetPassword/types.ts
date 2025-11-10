import { ResetPasswordRequestDTO } from "@/interfaces/api/password";
import { UseMutationResult } from "@tanstack/react-query";

export interface UseResetPassword {
  mutation: UseMutationResult<void, Error, ResetPasswordRequestDTO>;
}
