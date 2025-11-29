import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEventParams } from "@/hooks/general/useEventParams";
import { UseProjectGroupDelete, UseProjectGroupDeleteParams } from "./types";
import { ProjectService } from "@/services/project";

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["gradingTargets"],
      });
      queryClient.invalidateQueries({
        queryKey: ["grade"],
      });
      queryClient.invalidateQueries({
        queryKey: ["submissionDetails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["projectVariant"],
      });
      queryClient.invalidateQueries({
        queryKey: ["projectGroupConfigurationStudents"],
      });
      queryClient.invalidateQueries({
        queryKey: ["projectGroupConfiguration"],
      });
    },
  });

  return { mutation };
}
