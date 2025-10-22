import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventSectionService } from "@/services/event-section";
import toast from "react-hot-toast";
import { UseGradeUpdate } from "@/hooks/course/useGradeUpdate/types";

export default function useGradeUpdate(): UseGradeUpdate {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: EventSectionService.submitGrade,
    onSuccess: () => {
      toast.success("Ocena została pomyślnie zapisana!");
      queryClient.invalidateQueries({
        queryKey: ["grade"],
      });
    },
    onError: () => {
      toast.error("Wystąpił błąd podczas zapisywania oceny");
    },
  });
}
