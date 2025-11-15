import { useEventParams } from "@/hooks/general/useEventParams";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UseGradableEvent } from "@/hooks/course/useGradableEvent/types";
import { UseInstructorGradableEvents } from "@/hooks/course/useInstructorGradableEvents/types";
import { UseStudentsGradableEvents } from "@/hooks/course/useStudentsGradableEvents/types";
import { GradableEventService } from "@/services/gradable-event";

export default function useGradableEvent(): UseGradableEvent {
  const { eventSectionId, gradableEventId } = useEventParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gradableEvents", gradableEventId],
    queryFn: () => GradableEventService.getGradableEvent(gradableEventId),
    initialData: () => {
      const instructorCache = queryClient.getQueryData<
        UseInstructorGradableEvents["data"]
      >(["instructorGradableEvents", eventSectionId]);
      const studentCache = queryClient.getQueryData<
        UseStudentsGradableEvents["data"]
      >(["studentGradableEvents", eventSectionId]);

      return (
        studentCache?.find(
          (gradableEvent) => gradableEvent.id === gradableEventId
        ) ??
        instructorCache?.find(
          (gradableEvent) => gradableEvent.id === gradableEventId
        )
      );
    },
    staleTime: 1000 * 60 * 10,
  });

  console.log(data);
  return { data, isLoading, isError };
}
