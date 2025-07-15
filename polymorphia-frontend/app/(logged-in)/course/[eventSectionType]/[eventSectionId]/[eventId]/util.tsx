import { useQuery } from "@tanstack/react-query";
import { BetterEventSectionService } from "@/app/(logged-in)/course/[eventSectionType]/BetterEventSectionService";
import { SpeedDialItem } from "@/components/speed-dial/types";
import AssignmentDetailsModal from "@/components/course/project-section/modals/AssignmentDetailsModal";
import ProjectVariantModal from "@/components/course/project-section/modals/ProjectVariantModal";
import GroupModal from "@/components/course/project-section/modals/GroupModal";
import UserService from "@/app/(logged-in)/profile/UserService";
import GroupPickingModal from "@/components/course/project-section/modals/GroupPickingModal";

export function useSpeedDialItemsFactory(
  eventSectionType: string,
  eventId: number
): SpeedDialItem[] {
  const {
    data: rewards,
    isLoading: isRewardsLoading,
    isError: isRewardsError,
  } = useQuery({
    queryKey: ["rewards", eventId],
    queryFn: () => BetterEventSectionService.getReward(eventId),
  });

  const {
    data: projectVariant,
    isLoading: isProjectVariantLoading,
    isError: isProjectVariantError,
  } = useQuery({
    queryKey: ["projectVariant", eventId],
    queryFn: () => BetterEventSectionService.getProjectVariant(eventId),
    enabled: eventSectionType === "project",
  });

  const {
    data: group,
    isLoading: isGroupLoading,
    isError: isGroupError,
  } = useQuery({
    queryKey: ["randomUsers"],
    queryFn: () => UserService.getRandomUsers(),
  });

  const {
    data: groupPicking,
    isLoading: isGroupPickingLoading,
    isError: isGroupPickingError,
  } = useQuery({
    queryKey: ["groupPicking"],
    queryFn: () => UserService.getRandomGroup(),
  });

  const rewardsItem: SpeedDialItem = {
    order: 1,
    label: "Nagrody",
    icon: "trophy",
    modal: (onClose) => (
      <AssignmentDetailsModal
        onClosed={onClose}
        data={
          rewards ? { grade: rewards.grade, maxXp: rewards.maxXp } : undefined
        }
        isLoading={isRewardsLoading}
        isError={isRewardsError}
      />
    ),
  };

  const projectVariantItem: SpeedDialItem = {
    order: 2,
    label: "Wariant",
    icon: "arrow_split",
    modal: (onClose) => (
      <ProjectVariantModal
        onClosed={onClose}
        data={projectVariant}
        isLoading={isProjectVariantLoading}
        isError={isProjectVariantError}
      />
    ),
  };

  const projectGroupItem: SpeedDialItem = {
    order: 3,
    label: "Grupa",
    icon: "person",
    modal: (onClose) => (
      <GroupModal
        onClosed={onClose}
        data={group}
        isLoading={isGroupLoading}
        isError={isGroupError}
      />
    ),
  };

  const projectGroupPickingItem: SpeedDialItem = {
    order: 0,
    label: "Grupa",
    icon: "person_add",
    modal: (onClose) => (
      <GroupPickingModal
        onClosed={onClose}
        data={groupPicking}
        isLoading={isGroupPickingLoading}
        isError={isGroupPickingError}
      />
    ),
  };

  switch (eventSectionType) {
    case "assignment":
      return [rewardsItem];
    case "project":
      return [
        rewardsItem,
        projectVariantItem,
        projectGroupItem,
        projectGroupPickingItem,
      ];
    default:
      return [];
  }
}
