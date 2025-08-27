import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import toast from "react-hot-toast";
import { UseMarkdownUpdate } from "@/hooks/course/useMarkdownUpdate/types";

export default function useMarkdownUpdate(): UseMarkdownUpdate {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gradableEventId, newMarkdown }: { gradableEventId: number; newMarkdown: string }) =>
      EventSectionService.saveMarkdown(gradableEventId, newMarkdown),
    onSuccess: (_, { gradableEventId }) => {
      queryClient.invalidateQueries({
        queryKey: ["markdown", gradableEventId],
      });
      toast.error("Aktualizacja markdown (celowo) nie działa!");
    },
    onError: (error) => {
      console.error("Błąd zapisu markdown:", error);
      alert("Nie udało się zapisać zmian.");
    },
  });
}
