import Modal from "@/components/modal/Modal";
import RewardsInfo from "@/components/course/event-section/RewardsInfo";
import Loading from "@/components/loading/Loading";
import { Grade } from "@/components/course/event-section/types";

export default function EventRewardModal({
  data,
  onClosed,
  isLoading,
  isError,
}: {
  data: { grade: Grade; maxXp: string } | undefined;
  onClosed: () => void;
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <Modal
      isDataPresented={data !== undefined}
      onClosed={onClosed}
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
      {!isLoading && data && (
        <RewardsInfo grade={data.grade} maxXp={data.maxXp} />
      )}
    </Modal>
  );
}
