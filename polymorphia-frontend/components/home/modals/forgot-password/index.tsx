import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import React, { FormEvent } from "react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { useForm } from "@tanstack/react-form";
import { forgotPasswordSchema } from "@/components/form/schema";
import { ForgotPasswordRequestDTO } from "@/interfaces/api/password";
import useForgotPassword from "@/hooks/general/useForgotPassword";
import { FieldErrorMessage } from "@/components/form/FieldErrorMessage";
import "./index.css";
import useModalContext from "@/hooks/contexts/useModalContext";
import Modal from "@/components/modal";

function ForgotPasswordModalContent() {
  const { mutation } = useForgotPassword();
  const { closeModal } = useModalContext();

  const form = useForm({
    defaultValues: {
      email: "",
    } as ForgotPasswordRequestDTO,
    validators: {
      onSubmit: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value, {
        onSuccess: closeModal,
      });
    },
  });

  return (
    <div className="forgot-password-wrapper">
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => (
            <div className="forgot-password-input-wrapper">
              <input
                type="email"
                id={field.name}
                placeholder="Email"
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

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isPristine]}
        >
          {([canSubmit, isPristine]) => (
            <ButtonWithBorder
              text={mutation.isPending ? "Wysyłanie..." : "Potwierdź"}
              className="!mx-0 !py-1 !w-full !mt-2"
              isActive={!isPristine && canSubmit && !mutation.isPending}
            />
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

export default function ForgotPasswordModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Resetowanie hasła"
    >
      <ForgotPasswordModalContent />
    </Modal>
  );
}
