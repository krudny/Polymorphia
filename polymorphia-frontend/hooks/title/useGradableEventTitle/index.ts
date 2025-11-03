import useGradableEvent from "@/hooks/course/useGradableEvent";
import { UseTitleHook } from "@/providers/title/types";

const useGradableEventTitle: UseTitleHook = () => {
  const { data: gradableEvent, isError } = useGradableEvent();

  if (gradableEvent) {
    return gradableEvent.name;
  } else if (isError) {
    return "";
  } else {
    return undefined;
  }
};

export default useGradableEventTitle;
