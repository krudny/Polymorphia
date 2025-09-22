import {z} from "zod";

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
  firstName: z.string().min(2, "Imię musi mieć co najmniej 2 znaki"),
  lastName: z.string().min(2, "Nazwisko musi mieć co najmniej 2 znaki"),
  email: emailField,
  indexNumber: z.number(),
});