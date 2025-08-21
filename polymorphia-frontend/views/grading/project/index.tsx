import Grading from "@/components/grading/grading";
import Reward from "@/components/grading/components/reward";
import PullRequest from "@/components/grading/components/pull-request";
import ProjectGroupList from "@/components/grading/components/project-group-list";
import { GradingTypes } from "@/components/grading/types";

export default function ProjectGradingView() {
  return (
    <Grading
      gradingType={GradingTypes.PROJECT_GRADING}
      columns={3}
      components={[
        <ProjectGroupList key="1" />,
        <Reward key="2" />,
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
