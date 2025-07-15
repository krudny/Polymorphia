import Modal from "@/components/modal/Modal";
import XPCard from "@/components/xp-card/XPCard";
import { API_STATIC_URL } from "@/services/api";
import Loading from "@/components/loading/Loading";
import { UserDetailsDTO } from "@/interfaces/api/DTO";

export default function GroupModal({
  onClosed,
  data,
  isLoading,
  isError,
}: {
  onClosed: () => void;
  data: UserDetailsDTO[] | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosed}
      title="Grupa"
      subtitle="Oto skład twojej grupy:"
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
      {data && !isLoading && (
        <div className="flex flex-col gap-2 min-w-80">
          {data?.map((user) => (
            <XPCard
              key={user.animalName}
              title={user.studentName}
              subtitle={user.evolutionStage}
              image={{
                url: `${API_STATIC_URL}/${user.imageUrl}`,
                alt: user.evolutionStage,
              }}
              size="xs"
            />
          ))}
        </div>
      )}
    </Modal>
  );
}
