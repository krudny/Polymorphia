import PullRequest from "@/components/course/project-section/modals/PullRequest";
import GroupModal from "@/components/course/project-section/modals/GroupModal";
import EventRewardModal from "@/components/course/project-section/modals/EventRewardModal";
import ProjectVariant from "@/components/course/project-section/modals/ProjectVariantModal";

export const speedDialItems = [
  {
    label: "Pull Request",
    icon: "add",
    modal: (onClose: () => void) => (
      <PullRequest isActive={true} onClosed={onClose} />
    ),
  },
  {
    label: "Zespół",
    icon: "person",
    modal: (onClose: () => void) => (
      <GroupModal isActive={true} onClosed={onClose} />
    ),
  },
  {
    label: "Nagrody",
    icon: "trophy",
    modal: (onClose: () => void) => (
      <EventRewardModal isActive={true} onClosed={onClose} />
    ),
  },
  {
    label: "Warianty",
    icon: "arrow_split",
    modal: (onClose: () => void) => (
      <ProjectVariant isActive={true} onClosed={onClose} />
    ),
  },
];
