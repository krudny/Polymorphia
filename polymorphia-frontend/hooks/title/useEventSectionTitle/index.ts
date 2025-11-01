import { UseTitleHook } from "@/components/navigation/types";
import useEventSections from "@/hooks/course/useEventSections";
import { useEventParams } from "@/hooks/general/useEventParams";

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
