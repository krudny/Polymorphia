import { ReactNode } from "react";
import Grade from "@/components/grading-components/grade";
import Submissions from "@/components/grading-components/submission";
import { ProjectVariant } from "@/components/grading-components/project-variant";

export abstract class BaseGradingStrategy {
  protected createRewardComponent(): ReactNode {
    return <Grade />;
  }

  protected createSubmissionsComponent(): ReactNode {
    return <Submissions />;
  }

  protected createProjectVariantComponent(): ReactNode {
    return <ProjectVariant />;
  }
}
