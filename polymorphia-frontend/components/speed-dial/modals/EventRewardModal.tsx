import Modal from "@/components/modal/Modal";
import RewardsInfo from "@/components/course/event-section/RewardsInfo";
import Loading from "@/components/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";

export default function EventRewardModal({
  gradableEventId,
  onClosed,
}: SpeedDialModalProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["eventReward", gradableEventId],
    queryFn: () => EventSectionService.getReward(gradableEventId!),
    enabled: !!gradableEventId,
  });

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
