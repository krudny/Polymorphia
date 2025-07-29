import { SpeedDialItem } from "@/components/speed-dial/types";
import GradableEventRewardModal from "@/components/speed-dial/modals/GradableEventRewardModal";
import ProjectVariantModal from "@/components/speed-dial/modals/ProjectVariantModal";
import GroupModal from "@/components/speed-dial/modals/GroupModal";
import GroupPickingModal from "@/components/speed-dial/modals/GroupPickingModal";
import { useContext } from "react";
import { MarkdownContext } from "@/components/providers/markdown/MarkdownContext";

export function useSpeedDialItemsFactory(
  eventSectionType: string,
  gradableEventId: number
): SpeedDialItem[] {
  const { isEditing, setIsEditing, saveMarkdown, rejectMarkdown } =
    useContext(MarkdownContext);

  const rewardsItem: SpeedDialItem = {
    id: 1,
    order: 5,
    label: "Nagrody",
    icon: "trophy",
    modal: (onClose) => (
      <GradableEventRewardModal
        gradableEventId={gradableEventId}
        onClosed={onClose}
      />
    ),
  };

  const projectVariantItem: SpeedDialItem = {
    id: 2,
    order: 2,
    label: "Wariant",
    icon: "arrow_split",
    modal: (onClose) => (
      <ProjectVariantModal
        gradableEventId={gradableEventId}
        eventSectionType={eventSectionType}
        onClosed={onClose}
      />
    ),
  };

  const projectGroupItem: SpeedDialItem = {
    id: 3,
    order: 3,
    label: "Grupa",
    icon: "person",
    modal: (onClose) => (
      <GroupModal gradableEventId={gradableEventId} onClosed={onClose} />
    ),
  };

  const projectGroupPickingItem: SpeedDialItem = {
    id: 4,
    order: 4,
    label: "Utwórz grupę",
    icon: "person_add",
    modal: (onClose) => (
      <GroupPickingModal gradableEventId={gradableEventId} onClosed={onClose} />
    ),
  };

  const saveMarkdownItem: SpeedDialItem = {
    id: 5,
    order: 1,
    label: "Zapisz markdown",
    icon: "save",
    onClick: () => saveMarkdown(),
    color: "#048635",
  };

  const editMarkdownItem: SpeedDialItem = {
    id: 6,
    order: 1,
    label: "Edytuj treść",
    icon: "edit",
    onClick: () => setIsEditing(true),
  };

  const rejectMarkdownItem: SpeedDialItem = {
    id: 7,
    order: 0,
    label: "Anuluj edycję",
    icon: "close",
    onClick: () => rejectMarkdown(),
    color: "#a30d0d",
  };

  switch (eventSectionType) {
    case "assignment":
      return [rewardsItem];
    case "project":
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
