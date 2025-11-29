import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal";
import "./index.css";
import { useForm } from "@tanstack/react-form";
import { CreateCourseGroupRequestDTO } from "@/interfaces/api/course-groups";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useCreateCourseGroup from "@/hooks/course/useCreateCourseGroup";
import useTeachingRole from "@/hooks/course/useTeachingRole";
import React, { FormEvent } from "react";
import { FieldErrorMessage } from "@/components/form/FieldErrorMessage";
import Selector from "@/components/selector";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import Loading from "@/components/loading";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";

function CreateCourseGroupModalContent() {
  const { courseId } = useUserDetails();
  const { mutation } = useCreateCourseGroup();
  const { data: teachingRoles, isLoading, isError } = useTeachingRole();

  const form = useForm({
    defaultValues: {
      name: "",
      room: "",
      teachingRoleId: -1,
      courseId,
    } as CreateCourseGroupRequestDTO,
    validators: {
      // onSubmit: inviteSchema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  const columnOptions =
    teachingRoles?.map((user) => ({
      value: user.userId.toString(),
      label: user.fullName,
    })) || [];

  if (isLoading) {
    return (
      <div className="w-88 h-[220px] flex-col-centered relative">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-88 h-[130px] flex-col-centered relative">
        <ErrorComponent
          message="Nie udało się załadować szczegółów."
          size={ErrorComponentSizes.COMPACT}
        />
      </div>
    );
  }

  return (
    <div className="create-course-group">
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="create-course-group-row">
          <h3>Nazwa grupy</h3>
          <form.Field name="name">
            {(field) => (
              <div className="create-course-group-row-input-wrapper">
                <input
                  type="text"
                  id={field.name}
                  placeholder="Nazwa"
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
        </div>

        <div className="create-course-group-row">
          <h3>Miejsce zajęć</h3>
          <form.Field name="room">
            {(field) => (
              <div className="create-course-group-row-input-wrapper">
                <input
                  type="text"
                  id={field.name}
                  placeholder="Sala"
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
        </div>

        <div className="create-course-group-row">
          <h3>Prowadzący</h3>
          <div className="create-course-group-row-selector-wrapper">
            <form.Field name="teachingRoleId">
              {(field) => (
                <Selector
                  options={columnOptions}
                  value={
                    field.state.value === -1 ? "" : field.state.value.toString()
                  }
                  onChange={(value) => {
                    field.handleChange(value ? parseInt(value, 10) : -1);
                  }}
                  placeholder="Osoba"
                  size="2xl"
                  padding="xs"
                  centeredPlaceholder={true}
                  centeredOptions={true}
                  className="!border-b-2 !border-t-0 !border-x-0 !rounded-none !w-full"
                />
              )}
            </form.Field>
          </div>
        </div>

        <ButtonWithBorder text="Utwórz grupę" className="!mx-0 !py-1 !w-full" />
      </form>
    </div>
  );
}

export default function CreateCourseGroupModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Utwórz nową grupę"
    >
      <CreateCourseGroupModalContent />
    </Modal>
  );
}
