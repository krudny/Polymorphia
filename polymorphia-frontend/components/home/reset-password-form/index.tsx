import React, { FormEvent } from "react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useForm } from "@tanstack/react-form";
import { resetPasswordSchema } from "@/components/form/schema";
import "./index.css";
import { FieldErrorMessage } from "@/components/form/FieldErrorMessage";
import useResetPassword from "@/hooks/general/useResetPassword";
import { ResetPasswordFormProps } from "@/components/home/reset-password-form/types";

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { mutation: resetPassword } = useResetPassword();
  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validators: {
      onBlur: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      resetPassword.mutate({
        newPassword: value.newPassword,
        confirmNewPassword: value.confirmNewPassword,
        token,
      });
    },
  });

  return (
    <div className="reset-password-wrapper">
      <div>
        <form
          className="reset-password-form"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            form.handleSubmit();
          }}
          autoComplete="off"
        >
          <form.Field name="newPassword">
            {(field) => (
              <div>
                <input
                  type="password"
                  id={field.name}
                  placeholder="Nowe hasło"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={resetPassword.isPending}
                />
                <FieldErrorMessage field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="confirmNewPassword">
            {(field) => (
              <div>
                <input
                  type="password"
                  id={field.name}
                  placeholder="Potwierdź hasło"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={resetPassword.isPending}
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
                  text={
                    resetPassword.isPending ? "Zmiana hasła..." : "Zmień hasło"
                  }
                  className="mt-12"
                  isActive={
                    !isPristine && canSubmit && !resetPassword.isPending
                  }
                />
              </>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}
