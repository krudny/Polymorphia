import Modal from "@/components/modal/Modal";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";

export default function SubmissionsModal({
  onClosedAction,
}: SpeedDialModalProps) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Oddawanie zadania"
    >
      {/*{(isGradeError || isCriteriaError) && (
        <div className="grade-error">
          Wystąpił błąd przy ładowaniu szczegółów.
        </div>
      )}
      {(isGradeLoading || isCriteriaLoading) && (
        <div className="grade-loading">
          <Loading />
        </div>
      )}
      {!isGradeLoading && !isCriteriaLoading && gradeData && criteriaData && (
        <GradeInfo grade={gradeData} criteria={criteriaData} />
      )}*/}
    </Modal>
  );
}
