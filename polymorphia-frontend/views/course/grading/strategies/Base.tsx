import { ReactNode } from "react";
import StudentsList from "@/views/course/grading/components/student-list";
import ProjectGroupList from "@/views/course/grading/components/project-group-list";
import Grade from "@/views/course/grading/components/grade";
import PullRequest from "@/views/course/grading/components/pull-request";
import { ProjectVariant } from "@/views/course/grading/components/project-variant";

export abstract class BaseGradingStrategy {
  protected createStudentsList(): ReactNode {
    return <StudentsList />;
  }

  protected createProjectGroupList(): ReactNode {
    return <ProjectGroupList />;
  }

  protected createRewardComponent(): ReactNode {
    return <Grade />;
  }

  protected createPullRequestComponent(): ReactNode {
    return (
      <PullRequest
        pullRequests={[
          {
            id: 1,
            name: "Laboratorium",
            url: "https://github.com/krudny/Polymorphia/pull/32",
          },
          {
            id: 2,
            name: "Zadanie dodatkowe",
            url: "https://github.com/krudny/Polymorphia/pull/32",
          },
        ]}
      />
    );
  }

  protected createProjectVariantComponent(): ReactNode {
    return <ProjectVariant />;
  }
}
