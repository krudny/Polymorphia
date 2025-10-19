import { z } from "zod";

export const emailField = z.string().email("Nieprawidłowy email");

export const loginSchema = z.object({
  email: emailField,
  password: z.string(),
});

const passwordValidation = z
  .string()
  .min(8, "Hasło musi mieć co najmniej 8 znaków")
  .max(256, "Hasło może mieć maksymalnie 256 znaków")
  .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną wielką literę")
  .regex(/[a-z]/, "Hasło musi zawierać co najmniej jedną małą literę")
  .regex(/[0-9]/, "Hasło musi zawierać co najmniej jedną cyfrę")
  .regex(
    /[^A-Za-z0-9]/,
    "Hasło musi zawierać co najmniej jeden znak specjalny"
  );

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Stare hasło jest wymagane"),
    newPassword: passwordValidation,
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Hasła nie są zgodne",
    path: ["confirmNewPassword"],
  });
