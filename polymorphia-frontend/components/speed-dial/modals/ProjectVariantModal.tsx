import Modal from "@/components/modal/Modal";
import Loading from "@/components/loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { SpeedDialModalProps } from "@/components/speed-dial/modals/types";
import XPCard from "@/components/xp-card/XPCard";
import XPCardProjectVariant from "@/components/xp-card/inner-components/XPCardProjectVariant";
import { API_STATIC_URL } from "@/services/api";

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

  const subtitle =
    data && data.length > 0
      ? `Twój wariant projektu to ${data.map((projectVariant) => projectVariant.shortCode).join("-")}`
      : "";

  return (
    <Modal
      isDataPresented={true}
      onClosed={onClosed}
      title="Wariant projektu"
      subtitle={subtitle}
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
          {data.map((projectVariant, index) => (
            <XPCard
              title={projectVariant.name}
              subtitle={projectVariant.categoryName}
              image={{
                url: `${API_STATIC_URL}/${projectVariant.imageUrl}`,
                alt: projectVariant.name,
              }}
              key={index}
              component={
                <XPCardProjectVariant shortCode={projectVariant.shortCode} />
              }
              size="sm"
            />
          ))}
        </div>
      )}
    </Modal>
  );
}
