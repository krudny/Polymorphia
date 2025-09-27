import { SpeedDialItemAction } from "@/components/speed-dial/types";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";

export function useSaveMarkdownSpeedDialAction(): SpeedDialItemAction {
  const { isEditing, saveMarkdown } = useMarkdownContext();

  return {
    onClick: saveMarkdown,
    shouldBeRendered: isEditing,
  };
}

export function useEditMarkdownSpeedDialAction(): SpeedDialItemAction {
  const { isEditing, setIsEditing } = useMarkdownContext();

  return {
    onClick: () => setIsEditing(true),
    shouldBeRendered: !isEditing,
  };
}

export function useRejectMarkdownSpeedDialAction(): SpeedDialItemAction {
  const { isEditing, rejectMarkdown } = useMarkdownContext();

  return {
    onClick: rejectMarkdown,
    shouldBeRendered: isEditing,
  };
}
