import { useQuery } from "@tanstack/react-query";
import { useUserDetails } from "@/hooks/contexts/useUserContext";
import { useEventParams } from "@/hooks/general/useEventParams";
import { EventTypes } from "@/interfaces/general";
import { ProjectService } from "@/services/project";
import {
  UseProjectGroupConfiguration,
  UseProjectGroupConfigurationProps,
} from "@/hooks/course/useProjectGroupConfiguration/types";
import { TargetTypes } from "@/interfaces/api/target";

export function useProjectGroupConfiguration({
  target,
}: UseProjectGroupConfigurationProps): UseProjectGroupConfiguration {
  const { gradableEventId, eventType } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: target
      ? [
          "projectGroupConfiguration",
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
          gradableEventId,
        ]
      : ["projectGroupConfiguration", "noTarget"],
    queryFn: () =>
      ProjectService.getProjectGroupConfiguration(target!, gradableEventId),
    enabled: eventType === EventTypes.PROJECT && target !== null,
  });

  return { data, isLoading, isError };
}
