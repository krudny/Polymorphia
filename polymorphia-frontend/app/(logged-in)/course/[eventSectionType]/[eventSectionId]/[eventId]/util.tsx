import { useQuery } from "@tanstack/react-query";
import { BetterEventSectionService } from "@/app/(logged-in)/course/[eventSectionType]/BetterEventSectionService";
import { SpeedDialItem } from "@/components/speed-dial/types";
import AssignmentDetailsModal from "@/components/course/project-section/modals/AssignmentDetailsModal";
import ProjectVariantModal from "@/components/course/project-section/modals/ProjectVariantModal";

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
  });

  const rewardsItem: SpeedDialItem = {
    label: "Nagrody",
    icon: "trophy",
    modal: (onClose) => (
      <AssignmentDetailsModal
        isActive={true}
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
    label: "Wariant",
    icon: "arrow_split",
    modal: (onClose) => (
      <ProjectVariantModal
        isActive={true}
        onClosed={onClose}
        data={projectVariant}
        isLoading={isProjectVariantLoading}
        isError={isProjectVariantError}
      />
    ),
  };

  switch (eventSectionType) {
    case "assignment":
      return [rewardsItem];
    case "project":
      return [rewardsItem, projectVariantItem];
    default:
      return [];
  }
}
