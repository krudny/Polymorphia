import { useEffect } from "react";
import { useTitle } from "@/components/navigation/TitleContext";
import SpeedDial from "@/components/speed-dial";
import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/components/course/project-section/ProjectService";
import PullRequest from "@/components/course/project-section/modals/PullRequest";
import GroupModal from "@/components/course/project-section/modals/GroupModal";
import Rewards from "@/components/course/project-section/modals/Rewards";
import ProjectVariant from "@/components/course/project-section/modals/ProjectVariant";
import Loading from "@/components/loading/Loading";
import MarkdownViewer from "@/components/markdown-viewer";
import { SectionViewProps } from "@/components/course/event-section/types";

const createSpeedDialItems = (projectDetails) => {
  console.log(projectDetails);
  return [
    {
      label: "Pull Request",
      icon: projectDetails?.submission?.projectUrl ? "check" : "add",
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
};

export default function ProjectView({ eventSectionId }: SectionViewProps) {
  const { setTitle } = useTitle();

  useEffect(() => {
    setTitle("Projekt");
  }, [setTitle]);

  const { data: projectContent, isLoading: contentLoading } = useQuery({
    queryKey: ["project-content"],
    queryFn: () => ProjectService.getProjectSectionContent(),
  });

  const { data: projectDetails, isLoading: dataLoading } = useQuery({
    queryKey: ["project-details"],
    queryFn: () => ProjectService.getProjectSectionDetails(eventSectionId),
  });

  if (contentLoading || !projectContent) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col mx-auto">
      <div className="fixed right-10 bottom-10">
        {dataLoading || !projectDetails ? (
          <Loading />
        ) : (
          <SpeedDial items={createSpeedDialItems(projectDetails)} />
        )}
      </div>
      <div className="max-w-[1200px] mx-auto my-10">
        <MarkdownViewer content={projectContent.content} />
      </div>
    </div>
  );
}
