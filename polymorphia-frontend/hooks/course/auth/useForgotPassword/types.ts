import { ForgotPasswordRequestDTO } from "@/interfaces/api/password";
import { UseMutationResult } from "@tanstack/react-query";

export interface UseForgotPassword {
  mutation: UseMutationResult<void, Error, ForgotPasswordRequestDTO>;
}
