import { z } from "zod";
import { Roles } from "@/interfaces/api/user";

export const emailField = z.string().email("Nieprawidłowy email");

export const loginSchema = z.object({
  email: emailField,
  password: z.string(),
});

export const registerSchema = z.object({
  password: z.string(),
});

export const inviteSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  role: z.nativeEnum(Roles),
  email: emailField,
  courseId: z.number(),
});
