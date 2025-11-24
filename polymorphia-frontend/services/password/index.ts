import {
  ChangePasswordDTO,
  ForgotPasswordRequestDTO,
  ResetPasswordRequestDTO,
} from "@/interfaces/api/password";
import { ApiClient } from "@/services/api/client";

const PasswordService = {
  changePassword: async (request: ChangePasswordDTO): Promise<void> => {
    return ApiClient.post("/password/change-password", request);
  },

  forgotPassword: async (request: ForgotPasswordRequestDTO): Promise<void> => {
    return ApiClient.post("/password/forgot-password", request);
  },

  resetPassword: async (request: ResetPasswordRequestDTO): Promise<void> => {
    return ApiClient.post("/password/new-password", request);
  },
};

export default PasswordService;
