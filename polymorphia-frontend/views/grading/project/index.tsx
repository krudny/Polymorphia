import { useQuery } from "@tanstack/react-query";
import { EventSectionService } from "@/app/(logged-in)/course/EventSectionService";
import Loading from "@/components/loading/Loading";
import Grading from "@/components/grading/grading";
import Reward from "@/components/grading/components/reward";
import PullRequest from "@/components/grading/components/pull-request";
import ProjectGroupList from "@/components/grading/components/project-group-list";

export default function ProjectGradingView() {
  const { data: projectGroupList, isLoading } = useQuery({
    queryKey: ["projectGroupList"],
    queryFn: () => EventSectionService.getRandomProjectGroups(),
  });

  if (isLoading || !projectGroupList) {
    return <Loading />;
  }

  return (
    <Grading
      columns={3}
      components={[
        <ProjectGroupList projectGroups={projectGroupList} key="1" />,
        <Reward
          key="2"
          criteria={[
            { id: 1, name: "Punkty doświadczenia", maxXP: 4 },
            {
              id: 2,
              name: "Punkty doświadczenia",
              maxXP: 4,
            },
          ]}
        />,
        <PullRequest
          key="3"
          pullRequests={[
            {
              id: 1,
              name: "Laboratorium",
              url: "https://github.com/krudny/Polymorphia/pull/32",
            },
          ]}
        />,
      ]}
    />
  );
}
