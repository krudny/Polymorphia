import { SpeedDialItemAction } from "@/components/speed-dial/types";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";

export function useSaveMarkdownSpeedDialAction(): SpeedDialItemAction {
  const { saveMarkdown } = useMarkdownContext();

  return {
    onClick: saveMarkdown,
  };
}

export function useEditMarkdownSpeedDialAction(): SpeedDialItemAction {
  const { setIsEditing } = useMarkdownContext();

  return {
    onClick: () => setIsEditing(true),
  };
}

export function useRejectMarkdownSpeedDialAction(): SpeedDialItemAction {
  const { rejectMarkdown } = useMarkdownContext();

  return {
    onClick: rejectMarkdown,
  };
}
