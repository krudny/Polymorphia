import Modal from "@/components/modal/Modal";
import GradeInfo from "@/components/course/event-section/GradeInfo";
import Loading from "@/components/loading";
import { useEventParams } from "@/hooks/general/useEventParams";
import "./index.css";
import useShortGrade from "@/hooks/course/useShortGrade";
import { TargetTypes } from "@/interfaces/api/grade";
import useUserContext from "@/hooks/contexts/useUserContext";
import useCriteria from "@/hooks/course/useCriteria";
import { GradeModalProps } from "./types";

export default function GradeModal({
  onClosedAction,
  gradableEventIdProp,
}: GradeModalProps) {
  const { gradableEventId } = useEventParams();
  const { id } = useUserContext();
  const target = {
    type: TargetTypes.STUDENT,
    id,
  };

  if (!gradableEventIdProp && !gradableEventId) {
    throw new Error("[GradeModal] invalid gradableEventId");
  }

  const { data: gradeData, isLoading: isGradeLoading } = useShortGrade(
    target,
    gradableEventIdProp
  );

  const {
    data: criteriaData,
    isLoading: isCriteriaLoading,
    isError: isCriteriaError,
  } = useCriteria(gradableEventIdProp);

  return (
    <Modal
      isDataPresented={gradeData !== undefined && criteriaData !== undefined}
      onClosed={onClosedAction}
      title="Nagrody"
    >
      {isCriteriaError && (
        <div className="grade-error">
          Wystąpił błąd przy ładowaniu szczegółów.
        </div>
      )}
      {(isGradeLoading || isCriteriaLoading) && (
        <div className="grade-loading">
          <Loading />
        </div>
      )}
      {!isGradeLoading && !isCriteriaLoading && criteriaData && (
        <GradeInfo grade={gradeData} criteria={criteriaData} />
      )}
    </Modal>
  );
}
