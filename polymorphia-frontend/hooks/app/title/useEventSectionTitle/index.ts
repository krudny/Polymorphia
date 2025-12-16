import useEventSections from "@/hooks/course/event-section/useEventSections";
import { useEventParams } from "@/hooks/app/params/useEventParams";
import { UseTitleHook } from "@/providers/title/types";

const useEventSectionTitle: UseTitleHook = () => {
  const { data: eventSections, error } = useEventSections();
  const { eventSectionId } = useEventParams();

  if (eventSections) {
    const title =
      eventSections.find((eventSection) => eventSection.id === eventSectionId)
        ?.name ?? "";

    return title;
  } else if (error) {
    return "";
  } else {
    return undefined;
  }
};

export default useEventSectionTitle;
