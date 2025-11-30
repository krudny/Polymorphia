import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEventParams } from "@/hooks/general/useEventParams";
import { ProjectService } from "@/services/project";
import {
  UseRandomProjectVariant,
  UseRandomProjectVariantParams,
} from "@/hooks/course/useRandomProjectVariant/types";

export default function useRandomProjectVariant(): UseRandomProjectVariant {
  const { gradableEventId } = useEventParams();

  const mutation = useMutation<
    Record<number, number>,
    Error,
    UseRandomProjectVariantParams
  >({
    mutationFn: async ({ target }) => {
      return toast.promise(
        ProjectService.getRandomProjectVariant(target, gradableEventId),
        {
          loading: "Trwa losowanie wariantu projektu...",
          success: "Pomyślnie wylosowano wariant projektu.",
        }
      );
    },
  });

  return { mutation };
}
