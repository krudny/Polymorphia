import { useQuery } from "@tanstack/react-query";
import { BetterEventSectionService } from "@/app/(logged-in)/course/[eventSectionType]/BetterEventSectionService";
import { SpeedDialItem } from "@/components/speed-dial/types";
import AssignmentDetailsModal from "@/components/course/project-section/modals/AssignmentDetailsModal";

export function useSpeedDialItemsFactory(
  eventSectionType: string,
  eventId: number
): SpeedDialItem[] {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["rewards", eventId],
    queryFn: () => BetterEventSectionService.getReward(eventId),
  });

  const rewardsItem: SpeedDialItem = {
    label: "Nagrody",
    icon: "trophy",
    modal: (onClose) => (
      <AssignmentDetailsModal
        isActive={true}
        onClosed={onClose}
        data={data ? { grade: data.grade, maxXp: data.maxXp } : undefined}
        isLoading={isLoading}
        isError={isError}
      />
    ),
  };

  switch (eventSectionType) {
    case "assignment":
      return [rewardsItem];
    case "project":
      return [rewardsItem];
    default:
      return [];
  }
}
