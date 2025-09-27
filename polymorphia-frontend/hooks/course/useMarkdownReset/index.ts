import {useMutation, useQueryClient} from "@tanstack/react-query";
import {MarkdownService} from "@/app/(logged-in)/course/[eventType]/[eventSectionId]/[gradableEventId]/MarkdownService";
import toast from "react-hot-toast";
import {UseMarkdownReset} from "@/hooks/course/useMarkdownReset/types";
import {MarkdownParamsRequest} from "@/interfaces/api/markdown";

export default function useMarkdownReset(): UseMarkdownReset {
  const queryClient = useQueryClient();

  return useMutation<void, Error, MarkdownParamsRequest>({
    mutationFn: (request: MarkdownParamsRequest) => MarkdownService.resetMarkdown(request),
    onSuccess: (_, { resourceId }) => {
      queryClient.invalidateQueries({
        queryKey: ["markdown", resourceId],
      });
      toast.success("Pomyślnie zresetowano plik!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}