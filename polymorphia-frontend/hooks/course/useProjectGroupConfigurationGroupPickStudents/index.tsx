import { useQuery } from "@tanstack/react-query";
import { useEventParams } from "@/hooks/general/useEventParams";
import { EventTypes } from "@/interfaces/general";
import { ProjectService } from "@/services/project";
import { TargetTypes } from "@/interfaces/api/target";
import {
  UseProjectGroupConfigurationGroupPickStudents,
  UseProjectGroupConfigurationGroupPickStudentsProps,
} from "./types";

export function useProjectGroupConfigurationGroupPickStudents({
  target,
}: UseProjectGroupConfigurationGroupPickStudentsProps): UseProjectGroupConfigurationGroupPickStudents {
  const { gradableEventId, eventType } = useEventParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: target
      ? [
          "projectGroupConfigurationStudents",
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
          gradableEventId,
        ]
      : ["projectGroupConfigurationStudents", "noTarget"],
    queryFn: () =>
      ProjectService.getProjectGroupConfigurationGroupPickStudents(
        target,
        gradableEventId
      ),
    enabled: eventType === EventTypes.PROJECT,
  });

  return { data, isLoading, isError };
}
