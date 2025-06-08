import Modal from '@/components/modal/Modal';
import {
  Test,
  TestDetailsModalProps,
} from '@/interfaces/course/event-section/EventSectionInterfaces';
import RewardsInfo from './RewardsInfo';
import { EventSectionService } from '@/services/course/event-section/EventSectionService';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/general/Loading';

export default function TestDetailsModal({
  eventSectionId,
  selectedGradableEventId,
  onClose,
}: TestDetailsModalProps) {
  const {
    data: test,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['tests', eventSectionId, selectedGradableEventId],
    queryFn: () =>
      EventSectionService.getGradableEvent<Test>({
        eventSectionType: 'test',
        gradableEventId: selectedGradableEventId,
      }),
  });

  if (selectedGradableEventId === null) {
    return <Modal isOpen={false} title={''} onClose={onClose} />;
  }

  if (isError) {
    return (
      <Modal isOpen title="Błąd" onClose={onClose}>
        Wystąpił błąd przy ładowaniu szczegółów.
      </Modal>
    );
  }

  if (isLoading) {
    return (
      <Modal isOpen title="Ładowanie" onClose={onClose}>
        <div className="h-50 mt-20">
          <Loading />
        </div>
      </Modal>
    );
  }

  if (isSuccess) {
    return (
      <Modal isOpen title={test?.name ?? ''} onClose={onClose}>
        <RewardsInfo grade={test.grade} maxXp={test.maxXp} />
      </Modal>
    );
  }
}
