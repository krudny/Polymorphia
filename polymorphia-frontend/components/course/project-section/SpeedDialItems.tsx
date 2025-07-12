import PullRequest from "@/components/course/project-section/modals/PullRequest";
import GroupModal from "@/components/course/project-section/modals/GroupModal";
import Rewards from "@/components/course/project-section/modals/Rewards";
import ProjectVariant from "@/components/course/project-section/modals/ProjectVariant";

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
      <Rewards isActive={true} onClosed={onClose} />
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
