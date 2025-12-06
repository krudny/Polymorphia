import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";
import Selector from "@/components/selector";
import Loading from "@/components/loading";
import "./index.css";
import useModalContext from "@/hooks/contexts/useModalContext";
import useUpdateCourseGroup from "@/hooks/course/useUpdateCourseGroup";
import useCourseGroups from "@/hooks/course/useCourseGroups";
import useTeachingRole from "@/hooks/course/useTeachingRole";
import { useEventParams } from "@/hooks/general/useEventParams";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { CourseGroupTypes } from "@/services/course-groups/types";
import { useEffect, useState } from "react";
import { UpdateCourseGroupRequestDTO } from "@/interfaces/api/course-groups";

function EditCourseGroupModalContent() {
  const { mutation } = useUpdateCourseGroup();
  const { closeModal } = useModalContext();
  const { courseId } = useUserDetails();
  const { courseGroupId } = useEventParams();
  const {
    data: courseGroups,
    isLoading: isLoadingGroups,
    isError: isErrorGroups,
  } = useCourseGroups({
    courseId,
    type: CourseGroupTypes.INDIVIDUAL_FULL,
  });
  const {
    data: teachingRoleUsers,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useTeachingRole();

  const courseGroupDetails = courseGroups?.find(
    (group) => group.id === courseGroupId
  );

  const [formData, setFormData] = useState<UpdateCourseGroupRequestDTO>({
    name: "",
    room: "",
    teachingRoleId: -1,
  });

  useEffect(() => {
    if (courseGroupDetails) {
      setFormData({
        name: courseGroupDetails.name,
        room: courseGroupDetails.room,
        teachingRoleId: courseGroupDetails.teachingRoleId,
      });
    }
  }, [courseGroupDetails]);

  if (isLoadingGroups || isLoadingUsers) {
    return (
      <div className="w-88 h-[220px] flex-col-centered relative">
        <Loading />
      </div>
    );
  }

  if (isErrorGroups || !courseGroups || !courseGroupDetails) {
    return (
      <ErrorComponent
        size={ErrorComponentSizes.COMPACT}
        message="Nie udało się załadować szczegółów grupy zajęciowej."
      />
    );
  }

  if (isErrorUsers || !teachingRoleUsers) {
    return (
      <ErrorComponent
        size={ErrorComponentSizes.COMPACT}
        message="Nie udało się załadować listy instruktorów."
      />
    );
  }

  const handleConfirm = () => {
    if (
      !formData.name.trim() ||
      !formData.room.trim() ||
      !formData.teachingRoleId
    ) {
      return;
    }

    mutation.mutate({
      name: formData.name.trim(),
      room: formData.room.trim(),
      teachingRoleId: Number(formData.teachingRoleId),
    });
  };

  const teachingRoleOptions = teachingRoleUsers.map((user) => ({
    value: String(user.userId),
    label: user.fullName,
  }));

  const isFormValid =
    formData.name.trim() && formData.room.trim() && formData.teachingRoleId;

  return (
    <div className="edit-course-group">
      <h1>
        Edytuj szczegóły grupy zajęciowej. Upewnij się, że wszystkie pola są
        poprawnie wypełnione.
      </h1>

      <div className="edit-course-group-columns">
        <h1>Nazwa grupy</h1>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="edit-course-group-input"
          placeholder="Nazwa"
        />
      </div>

      <div className="edit-course-group-columns">
        <h1>Sala</h1>
        <input
          type="text"
          value={formData.room}
          onChange={(e) => setFormData({ ...formData, room: e.target.value })}
          className="edit-course-group-input"
          placeholder="Sala"
        />
      </div>

      <div className="edit-course-group-columns">
        <h1>Instruktor</h1>
        <div className="w-40">
          <Selector
            options={teachingRoleOptions}
            value={
              teachingRoleOptions.find(
                (option) => Number(option.value) === formData.teachingRoleId
              )?.value || ""
            }
            onChange={(value) =>
              setFormData({ ...formData, teachingRoleId: Number(value) })
            }
            placeholder="Wybierz"
            size="2xl"
            padding="sm"
            centeredPlaceholder={true}
            centeredOptions={true}
            className="!border-b-2 !border-t-0 !border-x-0 !rounded-none !w-full"
          />
        </div>
      </div>

      <div className="edit-course-group-buttons">
        <ButtonWithBorder
          text="Anuluj"
          className="!mx-0 !py-0 !w-full"
          onClick={closeModal}
        />
        <ButtonWithBorder
          text="Zapisz"
          className="!mx-0 !py-0 !w-full"
          onClick={handleConfirm}
          isActive={!!isFormValid}
        />
      </div>
    </div>
  );
}

export default function EditCourseGroupModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Edycja grupy zajęciowej"
    >
      <EditCourseGroupModalContent />
    </Modal>
  );
}
