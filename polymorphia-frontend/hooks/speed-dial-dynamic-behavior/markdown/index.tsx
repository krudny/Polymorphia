import ResetMarkdownModal from "@/components/speed-dial/modals/reset-markdown";
import { SpeedDialItemDynamicBehavior } from "@/components/speed-dial/types";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";
import useMarkdownSource from "@/hooks/course/useMarkdownSource";

export function useSaveMarkdownSpeedDialDynamicBehavior(): SpeedDialItemDynamicBehavior {
  const { isEditing, saveMarkdown } = useMarkdownContext();

  return {
    onClick: saveMarkdown,
    shouldBeRendered: isEditing,
  };
}

export function useEditMarkdownSpeedDialDynamicBehavior(): SpeedDialItemDynamicBehavior {
  const { isEditing, setIsEditing } = useMarkdownContext();

  return {
    onClick: () => setIsEditing(true),
    shouldBeRendered: !isEditing,
  };
}

export function useRejectMarkdownSpeedDialDynamicBehavior(): SpeedDialItemDynamicBehavior {
  const { isEditing, rejectMarkdown } = useMarkdownContext();

  return {
    onClick: rejectMarkdown,
    shouldBeRendered: isEditing,
  };
}

export function useResetMarkdownSpeedDialDynamicBehavior(): SpeedDialItemDynamicBehavior {
  const { isEditing, markdownType } = useMarkdownContext();
  const { data: markdownSource } = useMarkdownSource(markdownType);

  return {
    modal: (onClose) => <ResetMarkdownModal onClosedAction={onClose} />,
    shouldBeRendered: !isEditing && !!markdownSource?.sourceUrl,
  };
}
