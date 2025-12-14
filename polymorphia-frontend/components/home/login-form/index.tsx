"use client";

import React, { FormEvent, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import ButtonWithBorder from "@/components/button";
import NavigationArrow from "@/components/slider/NavigationArrow";
import { LoginDTO } from "@/interfaces/api/login";
import { FieldErrorMessage } from "@/components/form/FieldErrorMessage";
import { loginSchema } from "@/components/form/schema";
import "./index.css";
import useLogin from "@/hooks/course/auth/useLogin";
import LoginFormProps from "@/components/home/login-form/types";
import ForgotPasswordModal from "@/components/home/modals/forgot-password";
import { useEnterListener } from "@/hooks/general/useEnterListener";

export default function LoginForm({ onBackAction }: LoginFormProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const formContainerRef = useRef<HTMLDivElement>(null);
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
  useEnterListener(() => form.handleSubmit(), formContainerRef);

  return (
    <>
      <div className="login-wrapper">
        <NavigationArrow
          direction="left"
          onClick={onBackAction}
          className="cursor-pointer left-0"
        />
        <div ref={formContainerRef}>
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
                    type="submit"
                    className="mt-12"
                    isActive={!isPristine && canSubmit && !login.isPending}
                  />
                </>
              )}
            </form.Subscribe>
          </form>
          <div className="forgot-password" onClick={() => setIsModalOpen(true)}>
            <p>Zapomniałeś hasła?</p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ForgotPasswordModal onClosedAction={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
