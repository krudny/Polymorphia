import {SpeedDialModalProps} from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal/Modal";
import "./index.css"
import React, {FormEvent} from "react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import {FieldInfo} from "@/components/form/FieldInfo";
import {useForm} from "@tanstack/react-form";
import {inviteStudentSchema} from "@/components/form/schema";
import {InviteStudentRequestDTO} from "@/interfaces/api/user";
import useInviteStudent from "@/hooks/course/useInviteStudent";

export default function InviteStudentModal({ onClosedAction }: SpeedDialModalProps) {
  const { mutation } = useInviteStudent();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      indexNumber: 0,
      email: "",
    } as InviteStudentRequestDTO,
    validators: {
      onSubmit: inviteStudentSchema,
    },
    onSubmit: async ({ value }) => {
      const submitData: InviteStudentRequestDTO = {
        ...value,
      };
      mutation.mutate(submitData);
    },
  });


  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Zaproś studenta"
      subtitle="Uzupełnij wszystkie dane:"
    >
      <div className="invite-student-wrapper">
        <form
          onSubmit={(event: FormEvent) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="invite-student-columns">
            <form.Field name="firstName">
              {(field) => (
                <div>
                  <input
                    type="text"
                    id={field.name}
                    placeholder="Imię"
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

            <form.Field name="lastName">
              {(field) => (
                <div>
                  <input
                    type="text"
                    id={field.name}
                    placeholder="Nazwisko"
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
          </div>

          <form.Field name="indexNumber">
            {(field) => (
              <div>
                <input
                  type="number"
                  id={field.name}
                  placeholder="Numer indeksu"
                  value={field.state.value === 0 ? "" : field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => {
                    const value = event.target.value;
                    field.handleChange(value === "" ? 0 : parseInt(value, 10));
                  }}
                  required
                  autoComplete="off"
                />
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>

          <form.Field name="email">
            {(field) => (
              <div>
                <input
                  type="email"
                  id={field.name}
                  placeholder="Email studenta"
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
              <ButtonWithBorder
                text={mutation.isPending ? "Wysyłanie..." : "Wyślij zaproszenie"}
                className="!mx-0 !py-1 !w-full !mt-4"
                isActive={isPristine || !canSubmit || mutation.isPending}
                forceDark
              />
            )}
          </form.Subscribe>
        </form>
      </div>
    </Modal>
  );
}
