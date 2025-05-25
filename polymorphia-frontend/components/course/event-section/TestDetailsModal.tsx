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
  testData,
  onClose,
}: TestDetailsModalProps) {
  const {
    data: test,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['tests', testData],
    queryFn: () => EventSectionService.getGradableEvent<Test>(testData),
  });

  if (testData === undefined) {
    return <Modal isOpen={false} title={''} onClose={onClose} />;
  }

  if (isError) {
    return (
      <Modal isOpen={testData !== undefined} title="Błąd" onClose={onClose}>
        Wystąpił błąd przy ładowaniu szczegółów.
      </Modal>
    );
  }

  if (isLoading) {
    return (
      <Modal
        isOpen={testData !== undefined}
        title="Ładowanie"
        onClose={onClose}
      >
        <div className="h-50 mt-20">
          <Loading />
        </div>
      </Modal>
    );
  }

  if (isSuccess) {
    return (
      <Modal
        isOpen={testData !== undefined}
        title={test?.name ?? ''}
        onClose={onClose}
      >
        <RewardsInfo grade={test.grade} maxXp={test.maxXp} />
      </Modal>
    );
  }
}
