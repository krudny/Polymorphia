import { z } from "zod";

export const emailField = z.string().email("Nieprawidłowy email");

export const loginSchema = z.object({
  email: emailField,
  password: z.string(),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Stare hasło jest wymagane"),
    newPassword: z
      .string()
      .min(7, "Nowe hasło musi mieć minimum 7 znaków")
      .max(16, "Nowe hasło musi mieć maksymalnie 16 znaków"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Hasła nie są zgodne",
    path: ["confirmNewPassword"],
  });
