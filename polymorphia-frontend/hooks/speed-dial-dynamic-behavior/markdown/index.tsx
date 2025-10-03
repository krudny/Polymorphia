import ResetMarkdownModal from "@/components/speed-dial/modals/reset-markdown";
import { SpeedDialItemDynamicBehavior } from "@/components/speed-dial/types";
import useMarkdownContext from "@/hooks/contexts/useMarkdownContext";

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

export function useResetMakrdownSpeedDialDynamicBehavior(): SpeedDialItemDynamicBehavior {
  const { isEditing } = useMarkdownContext();

  return {
    modal: (onClose) => <ResetMarkdownModal onClosedAction={onClose} />,
    shouldBeRendered: !isEditing,
  };
}
