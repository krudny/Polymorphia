import Loading from "@/components/loading/Loading";
import XPCard from "@/components/xp-card/XPCard";
import XPCardImage from "@/components/xp-card/components/XPCardImage";
import XPCardProjectVariant from "@/components/xp-card/components/XPCardProjectVariant";
import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import { useEventParams } from "@/hooks/general/useEventParams";
import { EventTypes } from "@/interfaces/api/course";

export default function ProjectVariantInfo() {
  const { gradableEventId, eventType } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projectVariant", gradableEventId],
    queryFn: () => EventSectionService.getProjectVariant(),
    enabled: !!gradableEventId && eventType === EventTypes.PROJECT,
  });

  return (
    <>
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
              key={index}
              leftComponent={
                <XPCardImage
                  imageUrl={projectVariant.imageUrl}
                  alt={projectVariant.name}
                />
              }
              rightComponent={
                <XPCardProjectVariant shortCode={projectVariant.shortCode} />
              }
              size="sm"
            />
          ))}
        </div>
      )}
    </>
  );
}
