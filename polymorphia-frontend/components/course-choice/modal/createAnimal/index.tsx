import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal/Modal";
import "./index.css";
import React, { FormEvent } from "react";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import { FieldInfo } from "@/components/form/FieldInfo";
import { useForm } from "@tanstack/react-form";
import { createAnimalSchema } from "@/components/form/schema";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { CreateAnimalRequestDTO } from "@/interfaces/api/student";
import useCreateAnimal from "@/hooks/course/useCreateAnimal";

function CreateAnimalModalContent({ courseId }: { courseId: number }) {
  const { mutation } = useCreateAnimal();

  const form = useForm({
    defaultValues: {
      animalName: "",
    },
    validators: {
      onSubmit: createAnimalSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate({
        ...value,
        courseId: courseId,
      } as CreateAnimalRequestDTO);
    },
  });

  return (
    <div className="create-animal-wrapper">
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="animalName">
          {(field) => (
            <div className="create-animal-input-wrapper">
              <input
                type="text"
                id={field.name}
                placeholder="Nazwa zwierzęcia"
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
              text={mutation.isPending ? "Tworzenie..." : "Potwierdź"}
              className="!mx-0 !py-1 !w-full"
              isActive={isPristine || !canSubmit || mutation.isPending}
            />
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}

export default function CreateAnimalModal({
  onClosedAction,
  courseId,
}: SpeedDialModalProps & { courseId: number }) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Nazwij swojego zwierzaka"
    >
      <CreateAnimalModalContent courseId={courseId} />
    </Modal>
  );
}
