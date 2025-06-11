import Modal from "@/components/modal/Modal";
import {
  Test,
  TestDetailsModalProps,
} from "@/interfaces/course/event-section/EventSectionInterfaces";
import RewardsInfo from "./RewardsInfo";
import { EventSectionService } from "@/services/course/event-section/EventSectionService";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/general/Loading";
import { useEffect, useState } from "react";

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

  const [modalVisible, setModalVisible] = useState(false);

  const onRequestClose = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    setModalVisible(!!selectedGradableEventId);
  }, [selectedGradableEventId]);

  console.log(modalVisible, test)

  return (
    <Modal
      isOpen={modalVisible}
      title={test?.name ?? ""}
      onClosed={onClosed}
      onRequestClose={onRequestClose}
    >
      {isError ?? <div>Wystąpił błąd przy ładowaniu szczegółów.</div>}
      {isLoading ?? (
        <div className="h-50 mt-20">
          <Loading />
        </div>
      )}
      {isSuccess && <RewardsInfo grade={test.grade} maxXp={test.maxXp} />}
    </Modal>
  );
}
