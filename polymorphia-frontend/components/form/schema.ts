import { z } from "zod";

export const emailField = z.string().email("Nieprawidłowy email");

export const loginSchema = z.object({
  email: emailField,
  password: z.string(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});
