import Modal from "@/components/modal/Modal";
import GradeInfo from "@/components/course/event-section/GradeInfo";
import Loading from "@/components/loading/Loading";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import useGrade from "@/hooks/course/useGrade";
import { useEventParams } from "@/hooks/general/useEventParams";

export default function GradeModal({
  onClosedAction,
  gradableEventIdProp,
}: SpeedDialModalProps & {
  gradableEventIdProp?: number;
}) {
  const { gradableEventId } = useEventParams();
  const id = isNaN(gradableEventId) ? gradableEventIdProp : gradableEventId;

  if (id === undefined) {
    throw new Error("Coś poszło nie tak");
  }

  const { data, isLoading, isError } = useGrade(id);

  return (
    <Modal
      isDataPresented={data !== undefined}
      onClosed={onClosedAction}
      title="Nagrody"
    >
      {isError && (
        <div className="gradable-event-section text-xl 2xl:text-2xl">
          Wystąpił błąd przy ładowaniu szczegółów.
        </div>
      )}
      {isLoading && (
        <div className="gradable-event-section h-50">
          <Loading />
        </div>
      )}
      {!isLoading && data && <GradeInfo grade={data} />}
    </Modal>
  );
}
