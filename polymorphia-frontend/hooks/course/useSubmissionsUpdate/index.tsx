import { useEventParams } from "@/hooks/general/useEventParams";
import { SubmissionDetailsResponseDTO } from "@/interfaces/api/grade/submission";
import { EventSectionService } from "@/services/event-section";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  UseSubmissionsUpdate,
  UseSubmissionsUpdateProps,
} from "@/hooks/course/useSubmissionsUpdate/types";
import { TargetTypes } from "@/interfaces/api/grade/target";

export default function useSubmissionsUpdate({
  target,
}: UseSubmissionsUpdateProps): UseSubmissionsUpdate {
  const queryClient = useQueryClient();
  const { gradableEventId } = useEventParams();

  return useMutation({
    mutationFn: (submissionDetails: SubmissionDetailsResponseDTO) => {
      if (!target) {
        throw new Error("Wystąpił błąd podczas aktualizacji oddanych zadań.");
      }

      return toast.promise(
        EventSectionService.submitSubmissions(gradableEventId, {
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
