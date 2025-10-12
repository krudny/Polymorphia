import Modal from "@/components/modal/Modal";
import { ChangePasswordModalProps } from "@/app/(logged-in)/settings/modals/change-password/types";
import React, { FormEvent } from "react";
import { FieldInfo } from "@/components/form/FieldInfo";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useForm } from "@tanstack/react-form";
import { changePasswordSchema } from "@/components/form/schema";
import { ChangePasswordDTO } from "@/interfaces/api/user";
import useChangePassword from "@/hooks/course/useChangePassword";
import "./index.css";

export default function ChangePasswordModal({
  onClosedAction,
}: ChangePasswordModalProps) {
  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    } as ChangePasswordDTO,
    validators: {
      onBlur: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      changePassword.mutate(value);
    },
  });

  const { mutation: changePassword } = useChangePassword({ form });

  return (
    <Modal isDataPresented={true} onClosed={onClosedAction} title="Zmień hasło">
      <form
        className="change-password-form"
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="oldPassword">
          {(field) => (
            <div>
              <input
                type="text"
                id={field.name}
                placeholder="Stare hasło"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                required
                autoComplete="off"
              />
              <FieldInfo field={field} />
            </div>
          )}
        </form.Field>

        <form.Field name="newPassword">
          {(field) => (
            <div>
              <input
                type="text"
                id={field.name}
                placeholder="Nowe hasło"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                required
                autoComplete="off"
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
                text="Zmień hasło"
                className="!w-full !mt-7"
                isActive={isPristine || !canSubmit}
              />
            </>
          )}
        </form.Subscribe>
      </form>
    </Modal>
  );
}
