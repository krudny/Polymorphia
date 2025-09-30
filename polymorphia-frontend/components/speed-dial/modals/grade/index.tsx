import Modal from "@/components/modal/Modal";
import GradeInfo from "@/components/course/event-section/GradeInfo";
import Loading from "@/components/loading";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import useGrade from "@/hooks/course/useGrade";
import { useEventParams } from "@/hooks/general/useEventParams";
import "./index.css";

export default function GradeModal({
  onClosedAction,
  gradableEventIdProp,
}: SpeedDialModalProps & {
  gradableEventIdProp?: number;
}) {
  const { gradableEventId } = useEventParams();
  const id = isNaN(gradableEventId) ? gradableEventIdProp : gradableEventId;

  if (id === undefined) {
    throw new Error("[GradeModal] invalid gradableEventId");
  }

  const { data, isLoading, isError } = useGrade(id);

  return (
    <Modal
      isDataPresented={data !== undefined}
      onClosed={onClosedAction}
      title="Nagrody"
    >
      {isError && (
        <div className="grade-error">
          Wystąpił błąd przy ładowaniu szczegółów.
        </div>
      )}
      {isLoading && (
        <div className="grade-loading">
          <Loading />
        </div>
      )}
      {!isLoading && data && <GradeInfo grade={data} />}
    </Modal>
  );
}
