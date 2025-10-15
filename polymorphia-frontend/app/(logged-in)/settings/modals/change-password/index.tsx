import Modal from "@/components/modal/Modal";
import { ChangePasswordModalProps } from "@/app/(logged-in)/settings/modals/change-password/types";
import React, { FormEvent } from "react";
import { FieldErrorMessage } from "@/components/form/FieldErrorMessage";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { changePasswordSchema } from "@/components/form/schema";
import { ChangePasswordDTO } from "@/interfaces/api/user";
import useChangePassword from "@/hooks/course/useChangePassword";
import "./index.css";
import { useForm } from "@tanstack/react-form";
import useModalContext from "@/hooks/contexts/useModalContext";

function ChangePasswordModalContent() {
  const { closeModal } = useModalContext();

  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    } as ChangePasswordDTO,
    validators: {
      onBlur: changePasswordSchema,
    },
    onSubmit: async ({ value }) => {
      changePassword.mutate(value, {
        onSuccess: closeModal,
      });
    },
  });

  const { mutation: changePassword } = useChangePassword({ form });

  return (
    <form
      className="change-password-form"
      autoComplete="off"
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="oldPassword">
        {(field) => (
          <div>
            <input
              type="password"
              id={field.name}
              name={field.name}
              placeholder="Stare hasło"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              required
              autoComplete="off"
            />
            <FieldErrorMessage field={field} />
          </div>
        )}
      </form.Field>

      <form.Field name="newPassword">
        {(field) => (
          <div>
            <input
              type="password"
              id={field.name}
              name={field.name}
              placeholder="Nowe hasło"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              required
              autoComplete="off"
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
              name={field.name}
              placeholder="Potwierdź hasło"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
              required
              autoComplete="off"
            />
            <FieldErrorMessage field={field} />
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isPristine]}>
        {([canSubmit, isPristine]) => (
          <ButtonWithBorder
            text="Zmień hasło"
            className="!w-full !mt-4"
            isActive={isPristine || !canSubmit}
          />
        )}
      </form.Subscribe>
    </form>
  );
}

export default function ChangePasswordModal({
  onClosedAction,
}: ChangePasswordModalProps) {
  return (
    <Modal isDataPresented={true} onClosed={onClosedAction} title="Zmień hasło">
      <ChangePasswordModalContent />
    </Modal>
  );
}
