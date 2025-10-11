import React, { FormEvent } from "react";
import { FieldInfo } from "@/components/form/FieldInfo";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useForm } from "@tanstack/react-form";
import { registerSchema } from "@/components/form/schema";
import "./index.css";
import { RegisterFormProps } from "@/components/home/register-form/types";
import useRegister from "@/hooks/general/useRegister";

export default function RegisterForm({ invitationToken }: RegisterFormProps) {
  const { mutation: register } = useRegister();
  const form = useForm({
    defaultValues: {
      password: "",
    },
    validators: {
      onBlur: registerSchema,
    },
    onSubmit: async ({ value }) => {
      register.mutate({
        invitationToken,
        password: value.password,
      });
    },
  });

  return (
    <div className="register-wrapper">
      <div>
        <form
          className="register-form"
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            form.handleSubmit();
          }}
          autoComplete="off"
        >
          <form.Field name="password">
            {(field) => (
              <div>
                <input
                  type="password"
                  id={field.name}
                  placeholder="Ustaw hasło"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={register.isPending}
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
                  text={register.isPending ? "Rejestracja..." : "Utwórz konto"}
                  className="mt-12"
                  isActive={isPristine || !canSubmit || !register.isPending}
                  forceDark
                />
              </>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}
