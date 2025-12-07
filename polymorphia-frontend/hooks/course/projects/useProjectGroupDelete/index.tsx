import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEventParams } from "@/hooks/app/params/useEventParams";
import {
  UseProjectGroupDelete,
  UseProjectGroupDeleteParams,
} from "@/hooks/course/projects/useProjectGroupDelete/types";
import { ProjectService } from "@/services/project";
import { TargetTypes } from "@/interfaces/api/target";

export default function useProjectGroupDelete(): UseProjectGroupDelete {
  const { gradableEventId } = useEventParams();
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, UseProjectGroupDeleteParams>({
    mutationFn: async ({ target }) => {
      return toast.promise(
        ProjectService.deleteProjectGroup(target, gradableEventId),
        {
          loading: "Trwa usuwanie grupy projektowej...",
          success: "Pomyślnie usunięto grupę projektową.",
        }
      );
    },
    onSuccess: (_, { target }) => {
      queryClient.invalidateQueries({
        queryKey: ["gradingTargets"],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "grade",
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
          gradableEventId,
        ],
        refetchType: "none",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "submissionDetails",
          gradableEventId,
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
        ],
        refetchType: "none",
      });
      queryClient.invalidateQueries({
        queryKey: ["projectVariant", gradableEventId, target],
        refetchType: "none",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "projectGroupConfigurationStudents",
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
          gradableEventId,
        ],
        refetchType: "none",
      });
      queryClient.invalidateQueries({
        queryKey: [
          "projectGroupConfiguration",
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
          gradableEventId,
        ],
        refetchType: "none",
      });
    },
  });

  return { mutation };
}
