import { UseTitleHook } from "@/components/navigation/types";
import useGradableEvent from "@/hooks/course/useGradableEvent";

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
