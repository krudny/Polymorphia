import { z } from "zod";

export const emailField = z.string().email("Nieprawidłowy email");
export const passwordField = z
  .string()
  .min(8, "Hasło musi mieć przynajmniej 8 znaków.");

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});
