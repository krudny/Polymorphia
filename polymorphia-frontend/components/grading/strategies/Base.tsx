import { ReactNode } from "react";
import StudentsList from "@/components/grading/components/student-list";
import ProjectGroupList from "@/components/grading/components/project-group-list";
import Reward from "@/components/grading/components/reward";
import PullRequest from "@/components/grading/components/pull-request";

export abstract class BaseGradingStrategy {
  protected createStudentsList(): ReactNode {
    return <StudentsList />;
  }

  protected createProjectGroupList(): ReactNode {
    return <ProjectGroupList />;
  }

  protected createRewardComponent(): ReactNode {
    return <Reward />;
  }

  protected createPullRequestComponent(): ReactNode {
    return <PullRequest pullRequests={[
      {
        id: 1,
        name: "Laboratorium",
        url: "https://github.com/krudny/Polymorphia/pull/32",
      },
    ]} />;
  }
}