export interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ResetPasswordRequestDTO {
  newPassword: string;
  confirmNewPassword: string;
  token: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}
