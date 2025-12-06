import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import Modal from "@/components/modal";
import ButtonWithBorder from "@/components/button/ButtonWithBorder";
import ErrorComponent from "@/components/error";
import { ErrorComponentSizes } from "@/components/error/types";
import Selector from "@/components/selector";
import Loading from "@/components/loading";
import "./index.css";
import useModalContext from "@/hooks/contexts/useModalContext";
import useChangeStudentCourseGroup from "@/hooks/course/useChangeStudentCourseGroup";
import useTargetContext from "@/hooks/contexts/useTargetContext";
import useCourseGroups from "@/hooks/course/useCourseGroups";
import { TargetTypes } from "@/interfaces/api/target";
import { CourseGroupTypes } from "@/services/course-groups/types";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import React, { useState } from "react";

function MoveAnimalModalContent() {
  const { mutation } = useChangeStudentCourseGroup();
  const { closeModal } = useModalContext();
  const { selectedTarget } = useTargetContext();
  const { courseId } = useUserDetails();
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");

  const {
    data: courseGroups,
    isLoading,
    isError,
  } = useCourseGroups({
    courseId,
    type: CourseGroupTypes.INDIVIDUAL_FULL,
  });

  if (!selectedTarget || selectedTarget.type !== TargetTypes.STUDENT) {
    return (
      <ErrorComponent
        size={ErrorComponentSizes.COMPACT}
        message="Nie znaleziono danych studenta. Wybierz studenta z listy."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="w-88 h-[220px] flex-col-centered relative">
        <Loading />
      </div>
    );
  }

  if (isError || !courseGroups) {
    return (
      <ErrorComponent
        size={ErrorComponentSizes.COMPACT}
        message="Nie udało się załadować grup zajęciowych."
      />
    );
  }

  const handleConfirm = () => {
    if (!selectedGroupId) {
      return;
    }

    mutation.mutate({
      animalId: selectedTarget.student.id,
      newCourseGroupId: Number(selectedGroupId),
    });
  };

  const groupOptions = courseGroups
    .filter((courseGroup) => courseGroup.name !== selectedTarget.student.group)
    .map((group) => ({
      value: String(group.id),
      label: group.name,
    }));

  return (
    <div className="move-animal">
      <h1>
        Zanim przeniesiesz studenta, upewnij się, że wybrałeś właściwą grupę
        zajęciową.
      </h1>
      <div className="move-animal-columns">
        <h1>Student</h1>
        <h1>{selectedTarget.student.fullName}</h1>
      </div>
      <div className="move-animal-columns">
        <h1>Zwierzak</h1>
        <h1>{selectedTarget.student.animalName}</h1>
      </div>
      <div className="move-animal-columns">
        <h1>Nowa grupa zajęciowa</h1>
        <div className="w-40">
          <Selector
            options={groupOptions}
            value={selectedGroupId}
            onChange={setSelectedGroupId}
            placeholder="Wybierz grupę"
            size="2xl"
            padding="xs"
            centeredPlaceholder={true}
            centeredOptions={true}
            className="!border-b-2 !border-t-0 !border-x-0 !rounded-none !w-full"
          />
        </div>
      </div>
      <div className="move-animal-buttons">
        <ButtonWithBorder
          text="Anuluj"
          className="!mx-0 !py-0 !w-full"
          onClick={closeModal}
        />
        <ButtonWithBorder
          text="Przenieś"
          className="!mx-0 !py-0 !w-full"
          onClick={handleConfirm}
          isActive={!!selectedGroupId}
        />
      </div>
    </div>
  );
}

export default function MoveAnimalModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Przenoszenie studenta"
    >
      <MoveAnimalModalContent />
    </Modal>
  );
}
