import { API_HOST } from "@/services/api";
import {
  ChangePasswordDTO,
  ForgotPasswordRequestDTO,
  ResetPasswordRequestDTO,
} from "@/interfaces/api/password";

const PasswordService = {
  // todo: check
  changePassword: async (request: ChangePasswordDTO): Promise<void> => {
    const response = await fetch(`${API_HOST}/password/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się zmienić hasła!");
    }
  },

  forgotPassword: async (request: ForgotPasswordRequestDTO): Promise<void> => {
    const response = await fetch(`${API_HOST}/password/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się wysłać maila resetującego hasło!");
    }
  },

  resetPassword: async (request: ResetPasswordRequestDTO): Promise<void> => {
    const response = await fetch(`${API_HOST}/password/new-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Nie udało się zmienić hasła!");
    }
  },
};

export default PasswordService;
