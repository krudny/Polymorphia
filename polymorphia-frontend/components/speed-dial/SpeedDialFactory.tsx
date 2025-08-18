import { SpeedDialItem } from "@/components/speed-dial/types";
import ProjectVariantModal from "@/components/speed-dial/modals/ProjectVariantModal";
import GroupModal from "@/components/speed-dial/modals/GroupModal";
import GroupPickingModal from "@/components/speed-dial/modals/GroupPickingModal";
import { useContext } from "react";
import { MarkdownContext } from "@/components/providers/markdown/MarkdownContext";
import { useEventParams } from "@/shared/params/useSeachParams";
import GradeModal from "@/components/speed-dial/modals/GradeModal";

export function useSpeedDialItemsFactory(): SpeedDialItem[] {
  const { eventType } = useEventParams();
  const { isEditing, setIsEditing, saveMarkdown, rejectMarkdown } =
    useContext(MarkdownContext);

  const rewardsItem: SpeedDialItem = {
    id: 1,
    orderIndex: 5,
    label: "Nagrody",
    icon: "trophy",
    modal: (onClose) => <GradeModal onClosedAction={onClose} />,
  };

  const projectVariantItem: SpeedDialItem = {
    id: 2,
    orderIndex: 2,
    label: "Wariant",
    icon: "arrow_split",
    modal: (onClose) => <ProjectVariantModal onClosedAction={onClose} />,
  };

  const projectGroupItem: SpeedDialItem = {
    id: 3,
    orderIndex: 3,
    label: "Grupa",
    icon: "person",
    modal: (onClose) => <GroupModal onClosedAction={onClose} />,
  };

  const projectGroupPickingItem: SpeedDialItem = {
    id: 4,
    orderIndex: 4,
    label: "Utwórz grupę",
    icon: "person_add",
    modal: (onClose) => <GroupPickingModal onClosedAction={onClose} />,
  };

  const saveMarkdownItem: SpeedDialItem = {
    id: 5,
    orderIndex: 1,
    label: "Zapisz markdown",
    icon: "save",
    onClick: () => saveMarkdown(),
    color: "#048635",
  };

  const editMarkdownItem: SpeedDialItem = {
    id: 6,
    orderIndex: 1,
    label: "Edytuj treść",
    icon: "edit",
    onClick: () => setIsEditing(true),
  };

  const rejectMarkdownItem: SpeedDialItem = {
    id: 7,
    orderIndex: 0,
    label: "Anuluj edycję",
    icon: "close",
    onClick: () => rejectMarkdown(),
    color: "#a30d0d",
  };

  switch (eventType) {
    case "ASSIGNMENT":
      return [rewardsItem];
    case "PROJECT":
      return [
        ...(isEditing
          ? [saveMarkdownItem, rejectMarkdownItem]
          : [editMarkdownItem]),
        rewardsItem,
        projectVariantItem,
        projectGroupItem,
        projectGroupPickingItem,
      ];
    default:
      return [];
  }
}
