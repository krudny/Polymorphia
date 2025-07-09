"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import NavigationArrow from "@/components/slider/NavigationArrow";
import { LoginDto } from "@/interfaces/api/DTO";
import { FieldInfo } from "@/components/form/FieldInfo";
import { loginSchema } from "@/components/form/schema";
import AuthService from "@/services/AuthService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import "./index.css";
import LoginFormProps from "@/components/home/types";

export default function LoginForm({ onBackAction }: LoginFormProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginDto,
    validators: {
      onBlur: loginSchema,
    },
    onSubmit: async ({ value }) => {
      loginMutation.mutate(value);
    },
  });

  const loginMutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: () => {
      toast.success("Zalogowano pomyślnie!");
      router.push("/profile");
      form.reset();
    },
    onError: (error: Error) => {
      toast.error(`Wystąpił błąd! ${error.message}`);
    },
  });

  return (
    <div className="login-wrapper">
      <NavigationArrow
        direction="left"
        onClick={onBackAction}
        className="cursor-pointer left-0"
      />
      <div>
        <form
          className="login-form"
          onSubmit={(event: React.FormEvent) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="email">
            {(field) => (
              <div>
                <input
                  type="email"
                  id={field.name}
                  placeholder="Twój email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                  autoComplete="off"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <div>
                <input
                  type="password"
                  id={field.name}
                  placeholder="Twoje hasło"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  required
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isPristine]}
          >
            {([canSubmit, isPristine]) => (
              <>
                <ButtonWithBorder
                  text="Zaloguj się"
                  className="mt-12"
                  isActive={isPristine || !canSubmit}
                  forceDark
                />
              </>
            )}
          </form.Subscribe>
        </form>
        <div className="forgot-password">
          <p>Zapomniałeś hasła?</p>
        </div>
      </div>
    </div>
  );
}
