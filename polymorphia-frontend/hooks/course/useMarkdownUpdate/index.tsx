import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {UseMarkdownUpdate} from "@/hooks/course/useMarkdownUpdate/types";
import {MarkdownService} from "@/app/(logged-in)/course/[eventType]/[eventSectionId]/[gradableEventId]/MarkdownService";
import {MarkdownRequestDTO} from "@/interfaces/api/markdown";
import {Dispatch, SetStateAction} from "react";

export default function useMarkdownUpdate(setIsEditing: Dispatch<SetStateAction<boolean>>): UseMarkdownUpdate {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: MarkdownRequestDTO) => MarkdownService.saveMarkdown(request),
    onSuccess: (_, { gradableEventId }) => {
      queryClient.invalidateQueries({
        queryKey: ["markdown", gradableEventId],
      });
      toast.success("Zapisano zmiany!");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
