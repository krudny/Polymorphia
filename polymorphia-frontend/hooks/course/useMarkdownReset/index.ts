import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MarkdownService } from "@/app/(logged-in)/course/[eventType]/[eventSectionId]/[gradableEventId]/MarkdownService";
import toast from "react-hot-toast";
import {
  UseMarkdownReset,
  UseMarkdownResetProps,
} from "@/hooks/course/useMarkdownReset/types";

export default function useMarkdownReset(
  request: UseMarkdownResetProps
): UseMarkdownReset {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => MarkdownService.resetMarkdown(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["markdown", request.resourceId],
      });
      toast.success("Pomyślnie zresetowano plik!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
