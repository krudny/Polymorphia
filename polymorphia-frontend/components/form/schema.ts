import { z } from "zod";

export const emailField = z.string().email("Nieprawidłowy email");

export const loginSchema = z.object({
  email: emailField,
  password: z.string(),
});

export const registerSchema = z.object({
  animalName: z.string(),
  password: z.string(),
});

export const inviteStudentSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: emailField,
  indexNumber: z.number(),
});
