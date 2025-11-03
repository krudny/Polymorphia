import Modal from "@/components/modal/Modal";
import GradeInfo from "@/components/course/event-section/GradeInfo";
import Loading from "@/components/loading";
import { useEventParams } from "@/hooks/general/useEventParams";
import "./index.css";
import useShortGrade from "@/hooks/course/useShortGrade";
import { TargetTypes } from "@/interfaces/api/grade/target";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import useCriteria from "@/hooks/course/useCriteria";
import { GradeModalProps } from "@/components/speed-dial/modals/grade/types";
import ErrorState from "@/components/error-state";

export default function GradeModal({
  onClosedAction,
  gradableEventIdProp,
}: GradeModalProps) {
  const { gradableEventId } = useEventParams();
  const { id } = useUserDetails();
  const target = {
    type: TargetTypes.STUDENT,
    id,
  };

  if (!gradableEventIdProp && !gradableEventId) {
    throw new Error("[GradeModal] invalid gradableEventId");
  }

  const {
    data: gradeData,
    isLoading: isGradeLoading,
    isError: isGradeError,
  } = useShortGrade(target, gradableEventIdProp);

  const {
    data: criteriaData,
    isLoading: isCriteriaLoading,
    isError: isCriteriaError,
  } = useCriteria(gradableEventIdProp);

  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosedAction}
      title="Nagrody"
      subtitle={
        gradeData?.isGraded === false
          ? "To wydarzenie nie zostało jeszcze ocenione!"
          : undefined
      }
    >
      {(isGradeError || isCriteriaError) && (
        <div className="grade-error">
          <ErrorState message="Nie udało się załadować szczegółów oceny." />
        </div>
      )}
      {(isGradeLoading || isCriteriaLoading) && (
        <div className="grade-loading">
          <Loading />
        </div>
      )}
      {!isGradeLoading && !isCriteriaLoading && gradeData && criteriaData && (
        <GradeInfo grade={gradeData} criteria={criteriaData} />
      )}
    </Modal>
  );
}
