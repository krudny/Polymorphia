import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  UseMarkdownUpdate,
  UseMarkdownUpdateProps,
} from "@/hooks/course/useMarkdownUpdate/types";
import { MarkdownService } from "@/services/markdown";
import useFetch from "@/hooks/general/useFetch";

export default function useMarkdownUpdate(
  request: UseMarkdownUpdateProps
): UseMarkdownUpdate {
  const queryClient = useQueryClient();
  const { fetch: fetchFn } = useFetch();

  return useMutation({
    mutationFn: () => MarkdownService.saveMarkdown(fetchFn, request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["markdown", request.resourceId],
      });
      toast.success("Zapisano zmiany!");
      request.setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
