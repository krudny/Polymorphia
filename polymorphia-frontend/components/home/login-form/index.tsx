"use client";

import React, { FormEvent } from "react";
import { useForm } from "@tanstack/react-form";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import NavigationArrow from "@/components/slider/NavigationArrow";
import { LoginDTO } from "@/interfaces/api/login";
import { FieldErrorMessage } from "@/components/form/FieldErrorMessage";
import { loginSchema } from "@/components/form/schema";
import "./index.css";
import useLogin from "@/hooks/course/useLogin";
import LoginFormProps from "@/components/home/login-form/types";

export default function LoginForm({ onBackAction }: LoginFormProps) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginDTO,
    validators: {
      onBlur: loginSchema,
    },
    onSubmit: async ({ value }) => {
      login.mutate(value);
    },
  });

  const { mutation: login } = useLogin();

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
          onSubmit={(event: FormEvent) => {
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
                  onChange={(event) => field.handleChange(event.target.value)}
                  required
                  autoComplete="off"
                  disabled={login.isPending}
                />
                <FieldErrorMessage field={field} />
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
                  onChange={(event) => field.handleChange(event.target.value)}
                  required
                  disabled={login.isPending}
                />
                <FieldErrorMessage field={field} />
              </div>
            )}
          </form.Field>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isPristine]}
          >
            {([canSubmit, isPristine]) => (
              <>
                <ButtonWithBorder
                  text={login.isPending ? "Logowanie..." : "Zaloguj się"}
                  className="mt-12"
                  isActive={!isPristine && canSubmit && !login.isPending}
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
