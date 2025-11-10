import { useEventParams } from "@/hooks/general/useEventParams";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  UseSubmissionsUpdate,
  UseSubmissionsUpdateProps,
} from "@/hooks/course/useSubmissionsUpdate/types";
import { TargetTypes } from "@/interfaces/api/target";
import { SubmissionService } from "@/services/submission";
import { SubmissionDetails } from "@/interfaces/api/grade/submission";

export default function useSubmissionsUpdate({
  target,
}: UseSubmissionsUpdateProps): UseSubmissionsUpdate {
  const queryClient = useQueryClient();
  const { gradableEventId } = useEventParams();

  return useMutation({
    mutationFn: (submissionDetails: SubmissionDetails) => {
      if (!target) {
        throw new Error("Wystąpił błąd podczas aktualizacji oddanych zadań.");
      }

      return toast.promise(
        SubmissionService.submitSubmissions(gradableEventId, {
          target,
          details: submissionDetails,
        }),
        {
          loading: "Zapisywanie zmian...",
          success: "Pomyślnie zapisano oddane zadania!",
          error: () => "Wystąpił błąd przy zapisie oddanych zadań!",
        }
      );
    },
    onSuccess: () => {
      if (target) {
        queryClient.invalidateQueries({
          queryKey: [
            "submissionDetails",
            gradableEventId,
            target.type,
            target.type === TargetTypes.STUDENT ? target.id : target.groupId,
          ],
        });
      }
    },
  });
}
