import { ReactNode } from "react";
import Grade from "@/components/grading-components/grade";
import PullRequest from "@/components/grading-components/pull-request";
import { ProjectVariant } from "@/components/grading-components/project-variant";
import TargetList from "@/components/grading-components/target-list";

export abstract class BaseGradingStrategy {
  protected createTargetList(): ReactNode {
    return <TargetList />;
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
