import Modal from "@/components/modal/Modal";
import Loading from "@/components/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";

export interface SpeedDialModalProps {
  gradableEventId: number | undefined;
  onClosed: () => void;
  eventSectionType?: string;
}

export default function ProjectVariantModal({
  gradableEventId,
  eventSectionType,
  onClosed,
}: SpeedDialModalProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectVariant", gradableEventId],
    queryFn: () => EventSectionService.getProjectVariant(gradableEventId!),
    enabled: !!gradableEventId && eventSectionType === "project",
  });

  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosed}
      title="Wariant projektu"
      subtitle={`Twój wariant projektu to ${data?.variant ?? ""}.`}
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
        <div className="flex flex-col gap-y-5 max-w-xl">
          {Object.entries(data.description)
            .reverse()
            .map(([key, value]) => (
              <div key={key}>
                <p className="text-2xl whitespace-pre-line">
                  {key} - {value}
                </p>
              </div>
            ))}
        </div>
      )}
    </Modal>
  );
}
