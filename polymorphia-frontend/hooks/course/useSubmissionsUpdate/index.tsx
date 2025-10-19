import { useUserDetails } from "@/hooks/contexts/useUserContext";
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
  const { courseId } = useUserDetails();
  const { eventSectionId, gradableEventId } = useEventParams();

  return useMutation({
    mutationFn: (submissionDetails: SubmissionDetailsResponseDTO) =>
      toast.promise(
        EventSectionService.submitSubmissions(
          target,
          courseId,
          eventSectionId,
          gradableEventId,
          submissionDetails
        ),
        {
          loading: "Zapisywanie zmian...",
          success: "Pomyślnie zapisano oddane zadania!",
          error: () => "Wystąpił błąd przy zapisie oddanych zadań!",
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "submissionDetails",
          target.type,
          target.type === TargetTypes.STUDENT ? target.id : target.groupId,
        ],
      });
    },
  });
}
