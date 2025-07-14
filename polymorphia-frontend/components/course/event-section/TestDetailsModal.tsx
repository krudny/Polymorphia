import {
  Test,
  TestDetailsModalProps,
} from "@/components/course/event-section/types";
import RewardsInfo from "./RewardsInfo";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading/Loading";
import Modal from "@/components/modal/Modal";
import "./index.css";

export default function TestDetailsModal({
  eventSectionId,
  selectedGradableEventId,
  onClosed,
}: TestDetailsModalProps) {
  const {
    data: test,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["tests", eventSectionId, selectedGradableEventId],
    queryFn: () =>
      EventSectionService.getGradableEvent<Test>({
        eventSectionType: "test",
        gradableEventId: selectedGradableEventId,
      }),
  });

  return (
    <Modal
      isDataPresented={selectedGradableEventId !== null}
      title={test?.name ?? ""}
      onClosed={onClosed}
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
      {isSuccess && <RewardsInfo grade={test.grade} maxXp={test.maxXp} />}
    </Modal>
  );
}
