import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  UseMarkdownUpdate,
  UseMarkdownUpdateProps,
} from "@/hooks/course/useMarkdownUpdate/types";
import { MarkdownService } from "@/services/markdown";

export default function useMarkdownUpdate(
  request: UseMarkdownUpdateProps
): UseMarkdownUpdate {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => MarkdownService.saveMarkdown(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["markdown", request.resourceId],
      });
      toast.success("Zapisano zmiany!");
      request.setIsEditing(false);
    },
  });
}
